import * as React from 'react'
import { TouchableRipple as RNPTouchableRipple } from 'react-native-paper'
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
} from 'styled-system'
import styled from 'styled-components/native'

interface TouchableRippleStyledProps
  extends FlexboxProps,
    ColorProps,
    PaddingProps,
    MarginProps,
    HeightProps,
    BorderProps {
  children: React.ReactNode
  gap?: number
}

const TouchableRipple = styled(RNPTouchableRipple)<TouchableRippleStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
`
export default TouchableRipple
