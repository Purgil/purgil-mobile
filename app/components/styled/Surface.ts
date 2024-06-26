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
  DisplayProps,
  display,
} from 'styled-system'
import styled from 'styled-components/native'
import { Surface as RNPSurface } from 'react-native-paper'

interface SurfaceStyledProps
  extends FlexboxProps,
    ColorProps,
    PaddingProps,
    MarginProps,
    HeightProps,
    WidthProps,
    BorderProps,
    DisplayProps,
    PositionProps {
  children?: React.ReactNode
  gap?: number
}

const Surface = styled(RNPSurface)<SurfaceStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
  ${width}
  ${position}
  ${display}
`
export default Surface
