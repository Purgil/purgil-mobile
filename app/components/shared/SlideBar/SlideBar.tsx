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

export type SlideBarProps = {
  divideCount?: number
  multiply?: number
  leftLabel?: string
  rightLabel?: string
  unitText?: string
  leftValue?: number
  rightValue?: number
  leftOnChange?: (value: number) => void
  rightOnChange?: (value: number) => void
  fixedRight?: boolean
  fixedLeft?: boolean
  minValue?: number
}

function SlideBar({
  divideCount = 10,
  multiply = 1,
  leftValue = 0,
  rightValue = 0,
  minValue = 0,
  leftLabel,
  rightLabel,
  unitText,
  rightOnChange,
  leftOnChange,
  fixedRight,
  fixedLeft,
}: SlideBarProps) {
  /** hook */
  const { colors } = useTheme()

  /** state */
  const [width, setWidth] = React.useState(0)
  const [leftTargetIndex, setLeftTargetIndex] = React.useState(
    (leftValue - minValue) / multiply,
  )
  const [rightTargetIndex, setRightTargetIndex] = React.useState(
    (rightValue - minValue) / multiply || divideCount,
  )
  const [pandingStatus, setPandingStatus] = React.useState<
    undefined | 'panding' | 'padingFinished'
  >()

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
    if (leftLabel) return leftLabel
    if (unitText) return `${leftTargetIndex * multiply + minValue} ${unitText}`
    return `${leftTargetIndex * multiply + minValue}`
  }, [leftTargetIndex])

  const rightLabelText = useMemo(() => {
    if (rightLabel) return rightLabel
    if (rightTargetIndex === divideCount && unitText)
      return `${rightTargetIndex * multiply + minValue}+ ${unitText}`
    if (unitText) return `${rightTargetIndex * multiply + minValue} ${unitText}`
    return `${rightTargetIndex * multiply + minValue}`
  }, [rightTargetIndex])

  /** function */
  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    const targetWidth = event.nativeEvent.layout.width
    setWidth(targetWidth)
    pl.value = targetWidth * (leftTargetIndex / divideCount)
    pr.value = targetWidth * (1 - rightTargetIndex / divideCount)
  }, [])

  /** effect */
  useEffect(() => {
    if (pandingStatus === 'padingFinished') {
      if (movingIndicator.value === 'left' && leftOnChange)
        leftOnChange(leftTargetIndex * multiply + minValue)
      else if (movingIndicator.value === 'right' && rightOnChange)
        rightOnChange(rightTargetIndex * multiply + minValue)
      setPandingStatus(undefined)
    }
  }, [pandingStatus])

  useEffect(() => {
    if (leftValue !== leftTargetIndex * multiply + minValue) {
      setLeftTargetIndex((leftValue - minValue) / multiply)
      pl.value = 0
    }
  }, [leftValue])
  useEffect(() => {
    if (rightValue !== rightTargetIndex * multiply + minValue) {
      setRightTargetIndex((rightValue - minValue) / multiply)
      pr.value = 0
    }
  }, [rightValue])

  /** animated */
  const pl = useSharedValue(0)
  const pr = useSharedValue(0)
  const movingIndicator = useSharedValue<'left' | 'right'>('left')

  const panGesture = Gesture.Pan()
    .onBegin(({ x }) => {
      if (fixedLeft && fixedRight) return
      runOnJS(setPandingStatus)('panding')
      let mvInd: 'left' | 'right' | undefined
      if (fixedLeft) mvInd = 'right'
      else if (fixedRight) mvInd = 'left'
      else mvInd = x - pl.value < width - pr.value - x ? 'left' : 'right'
      movingIndicator.value = mvInd

      const result = dividedX.reduce(
        (acc, cur, index) => {
          if (Math.abs(cur - x) < Math.abs(acc.value - x)) {
            return { value: cur, index }
          } else {
            return acc
          }
        },
        {
          value: mvInd === 'left' ? pl.value + 10 : width - pr.value - 10,
          index: mvInd === 'left' ? leftTargetIndex : rightTargetIndex,
        },
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
      if (
        movingIndicator.value === 'left' &&
        result.index !== leftTargetIndex &&
        result.index <= rightTargetIndex
      ) {
        pl.value = result.value - 10
        runOnJS(setLeftTargetIndex)(result.index)
      } else if (
        movingIndicator.value === 'right' &&
        result.index !== rightTargetIndex &&
        result.index >= leftTargetIndex
      ) {
        pr.value = width - result.value - 10
        runOnJS(setRightTargetIndex)(result.index)
      }
    })
    .onFinalize(() => {
      runOnJS(setPandingStatus)('padingFinished')
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
              {!fixedLeft && (
                <Pressable
                  position='absolute'
                  height={16}
                  width={16}
                  borderRadius={100}
                  bg={colors.onBackground}
                  ml={-2}
                  opacity={0.9}
                />
              )}
              {!fixedRight && (
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
              )}
            </View>
          </AnimatedView>
        </View>
      </GestureDetector>
    </View>
  )
}

export default React.memo(SlideBar)
