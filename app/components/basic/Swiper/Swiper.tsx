import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native'
import {
  AnimatedScrollView,
  AnimatedView,
  Icon,
  ScrollView,
  View,
} from '~/components/styled'
import { useTheme } from 'react-native-paper'

type Props = {
  data: any[]
  renderItem: (item: any) => React.ReactNode
  groupCount?: number
  hideIndicator?: boolean
  panRef?: any
  listRef?: any
}

function Swiper({
  data = [],
  renderItem,
  groupCount = 1,
  hideIndicator = false,
  panRef,
  listRef,
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
    () => (groupCount ? contentW / groupCount : contentW),
    [contentW, groupCount],
  )
  const maxOffset = useMemo(
    () => -(data.length - groupCount) * dividedContentW,
    [data, dividedContentW],
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
        let closestIndex = Math.round(-destination / dividedContentW)
        if (closestIndex === currIndex) {
          if (event.translationX > 50 && currIndex > 0) closestIndex--
          else if (event.translationX < -50 && currIndex < data.length - 1)
            closestIndex++
        }
        destination = -closestIndex * dividedContentW
        runOnJS(setCurrIndex)(closestIndex)
      }

      translateX.value = withTiming(destination, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      })
      accTranslateX.value = destination
    })
    .simultaneousWithExternalGesture(listRef || {})
    .withRef(panRef || {})

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  useEffect(() => {
    console.log('panRef>>', panRef)
    console.log('listRef>>', listRef)
  }, [panRef, listRef])

  /** render */
  const dotRenderer = useCallback(
    (i: number) => (
      <Icon
        key={i}
        size={8}
        source='checkbox-blank-circle'
        color={i === currIndex ? colors.primary : colors.primary + '44'}
      />
    ),
    [colors, currIndex],
  )

  return (
    <>
      <View flex={1} width='100%'>
        <GestureDetector gesture={panGesture}>
          <AnimatedView
            width='100%'
            onLayout={handleLayout}
            style={animatedStyle}
            flexDirection='row'
            borderRadius={7}
            // gap={15}
          >
            {data.map((item, index) => (
              <View
                key={index}
                width={groupCount > 1 ? contentW / groupCount : contentW}>
                {renderItem(item)}
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
            {data.map((_, i) => dotRenderer(i))}
          </View>
        )}
      </View>
    </>
  )
}

export default memo(Swiper)
