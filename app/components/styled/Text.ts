import * as React from 'react'
import {
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
  TextAlignProps,
  textAlign,
  SpaceProps,
  space,
  MarginProps,
  margin,
} from 'styled-system'
import styled from 'styled-components/native'
import { Text as RNPText } from 'react-native-paper'

interface TextStyledProps
  extends ColorProps,
    FontSizeProps,
    TextAlignProps,
    MarginProps,
    SpaceProps {
  children: React.ReactNode
}

const Text = styled(RNPText)<TextStyledProps>`
  ${color}
  ${fontSize}
  ${textAlign}
  ${space}
  ${margin}
`
export default Text
