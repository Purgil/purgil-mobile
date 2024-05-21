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
import styled from 'styled-components/native'
import { Appbar as RNAppbar } from 'react-native-paper'

interface AppbarStyledProps
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

const Appbar = styled(RNAppbar)<AppbarStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
  ${width}
  ${position}
`
export default Appbar
