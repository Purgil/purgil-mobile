import * as React from 'react'
import {
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
  SpaceProps,
  space,
  FlexboxProps,
  flexbox,
  WidthProps,
  width,
  MaxWidthProps,
  maxWidth,
} from 'styled-system'
import styled from 'styled-components/native'
import { Button as RNPButton } from 'react-native-paper'

interface ButtonStyledProps
  extends ColorProps,
    FontSizeProps,
    SpaceProps,
    FlexboxProps,
    WidthProps,
    MaxWidthProps {
  children: React.ReactNode
}

const Button = styled(RNPButton)<ButtonStyledProps>`
  ${color}
  ${fontSize}
  ${space}
  ${flexbox}
  ${width}
  ${maxWidth}
`
export default Button
