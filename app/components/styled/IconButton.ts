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
import { IconButton as RNPIconButton } from 'react-native-paper'

interface IconButtonStyledProps extends ColorProps, FontSizeProps, SpaceProps {}
const IconButton = styled(RNPIconButton)<IconButtonStyledProps>`
  ${color}
  ${fontSize}
  ${space}
`
export default IconButton
