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
    PositionProps {
  children: React.ReactNode
  gap?: number
}

const AnimatedScrollView = styled(Animated.ScrollView)<AnimatedViewStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
  ${width}
  ${position}
`
export default AnimatedScrollView
