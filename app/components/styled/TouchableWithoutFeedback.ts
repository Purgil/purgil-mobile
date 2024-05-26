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
import { MutableRefObject } from 'react'
import { TouchableWithoutFeedback as RNTouchableWithoutFeedback } from 'react-native'

interface TouchableWithoutFeedbackStyledProps
  extends FlexboxProps,
    ColorProps,
    PaddingProps,
    MarginProps,
    HeightProps,
    WidthProps,
    BorderProps,
    PositionProps {
  children?: React.ReactNode
  gap?: number
  ref?: MutableRefObject<any>
}

const TouchableWithoutFeedback = styled(
  RNTouchableWithoutFeedback,
)<TouchableWithoutFeedbackStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
  ${width}
  ${position}
`
export default TouchableWithoutFeedback
