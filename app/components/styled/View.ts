import * as React from 'react'
import {
  FlexboxProps,
  flexbox,
  ColorProps,
  color,
  PaddingProps,
  padding,
} from 'styled-system'
import styled from 'styled-components/native'

interface ViewStyledProps extends FlexboxProps, ColorProps, PaddingProps {
  children: React.ReactNode
  gap?: number
}

const View = styled.View<ViewStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
`
export default View
