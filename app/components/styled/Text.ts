import * as React from 'react'
import {
  ColorProps,
  FontSizeProps,
  TextAlignProps,
  SpaceProps,
  color,
  fontSize,
  textAlign,
  space,
} from 'styled-system'
import styled from 'styled-components/native'
import { Text as RNPText } from 'react-native-paper'

interface TextStyledProps
  extends ColorProps,
    FontSizeProps,
    TextAlignProps,
    SpaceProps {
  children: React.ReactNode
}

const Text = styled(RNPText)<TextStyledProps>`
  ${color}
  ${fontSize}
  ${textAlign}
  ${space}
`
export default Text
