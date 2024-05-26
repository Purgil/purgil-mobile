import * as React from 'react'
import {
  FlexboxProps,
  flexbox,
  ColorProps,
  color,
  MarginProps,
  margin,
  PaddingProps,
  padding,
  BorderProps,
  border,
  HeightProps,
  height,
  MaxHeightProps,
  maxHeight,
  WidthProps,
  width,
  PositionProps,
  position,
} from 'styled-system'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

interface AnimatedViewStyledProps
  extends FlexboxProps,
    ColorProps,
    PaddingProps,
    MarginProps,
    HeightProps,
    WidthProps,
    BorderProps,
    MaxHeightProps,
    PositionProps {
  children?: React.ReactNode
  gap?: number
}

const AnimatedView = styled(Animated.View)<AnimatedViewStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
  ${maxHeight}
  ${width}
  ${position}
`
export default AnimatedView
