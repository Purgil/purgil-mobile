import { AnimatedView, Text, View } from '~/components/styled'
import { LayoutChangeEvent, TouchableWithoutFeedback } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Portal, useTheme } from 'react-native-paper'
import { WithTimingConfig } from 'react-native-reanimated/src/reanimated2/animation/timing.ts'

const snapPoints = [0.5]
// const springConfig: SpringConfig = { damping: 28, stiffness: 300 }
const timingConfig: WithTimingConfig = {
  duration: 100,
  easing: Easing.out(Easing.ease),
}

type Props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  rounded?: boolean
  showIndicator?: boolean
  title?: string
} & Partial<PropsWithChildren>

function ActionSheet({
  visible,
  setVisible,
  rounded = true,
  showIndicator = true,
  title,
  children,
}: Props) {
  const { colors } = useTheme()

  const height = useSharedValue(0)
  const pinnedHeight = useSharedValue(0)
  const opacity = useSharedValue(0)

  /* state */
  const [componentHeight, setComponentHeight] = useState(0)
  const [localVisible, setLocalVisible] = useState(visible)

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout
    setComponentHeight(layoutHeight)
  }, [])

  const snapHeights = useMemo(
    () => [0, ...snapPoints.map(v => componentHeight * v)],
    [componentHeight],
  )

  const maxHeight = useMemo(() => Math.max(...snapHeights), [snapHeights])

  useEffect(() => {
    if (localVisible) {
      height.value = withTiming(snapHeights[1], timingConfig)
      pinnedHeight.value = withTiming(snapHeights[1], timingConfig)
      opacity.value = withTiming(0.5, timingConfig)
    } else {
      height.value = withTiming(snapHeights[0], timingConfig)
      pinnedHeight.value = withTiming(snapHeights[0], timingConfig)
      opacity.value = withTiming(0, timingConfig, () =>
        runOnJS(setVisible)(false),
      )
    }
  }, [localVisible, opacity, snapHeights, height, pinnedHeight, setVisible])

  const PanGesture = Gesture.Pan()
    .onChange(event => {
      if (pinnedHeight.value - event.translationY < maxHeight) {
        height.value = pinnedHeight.value - event.translationY
      }
    })
    .onEnd(() => {
      const snapTarget = snapHeights.reduce(
        (closest, num) =>
          Math.abs(num - height.value) < Math.abs(closest - height.value)
            ? num
            : closest,
        pinnedHeight.value,
      )
      pinnedHeight.value = snapTarget
      height.value = withTiming(snapTarget, timingConfig, () => {
        if (snapTarget === 0) {
          runOnJS(setLocalVisible)(false)
        }
      })
    })

  const dimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }))

  return (
    <Portal>
      {/* dim 영역 */}
      <TouchableWithoutFeedback onPress={() => setLocalVisible(false)}>
        <AnimatedView
          bg={colors.backdrop}
          flex={1}
          style={dimStyle}
          onLayout={handleLayout}
        />
      </TouchableWithoutFeedback>
      {/* actionSheet 영역 */}
      <GestureDetector gesture={PanGesture}>
        <AnimatedView
          px={20}
          // py={10}
          bg={colors.elevation.level1}
          position='absolute'
          bottom={0}
          width='100%'
          borderTopRightRadius={rounded ? 20 : 0}
          borderTopLeftRadius={rounded ? 20 : 0}
          style={animatedStyle}>
          {/* 인디테이터 */}
          {showIndicator && (
            <View alignItems='center' p={15}>
              <View
                bg={colors.onSurface}
                opacity={0.5}
                height={5}
                width={30}
                borderRadius={30}
              />
            </View>
          )}
          {title && (
            <Text variant='headlineMedium' py={10}>
              {title}
            </Text>
          )}
          {children}
        </AnimatedView>
      </GestureDetector>
    </Portal>
  )
}

export default React.memo(ActionSheet)
