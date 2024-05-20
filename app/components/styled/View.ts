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
} from 'styled-system'
import styled from 'styled-components/native'

interface ViewStyledProps
  extends FlexboxProps,
    ColorProps,
    PaddingProps,
    MarginProps,
    HeightProps,
    WidthProps,
    BorderProps {
  children: React.ReactNode
  gap?: number
}

const View = styled.View<ViewStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${margin}
  ${height}
  ${width}
`
export default View
