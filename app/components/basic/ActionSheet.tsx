import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
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
  const [localVisible, setLocalVisible] = useState(visible)
  const [snapHeights, setSnapHeights] = useState<number[]>([])

  /** sharedValue */
  const layoutH = useSharedValue(0)
  const translateY = useSharedValue(windowH)
  const opacity = useSharedValue(0)
  const height = useSharedValue(0)
  const snapHeight = useSharedValue(0)

  /** function */
  const onMount = useCallback((targetHeight: number) => {
    height.value = targetHeight
    snapHeight.value = targetHeight
    translateY.value = withTiming(0, basicTimingConfig)
    opacity.value = withTiming(dim ? 0.7 : 0, basicTimingConfig)
  }, [])

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout
    layoutH.value = layoutHeight
    if (snapPoints[0]) {
      setSnapHeights(
        snapPoints.sort((a, b) => a - b).map(point => layoutHeight * point),
      )
      onMount(layoutHeight * snapPoints[0])
    }
  }, [])

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    if (!snapHeight.value && !snapPoints?.[0]) {
      const { height: contentHeight } = event.nativeEvent.layout
      onMount(contentHeight)
    }
  }, [])

  /** effect */
  useEffect(() => {
    if (!localVisible) {
      translateY.value = withTiming(windowH, basicTimingConfig)
      opacity.value = withTiming(0, basicTimingConfig, () => {
        if (onClose) runOnJS(onClose)()
      })
    }
  }, [localVisible])
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
      const target = snapHeight.value - event.translationY
      const maxHeight = snapHeights?.[0]
        ? snapHeights[snapHeights.length - 1]
        : snapHeight.value
      if (target <= maxHeight && target >= 0)
        height.value = snapHeight.value - event.translationY
    })
    .onEnd(event => {
      // 가장 가까운 snapPoint 의 height
      let snapTarget = (onClose ? [0, ...snapHeights] : snapHeights)
        .sort((a, b) => a - b)
        .reduce(
          (closest, snapH) =>
            Math.abs(height.value - snapH) < Math.abs(height.value - closest)
              ? snapH
              : closest,
          snapHeight.value,
        )

      // 가장 까깝지 않더라도 pan 의 범위가 50 이상이면 다음 혹은 이전 snapPoint 로 이동 시키기
      if (
        snapTarget === snapHeight.value &&
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

      height.value = withTiming(snapTarget, basicTimingConfig)
      snapHeight.value = snapTarget

      if (snapTarget === 0) {
        snapHeight.value = 1
        runOnJS(setLocalVisible)(false)
      }
    })

  /** style */
  const dimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
  const contentStyle = useAnimatedStyle(() => {
    return snapPoints?.[0] || height.value
      ? {
          height: height.value,
          transform: [{ translateY: translateY.value }],
        }
      : {
          transform: [{ translateY: translateY.value }],
        }
  })

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
        bottom={0}
        width='100%'
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
  return (
    <View p={10} flex={1}>
      {children}
    </View>
  )
}

ActionSheet.Footer = ({ children }: PropsWithChildren) => {
  return <View bottom={0}>{children}</View>
}

export default ActionSheet
