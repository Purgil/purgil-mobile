import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native'
import { AnimatedView, View } from '~/components/styled'
import { Icon, useTheme } from 'react-native-paper'

type Props = {
  data: any[]
  renderItem: (item: any) => React.ReactNode
}

function Swiper({ data = [], renderItem }: Props) {
  /** state */
  const [contentW, setContentW] = useState(0)
  const [currIndex, setCurrIndex] = useState(0)

  /** shared */
  const translateX = useSharedValue(0)
  const accTranslateX = useSharedValue(0)

  /** hooks */
  const { colors } = useTheme()

  /** memo */
  const maxOffset = useMemo(
    () => -(data.length - 1) * contentW,
    [data, contentW],
  )

  /** handle */
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContentW(width)
  }, [])

  /** other */
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const targetX = accTranslateX.value + event.translationX
      if (targetX > 0) {
        translateX.value = accTranslateX.value + event.translationX / 10
      } else if (targetX < maxOffset) {
        translateX.value = accTranslateX.value + event.translationX / 10
      } else {
        translateX.value = targetX
      }
    })
    .onEnd(event => {
      let destination = translateX.value
      if (currIndex === 0 && destination > 0) {
        destination = 0
        runOnJS(setCurrIndex)(0)
      } else if (destination < maxOffset) {
        destination = maxOffset
        runOnJS(setCurrIndex)(data.length - 1)
      } else {
        let closestIndex = Math.round(-destination / contentW)
        if (closestIndex === currIndex) {
          if (event.translationX > 50 && currIndex > 0) closestIndex--
          else if (event.translationX < -50 && currIndex < data.length - 1)
            closestIndex++
        }
        destination = -closestIndex * contentW
        runOnJS(setCurrIndex)(closestIndex)
      }

      translateX.value = withTiming(destination, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      })
      accTranslateX.value = destination
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const dotRenderer = useCallback(
    (i: number) => (
      <Icon
        key={i}
        size={6}
        source='checkbox-blank-circle'
        color={i === currIndex ? colors.primary : colors.onSurfaceDisabled}
      />
    ),
    [colors, currIndex],
  )

  return (
    <>
      <View flex={1}>
        <GestureDetector gesture={panGesture}>
          <AnimatedView
            onLayout={handleLayout}
            style={animatedStyle}
            flexDirection='row'
            borderRadius={7}>
            {data.map((item, index) => (
              <View key={index} width='100%'>
                {renderItem(item)}
              </View>
            ))}
          </AnimatedView>
        </GestureDetector>
      </View>

      <View
        justifyContent='flex-end'
        flexDirection='row'
        mr={20}
        mt={-20}
        mb={14}
        gap={5}>
        {data.map((_, i) => dotRenderer(i))}
      </View>
    </>
  )
}

export default Swiper
