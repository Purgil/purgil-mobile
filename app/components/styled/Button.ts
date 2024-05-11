import * as React from 'react'
import {
  ColorProps,
  FontSizeProps,
  SpaceProps,
  color,
  fontSize,
  space,
} from 'styled-system'
import styled from 'styled-components/native'
import { Button as RNPButton } from 'react-native-paper'

interface ButtonStyledProps extends ColorProps, FontSizeProps, SpaceProps {
  children: React.ReactNode
}

const Button = styled(RNPButton)<ButtonStyledProps>`
  ${color}
  ${fontSize}
  ${space}
`
export default Button
