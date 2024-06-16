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

type Props = {
  data: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  groupCount?: number
  hideIndicator?: boolean
  gap?: number
} & Partial<SimultaneousRefs>

function Swiper({
  data = [],
  groupCount = 1,
  hideIndicator = false,
  gap = 0,
  renderItem,
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
      groupCount ? (contentW - (groupCount - 1) * gap) / groupCount : contentW,
    [contentW, groupCount],
  )
  const maxOffset = useMemo(
    () =>
      -(data.length - groupCount) * dividedContentW -
      gap * (data.length - groupCount),
    [data, dividedContentW],
  )

  /** handle */
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContentW(width)
  }, [])

  /** effect */
  useEffect(() => {
    const destination = -currIndex * (dividedContentW + gap)
    translateX.value = withTiming(destination, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    })
    accTranslateX.value = destination
  }, [currIndex])

  useEffect(() => {
    if (currIndex > data.length - groupCount && data.length >= groupCount) {
      setCurrIndex(data.length - groupCount)
    }
  }, [data.length])

  /** other */
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (data.length <= groupCount) return
      const targetX = accTranslateX.value + event.translationX
      if (targetX <= 0 && targetX >= maxOffset) {
        translateX.value = targetX
      }
    })
    .onEnd(event => {
      if (data.length <= groupCount) return
      let targetIndex
      if (currIndex === 0 && translateX.value > 0) {
        targetIndex = 0
      } else if (translateX.value <= maxOffset + 1) {
        targetIndex = data.length - groupCount
      } else {
        targetIndex = Math.round(-translateX.value / (dividedContentW + gap))
        if (targetIndex === currIndex) {
          if (event.translationX > 30 && currIndex > 0) targetIndex--
          else if (event.translationX < -30 && currIndex < data.length - 1)
            targetIndex++
        }
      }
      if (currIndex === targetIndex) {
        const destination = -currIndex * (dividedContentW + gap)
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
          gap={gap}>
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
