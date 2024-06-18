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
  Text,
  TouchableWithoutFeedback,
  View,
} from '~/components/styled'
import { Portal, useTheme } from 'react-native-paper'
import {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Dimensions, Keyboard, LayoutChangeEvent } from 'react-native'
import { basicTimingConfig } from '~/utils/animation.utils.ts'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/navigation/types.ts'

const windowH = Dimensions.get('window').height

export type ActionSheetProps = {
  visible?: boolean
  onClose?: () => void
  snapPoints?: number[]
  dim?: boolean
  rounded?: boolean
  title?: string
  redeemHeight?: number
  keyboardAvoiding?: boolean
  hideIndecator?: boolean
} & PropsWithChildren

function ActionSheet({
  visible,
  onClose,
  children,
  redeemHeight = 0,
  snapPoints = [],
  dim = true,
  rounded = true,
  keyboardAvoiding = false,
  hideIndecator = false,
  title,
}: ActionSheetProps) {
  /** hook */
  const { colors } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  /** state */
  const [mounted, setMounted] = useState(false)

  /** sharedValue */
  const layoutH = useSharedValue(0)
  const translateY = useSharedValue(windowH)
  const opacity = useSharedValue(0)
  const height = useSharedValue(0)
  const snapHeight = useSharedValue(0)
  const keyboardHeight = useSharedValue(0)
  const snapHeights = useDerivedValue(() =>
    snapPoints[0]
      ? snapPoints.sort((a, b) => a - b).map(point => layoutH.value * point)
      : [],
  )

  /** function */
  const onMount = useCallback((targetHeight: number) => {
    height.value = targetHeight
    translateY.value = withTiming(0, basicTimingConfig)
    opacity.value = withTiming(dim ? 0.7 : 0, basicTimingConfig)
    snapHeight.value = targetHeight
    setMounted(true)
  }, [])

  // 무조건 한번 실행 되어야 함
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    let { height: layoutHeight } = event.nativeEvent.layout
    layoutHeight += redeemHeight
    layoutH.value = layoutHeight
    if (snapPoints[0]) {
      onMount(layoutHeight * snapPoints[0])
    }
  }, [])

  // snapPoints 없을 경우에만 한번 실행 하면 됨
  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: contentHeight } = event.nativeEvent.layout
    onMount(contentHeight)
  }, [])

  const handleClose = useCallback(() => {
    translateY.value = withTiming(height.value, basicTimingConfig)
    opacity.value = withTiming(0, basicTimingConfig, () => {
      if (onClose) runOnJS(onClose)()
    })
  }, [])

  /** memo */
  const layoutFunction = useMemo(
    () => (mounted ? undefined : handleLayout),
    [mounted],
  )
  const contentLayoutFunction = useMemo(
    () => (snapPoints[0] || mounted ? undefined : handleContentLayout),
    [mounted],
  )

  /** effect */
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
  // 키보드 제어
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        keyboardHeight.value = withTiming(-event.endCoordinates.height, {
          duration: event.duration,
        })
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      event => {
        keyboardHeight.value = withTiming(0, {
          duration: event.duration,
        })
      },
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  /** other */
  const panGesture = Gesture.Pan()
    .onChange(event => {
      const target = snapHeight.value - event.translationY
      const maxHeight = snapHeights.value?.[0]
        ? snapHeights.value[snapHeights.value.length - 1]
        : snapHeight.value
      if (target <= maxHeight && target >= 0)
        height.value = snapHeight.value - event.translationY
    })
    .onEnd(event => {
      // 가장 가까운 snapPoint 의 height
      let snapTarget = (
        onClose ? [0, ...snapHeights.value] : snapHeights.value
      ).reduce(
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
        const index = snapHeights.value.indexOf(snapTarget)
        if (event.translationY > 0) {
          if (index > 0) snapTarget = snapHeights.value[index - 1]
          else if (onClose) snapTarget = 0
        } else if (
          event.translationY < 0 &&
          index < snapHeights.value.length - 1
        ) {
          snapTarget = snapHeights.value[index + 1]
        }
      }

      if (snapTarget === 0) runOnJS(handleClose)()
      else {
        height.value = withTiming(snapTarget, basicTimingConfig)
        snapHeight.value = snapTarget
      }
    })

  /** style */
  const dimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
  const contentStyle = useAnimatedStyle(() =>
    snapPoints[0] || height.value
      ? {
          height: height.value,
          transform: [{ translateY: translateY.value }],
        }
      : {
          transform: [{ translateY: translateY.value }],
        },
  )
  const bottomStyle = useAnimatedStyle(() => ({
    bottom: 0,
    transform: [{ translateY: keyboardHeight.value }],
  }))

  /** render */
  const renderChildren = useCallback(() => {
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
            {!hideIndecator && (
              <View alignItems='center' p={15}>
                <View
                  bg={colors.onSurface}
                  opacity={0.5}
                  height={4}
                  width={30}
                  borderRadius={30}
                />
              </View>
            )}
            {childrenEl.header ||
              (title && (
                <ActionSheet.Header>
                  <Text variant='titleLarge' px={15}>
                    {title}
                  </Text>
                </ActionSheet.Header>
              ))}
          </View>
        </GestureDetector>

        {childrenEl.body}
        <AnimatedView style={bottomStyle}>{childrenEl.footer}</AnimatedView>
      </>
    )
  }, [children])

  return (
    <Portal>
      {/* dim 영역 */}
      <AnimatedView
        onLayout={layoutFunction}
        height={keyboardAvoiding ? windowH : '100%'}>
        {dim && (
          <TouchableWithoutFeedback onPress={handleClose}>
            <AnimatedView flex={1} bg={colors.backdrop} style={dimStyle} />
          </TouchableWithoutFeedback>
        )}

        <AnimatedView
          bg={colors.elevation.level2}
          style={contentStyle}
          bottom={0}
          width='100%'
          position='absolute'
          justifyContent='space-between'
          borderTopRightRadius={rounded ? 8 : 0}
          borderTopLeftRadius={rounded ? 8 : 0}
          onLayout={contentLayoutFunction}>
          {renderChildren()}
        </AnimatedView>
      </AnimatedView>
    </Portal>
  )
}

ActionSheet.Header = ({ children }: PropsWithChildren) => (
  <View>
    {children}
    <Divider mt={10} />
  </View>
)

type ActionSheetBodyProps = {} & PropsWithChildren

ActionSheet.Body = ({ children }: ActionSheetBodyProps) => (
  <View flex={1}>{children}</View>
)

ActionSheet.Footer = ({ children }: PropsWithChildren) => (
  <View>{children}</View>
)

export default ActionSheet
// export default React.memo(ActionSheet) as unknown as typeof ActionSheet
