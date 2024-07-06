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
import { MutableRefObject } from 'react'

interface KeyboardAvoidingViewStyledProps
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
  ref?: MutableRefObject<any>
}

const KeyboardAvoidingView = styled.KeyboardAvoidingView<KeyboardAvoidingViewStyledProps>`
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
export default KeyboardAvoidingView
