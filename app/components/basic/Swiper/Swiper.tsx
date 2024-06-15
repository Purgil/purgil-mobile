import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native'
import { AnimatedView, Icon, Pressable, View } from '~/components/styled'
import { useTheme } from 'react-native-paper'
import { SimultaneousRefs } from '~/core/data/basic.types'

const GAP_WIDTH = 8

type Props = {
  data: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  groupCount?: number
  hideIndicator?: boolean
} & Partial<SimultaneousRefs>

function Swiper({
  data = [],
  renderItem,
  groupCount = 1,
  hideIndicator = false,
  swiperRef,
  scrollRef,
}: Props) {
  /** state */
  const [contentW, setContentW] = useState(0)
  const [currIndex, setCurrIndex] = useState(0)

  /** shared */
  const translateX = useSharedValue(0)
  const accTranslateX = useSharedValue(0)

  /** hooks */
  const { colors } = useTheme()

  /** memo */
  const dividedContentW = useMemo(
    () =>
      groupCount
        ? (contentW - (groupCount - 1) * GAP_WIDTH) / groupCount
        : contentW,
    [contentW, groupCount],
  )
  const maxOffset = useMemo(
    () =>
      -(data.length - groupCount) * dividedContentW -
      GAP_WIDTH * (data.length - groupCount),
    [data, dividedContentW],
  )

  /** handle */
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContentW(width)
  }, [])

  useEffect(() => {
    const destination = -currIndex * (dividedContentW + GAP_WIDTH)
    translateX.value = withTiming(destination, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    })
    accTranslateX.value = destination
  }, [currIndex])

  /** other */
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const targetX = accTranslateX.value + event.translationX
      if (targetX <= 0 && targetX >= maxOffset) {
        translateX.value = targetX
      }
    })
    .onEnd(event => {
      let targetIndex
      if (currIndex === 0 && translateX.value > 0) {
        targetIndex = 0
      } else if (translateX.value <= maxOffset + 1) {
        targetIndex = data.length - groupCount
      } else {
        targetIndex = Math.round(
          -translateX.value / (dividedContentW + GAP_WIDTH),
        )
        if (targetIndex === currIndex) {
          if (event.translationX > 30 && currIndex > 0) targetIndex--
          else if (event.translationX < -30 && currIndex < data.length - 1)
            targetIndex++
        }
      }
      if (currIndex === targetIndex) {
        const destination = -currIndex * (dividedContentW + GAP_WIDTH)
        translateX.value = withTiming(destination, {
          duration: 100,
          easing: Easing.out(Easing.ease),
        })
        accTranslateX.value = destination
      } else {
        runOnJS(setCurrIndex)(targetIndex)
      }
    })
    .simultaneousWithExternalGesture(scrollRef || {})
    .withRef(swiperRef || {})

  /** style */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  /** render */
  const renderDot = useCallback(
    (i: number) => (
      <Pressable key={i} onPress={() => setCurrIndex(i)}>
        <Icon
          size={10}
          source='checkbox-blank-circle'
          color={
            i === currIndex
              ? colors.primaryContainer
              : colors.primaryContainer + '44'
          }
        />
      </Pressable>
    ),
    [colors, currIndex],
  )

  return (
    <View>
      <GestureDetector gesture={panGesture}>
        <AnimatedView
          onLayout={handleLayout}
          style={animatedStyle}
          flexDirection='row'
          borderRadius={7}
          gap={GAP_WIDTH}>
          {data.map((item, index) => (
            <View key={index} width={dividedContentW}>
              {renderItem(item, index)}
            </View>
          ))}
        </AnimatedView>
      </GestureDetector>

      {!hideIndicator && (
        <View
          position='absolute'
          width='100%'
          bottom={30}
          justifyContent='center'
          flexDirection='row'
          gap={5}>
          {data.map((_, i) => renderDot(i))}
        </View>
      )}
    </View>
  )
}

export default memo(Swiper)
