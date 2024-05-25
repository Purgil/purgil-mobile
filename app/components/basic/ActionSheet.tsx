import { AnimatedView, Text, View } from '~/components/styled'
import {
  Dimensions,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
} from 'react-native'
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

const timingConfig: WithTimingConfig = {
  duration: 100,
  easing: Easing.out(Easing.ease),
}

const windowHeight = Dimensions.get('window').height

export type ActionSheetProps = {
  visible: boolean
  onClose: () => void
  rounded?: boolean
  showIndicator?: boolean
  title?: string
  snapPoints?: number[]
} & Partial<PropsWithChildren>

function ActionSheet({
  visible,
  onClose,
  rounded = true,
  showIndicator = true,
  title,
  children,
  snapPoints = [],
}: ActionSheetProps) {
  const { colors } = useTheme()

  /* animatedValue */
  const translateY = useSharedValue(windowHeight)
  const accTranslateY = useSharedValue(0)
  const opacity = useSharedValue(0)

  /* state */
  const [screenHeight, setScreenHeight] = useState(0)
  const [sheetHeight, setSheetHeight] = useState(0)

  /* memo */
  const snapHeights = useMemo(() => {
    if (snapPoints?.length > 0) {
      return snapPoints.sort((a, b) => a - b).map(v => screenHeight * v)
    } else {
      return [sheetHeight]
    }
  }, [snapPoints, sheetHeight, screenHeight])

  const maxSnapHeight = useMemo(() => Math.max(...snapHeights), [snapHeights])

  /* handle */
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout
    setScreenHeight(layoutHeight)
  }, [])

  const handleActionSheetLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: sheetLayoutHeight } = event.nativeEvent.layout
    setSheetHeight(sheetLayoutHeight)
  }, [])

  const handleClose = useCallback(() => {
    setSheetHeight(-1)
  }, [])

  /* useEffect */
  useEffect(() => {
    if (visible) {
      if (snapHeights?.length > 0) {
        translateY.value = withTiming(
          sheetHeight - snapHeights[0],
          timingConfig,
        )
        accTranslateY.value = sheetHeight - snapHeights[0]
      } else {
        translateY.value = withTiming(0, timingConfig)
      }
      opacity.value = withTiming(0.7, timingConfig)
    } else {
      translateY.value = withTiming(sheetHeight, timingConfig)
    }
  }, [visible, sheetHeight, snapHeights])

  useEffect(() => {
    if (sheetHeight === -1) {
      opacity.value = withTiming(0, timingConfig)
      translateY.value = withTiming(
        screenHeight,
        timingConfig,
        (finished, current) => {
          if (finished) {
            runOnJS(onClose)()
          }
        },
      )
    }
  }, [sheetHeight])

  const PanGesture = Gesture.Pan()
    .onChange(event => {
      const target = accTranslateY.value + event.translationY
      if (sheetHeight - target <= maxSnapHeight) {
        translateY.value = target
      }
    })
    .onEnd(event => {
      let snapTarget = [0, ...snapHeights].reduce(
        (closest, snapHeight) =>
          Math.abs(sheetHeight - translateY.value - snapHeight) <
          Math.abs(sheetHeight - translateY.value - closest)
            ? snapHeight
            : closest,
        sheetHeight - accTranslateY.value,
      )

      if (
        snapTarget === sheetHeight - accTranslateY.value &&
        Math.abs(event.translationY) > 50
      ) {
        const index = snapHeights.indexOf(snapTarget)
        if (event.translationY > 0) {
          console.log('아래>>')
          snapTarget = index > 0 ? snapHeights[index - 1] : 0
        } else if (event.translationY < 0 && index < snapHeights.length - 1) {
          console.log('위>>')
          snapTarget = snapHeights[index + 1]
        }
      }

      translateY.value = withTiming(sheetHeight - snapTarget, timingConfig)
      accTranslateY.value = sheetHeight - snapTarget

      if (snapTarget === 0) {
        runOnJS(setSheetHeight)(-1)
      }
    })

  const dimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Portal>
      {/* dim 영역 */}
      <TouchableWithoutFeedback onPress={handleClose}>
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
          onLayout={handleActionSheetLayout}
          bg={colors.elevation.level1}
          position='absolute'
          bottom={0}
          width='100%'
          borderTopRightRadius={rounded ? 20 : 0}
          borderTopLeftRadius={rounded ? 20 : 0}
          style={animatedStyle}>
          <AnimatedView px={20}>
            {/* indicator 영역 */}
            {showIndicator && (
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
            {title && (
              <Text variant='headlineMedium' py={10}>
                {title}
              </Text>
            )}
            {children}
          </AnimatedView>
          <View
            height={windowHeight}
            mb={1 - windowHeight}
            bg={colors.elevation.level1}
          />
        </AnimatedView>
      </GestureDetector>
    </Portal>
  )
}

export default React.memo(ActionSheet)
