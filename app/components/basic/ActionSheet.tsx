import { AnimatedView } from '~/components/styled'
import {
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View as RNView,
} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  // withSpring
} from 'react-native-reanimated'
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils'
import { Portal, useTheme } from 'react-native-paper'
import { WithTimingConfig } from 'react-native-reanimated/src/reanimated2/animation/timing.ts'

const snapPoints = [0.5, 0.8, 1]
// const springConfig: SpringConfig = { damping: 28, stiffness: 300 }
const timingConfig: WithTimingConfig = {
  duration: 100,
  easing: Easing.out(Easing.ease),
}

type Props = {
  visible: boolean
  setVisible: any
} & Partial<PropsWithChildren>

function ActionSheet({ visible, setVisible, children }: Props) {
  const { colors } = useTheme()
  const ref = useRef<RNView>(null)

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

  useEffect(() => {
    if (localVisible) {
      height.value = withTiming(snapHeights[1], timingConfig)
      pinnedHeight.value = withTiming(snapHeights[1], timingConfig)
      opacity.value = withTiming(0.5, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      })
    } else {
      height.value = withTiming(snapHeights[0], timingConfig)
      pinnedHeight.value = withTiming(snapHeights[0], timingConfig)
      opacity.value = withTiming(0, timingConfig, () =>
        runOnJS(setVisible)(false),
      )
    }
  }, [localVisible, opacity, snapHeights, height, pinnedHeight, setVisible])

  const PanGesture = Gesture.Pan()
    .onStart(() => {})
    .onChange(event => {
      height.value = pinnedHeight.value - event.translationY
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
          ref={ref}
          style={dimStyle}
          onLayout={handleLayout}
        />
      </TouchableWithoutFeedback>
      {/* actionSheet 영역 */}
      <GestureDetector gesture={PanGesture}>
        <AnimatedView
          px={20}
          // py={10}
          bg={colors.elevation.level4}
          position='absolute'
          bottom={0}
          width='100%'
          style={animatedStyle}>
          {/*<View alignItems='center'>
              <View
                bg={colors.elevation.level5}
                height={5}
                width={30}
                borderRadius={200}
              />
            </View>*/}
          {children}
        </AnimatedView>
      </GestureDetector>
    </Portal>
  )
}

export default React.memo(ActionSheet)
