import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  AnimatedView,
  Divider,
  TouchableWithoutFeedback,
  View,
} from '~/components/styled'
import { Portal, useTheme } from 'react-native-paper'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import { basicTimingConfig } from '~/utils/animation.utils.ts'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '~/navigation/types.ts'

const windowH = Dimensions.get('window').height

export type ActionSheetProps = {
  visible: boolean
  onClose?: () => void
  snapPoints?: number[]
  dim?: boolean
  rounded?: boolean
  title?: string
  scroll?: boolean
} & PropsWithChildren

function ActionSheet({
  visible,
  onClose,
  children,
  snapPoints = [],
  dim = true,
  rounded = true,
}: ActionSheetProps) {
  /** hook */
  const { colors } = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  /** state */
  const [layoutH, setLayoutH] = useState(0)
  const [contentH, setContentH] = useState(0)
  const [localVisible, setLocalVisible] = useState(visible)

  /** sharedValue */
  const translateY = useSharedValue(windowH)
  const accTranslateY = useSharedValue(windowH)
  const opacity = useSharedValue(0)

  /** memo */
  const snapHeights = useMemo(
    () => snapPoints?.sort((a, b) => a - b)?.map(v => v * layoutH) || [],
    [snapPoints, layoutH],
  )

  /** handle */
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setLayoutH(height)
  }, [])
  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setContentH(height)
  }, [])

  /** effect */
  useEffect(() => {
    if (!contentH) return
    if (localVisible) {
      if (snapHeights?.[0]) {
        const target = contentH - (snapHeights?.[0] || 0)
        translateY.value = withTiming(target, basicTimingConfig)
        accTranslateY.value = target
      } else {
        translateY.value = withTiming(0, basicTimingConfig)
        accTranslateY.value = 0
      }
      opacity.value = withTiming(dim ? 0.7 : 0, basicTimingConfig)
    } else {
      translateY.value = withTiming(windowH, basicTimingConfig)
      opacity.value = withTiming(0, basicTimingConfig, () => {
        if (onClose) runOnJS(onClose)()
      })
    }
  }, [localVisible, contentH, snapHeights])
  // 뒤로가기 제어
  useEffect(() => {
    const onBack = (e: any) => {
      e.preventDefault()
      if (onClose) onClose()
    }
    navigation.addListener('beforeRemove', onBack)

    return () => {
      navigation.removeListener('beforeRemove', onBack)
    }
  }, [navigation])

  /** other */
  const panGesture = Gesture.Pan()
    .onChange(event => {
      if (accTranslateY.value + event.translationY > 0) {
        translateY.value = accTranslateY.value + event.translationY
      }
    })
    .onEnd(event => {
      let snapTarget = (onClose ? [0, ...snapHeights] : snapHeights).reduce(
        (closest, snapHeight) =>
          Math.abs(contentH - translateY.value - snapHeight) <
          Math.abs(contentH - translateY.value - closest)
            ? snapHeight
            : closest,
        contentH - accTranslateY.value,
      )

      if (
        snapTarget === contentH - accTranslateY.value &&
        Math.abs(event.translationY) > 50
      ) {
        const index = snapHeights.indexOf(snapTarget)
        if (event.translationY > 0) {
          if (index > 0) snapTarget = snapHeights[index - 1]
          else if (onClose) snapTarget = 0
        } else if (event.translationY < 0 && index < snapHeights.length - 1) {
          snapTarget = snapHeights[index + 1]
        }
      }

      translateY.value = withTiming(contentH - snapTarget, basicTimingConfig)
      accTranslateY.value = contentH - snapTarget

      if (snapTarget === 0) {
        runOnJS(setLocalVisible)(false)
      }
    })

  /** style */
  const dimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  /** render */
  const renderChildren = () => {
    const childrenEl: any = {
      header: undefined,
      body: undefined,
      footter: undefined,
    }

    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        if (child.type === ActionSheet.Header) {
          childrenEl.header = child
        }
        if (child.type === ActionSheet.Body) {
          // return React.cloneElement(child, { stateVariable, setStateVariable })
          childrenEl.body = child
        }
        if (child.type === ActionSheet.Footer) {
          childrenEl.footer = child
        }
      }
    })

    return (
      <>
        <GestureDetector gesture={panGesture}>
          <View>
            <View alignItems='center' p={15}>
              <View
                bg={colors.onSurface}
                opacity={0.5}
                height={4}
                width={30}
                borderRadius={30}
              />
            </View>
            {childrenEl.header}
          </View>
        </GestureDetector>

        {childrenEl.body}

        {childrenEl.footer}
      </>
    )
  }

  return (
    <Portal>
      {/* dim 영역 */}
      <View flex={1} onLayout={handleLayout}>
        {dim && (
          <TouchableWithoutFeedback onPress={() => setLocalVisible(false)}>
            <AnimatedView flex={1} bg={colors.backdrop} style={dimStyle} />
          </TouchableWithoutFeedback>
        )}
      </View>

      <AnimatedView
        bg={colors.elevation.level1}
        style={contentStyle}
        height={snapPoints[0] ? '100%' : undefined}
        width='100%'
        bottom={0}
        position='absolute'
        borderTopRightRadius={rounded ? 8 : 0}
        borderTopLeftRadius={rounded ? 8 : 0}
        onLayout={handleContentLayout}>
        {renderChildren()}
      </AnimatedView>
    </Portal>
  )
}

ActionSheet.Header = ({ children }: PropsWithChildren) => {
  return (
    <View px={10}>
      {children}
      <Divider mt={10} />
    </View>
  )
}

type ActionSheetBodyProps = {} & PropsWithChildren

ActionSheet.Body = ({ children }: ActionSheetBodyProps) => {
  return <View p={10}>{children}</View>
}

ActionSheet.Footer = ({ children }: PropsWithChildren) => {
  return <View bottom={0}>{children}</View>
}

export default ActionSheet
