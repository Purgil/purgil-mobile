import { Portal, useTheme } from 'react-native-paper'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import {
  AnimatedView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from '~/components/styled'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { WithTimingConfig } from 'react-native-reanimated/src/reanimated2/animation/timing.ts'
import { PanGestureHandlerEventPayload } from 'react-native-gesture-handler/src/handlers/PanGestureHandler.ts'
import { PanGestureChangeEventPayload } from 'react-native-gesture-handler/src/handlers/gestures/panGesture.ts'
import { bool } from 'yup'

const timingConfig: WithTimingConfig = {
  duration: 100,
  easing: Easing.out(Easing.ease),
}

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
  scroll = false,
}: ActionSheetProps) {
  /** hook */
  const { colors } = useTheme()

  /** state */
  const [layoutH, setLayoutH] = useState(0)
  const [contentH, setContentH] = useState(0)
  const [scrollEnabled, setScrollEnabled] = useState(false)
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
        translateY.value = withTiming(target, timingConfig)
        accTranslateY.value = target
      } else {
        translateY.value = withTiming(0, timingConfig)
        accTranslateY.value = 0
      }
      opacity.value = withTiming(dim ? 0.7 : 0, timingConfig)
    } else {
      translateY.value = withTiming(windowH, timingConfig)
      opacity.value = withTiming(0, timingConfig, () => {
        if (onClose) runOnJS(onClose)()
      })
    }
  }, [localVisible, contentH, snapHeights])
  useDerivedValue(() => {
    runOnJS(setScrollEnabled)(translateY.value === 0)
  }, [])

  /** other */
  const panGesture = Gesture.Pan()
    .onChange(event => {
      if (accTranslateY.value + event.translationY > 0) {
        translateY.value = accTranslateY.value + event.translationY
      } else {
        translateY.value = accTranslateY.value + event.translationY / 20
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

      translateY.value = withTiming(contentH - snapTarget, timingConfig)
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

  return (
    <Portal>
      <View flex={1} onLayout={handleLayout}>
        {dim && (
          <TouchableWithoutFeedback onPress={() => setLocalVisible(false)}>
            <AnimatedView flex={1} bg={colors.backdrop} style={dimStyle} />
          </TouchableWithoutFeedback>
        )}
      </View>

      <GestureDetector gesture={panGesture}>
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
          <View alignItems='center' p={15}>
            <View
              bg={colors.onSurface}
              opacity={0.5}
              height={4}
              width={30}
              borderRadius={30}
            />
          </View>
          {scroll ? (
            <ScrollView scrollEnabled={scrollEnabled}>{children}</ScrollView>
          ) : (
            <View>{children}</View>
          )}
        </AnimatedView>
      </GestureDetector>
    </Portal>
  )
}

export default React.memo(ActionSheet)
