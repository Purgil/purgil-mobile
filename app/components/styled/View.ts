import * as React from 'react'
import {
  FlexboxProps,
  ColorProps,
  PaddingProps,
  flexbox,
  color,
  padding,
} from 'styled-system'
import styled from 'styled-components/native'

interface ViewStyledProps extends FlexboxProps, ColorProps, PaddingProps {
  children: React.ReactNode
}

const View = styled.View<ViewStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
`
export default View
