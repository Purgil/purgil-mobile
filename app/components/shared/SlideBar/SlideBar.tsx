import React, { useEffect, useMemo } from 'react'
import { AnimatedView, Pressable, Text, View } from '~/components/styled'
import { useTheme } from 'react-native-paper'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native'

type Props = {
  divideCount?: number
  multiply?: number
  leftLabel?: string | ((leftTargetNumber: number) => string)
  rightLabel?: string | ((rightTargetNumber: number) => string)
  leftValue?: number
  rightValue?: number
  leftOnChange?: (value: number) => void
  rightOnChange?: (value: number) => void
}

function SlideBar({
  divideCount = 10,
  multiply = 1,
  leftLabel = '',
  rightLabel = '',
  leftValue = 0,
  rightValue = 0,
  rightOnChange,
  leftOnChange,
}: Props) {
  /** hook */
  const { colors } = useTheme()

  /** state */
  const [movingIndicator, setMovingIndicator] = React.useState<
    'left' | 'right'
  >('left')
  const [width, setWidth] = React.useState(0)
  const [leftTargetIndex, setLeftTargetIndex] = React.useState(
    leftValue / multiply,
  )
  const [rightTargetIndex, setRightTargetIndex] = React.useState(
    rightValue / multiply || divideCount,
  )

  /** memo */
  const dividedX = useMemo(() => {
    if (!width) return []

    const result = []
    for (let i = 0; i <= divideCount; i++) {
      result.push(width * (i / divideCount))
    }
    return result
  }, [width])

  const leftLabelText = useMemo(() => {
    if (typeof leftLabel === 'string') return leftLabel
    if (leftLabel) return leftLabel(leftTargetIndex * multiply)
  }, [leftTargetIndex])

  const rightLabelText = useMemo(() => {
    if (typeof rightLabel === 'string') return rightLabel
    if (rightLabel) return rightLabel(rightTargetIndex * multiply)
  }, [rightTargetIndex])

  /** function */
  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    const targetWidth = event.nativeEvent.layout.width
    setWidth(targetWidth)
    pl.value = targetWidth * (leftTargetIndex / divideCount)
    pr.value = targetWidth * (1 - rightTargetIndex / divideCount)
  }, [])

  /** animated */
  const pl = useSharedValue(0)
  const pr = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .onBegin(({ x }) => {
      console.log('x - pl.value>>', x - pl.value)
      console.log('width - pr.value - x>>', width - pr.value - x)
      const mvInd = x - pl.value < width - pr.value - x ? 'left' : 'right'
      runOnJS(setMovingIndicator)(mvInd)

      const result = dividedX.reduce(
        (acc, cur, index) => {
          if (Math.abs(cur - x) < Math.abs(acc.value - x)) {
            return { value: cur, index }
          } else {
            return acc
          }
        },
        { value: dividedX[0], index: 0 },
      )

      if (mvInd === 'left') {
        pl.value = result.value - 10
        runOnJS(setLeftTargetIndex)(result.index)
      } else {
        pr.value = width - result.value - 10
        runOnJS(setRightTargetIndex)(result.index)
      }
    })
    .onUpdate(({ x }) => {
      const result = dividedX.reduce(
        (acc, cur, index) => {
          if (Math.abs(cur - x) < Math.abs(acc.value - x)) {
            return { value: cur, index }
          } else {
            return acc
          }
        },
        { value: dividedX[0], index: 0 },
      )
      if (movingIndicator === 'left') {
        pl.value = Math.min(result.value - 10, width - pr.value - 20)
        runOnJS(setLeftTargetIndex)(Math.min(result.index, rightTargetIndex))
      } else {
        pr.value = Math.max(
          Math.min(width - result.value - 10, width - pl.value - 20),
          0,
        )
        runOnJS(setRightTargetIndex)(Math.max(result.index, leftTargetIndex))
      }
    })
    .onEnd(() => {
      if (movingIndicator === 'left' && leftOnChange)
        runOnJS(leftOnChange)(leftTargetIndex * multiply)
      else if (movingIndicator === 'right' && rightOnChange)
        runOnJS(rightOnChange)(rightTargetIndex * multiply)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    paddingRight: pr.value,
    paddingLeft: pl.value,
  }))

  return (
    <View pl={16} pr={20} py={10}>
      <View flexDirection='row' justifyContent='space-between' mb={1}>
        <Text>{leftLabelText}</Text>
        <Text>{rightLabelText}</Text>
      </View>

      <GestureDetector gesture={panGesture}>
        <View p={10} onLayout={handleLayout}>
          <AnimatedView
            style={animatedStyle}
            bg={colors.elevation.level5}
            height={6}
            borderRadius={100}
            alignItems='center'>
            <View
              position='relative'
              alignItems='center'
              bg={colors.primary}
              height={6}
              width='100%'
              flexDirection='row'
              borderRadius={100}
              justifyContent='space-between'>
              <Pressable
                position='absolute'
                height={16}
                width={16}
                borderRadius={100}
                bg={colors.onBackground}
                ml={-2}
                opacity={0.9}
              />
              <Pressable
                position='absolute'
                right={0}
                height={16}
                width={16}
                borderRadius={100}
                bg={colors.onBackground}
                mr={-2}
                opacity={0.9}
              />
            </View>
          </AnimatedView>
        </View>
      </GestureDetector>
    </View>
  )
}

export default React.memo(SlideBar)
