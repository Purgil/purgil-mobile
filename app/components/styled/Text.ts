import * as React from 'react'
import {
  ColorProps,
  color,
  FontSizeProps,
  fontSize,
  FontWeightProps,
  fontWeight,
  TextAlignProps,
  textAlign,
  SpaceProps,
  space,
  MarginProps,
  margin,
  WidthProps,
  width,
} from 'styled-system'
import styled from 'styled-components/native'
import { Text as RNPText } from 'react-native-paper'

interface TextStyledProps
  extends ColorProps,
    FontSizeProps,
    TextAlignProps,
    MarginProps,
    FontWeightProps,
    WidthProps,
    SpaceProps {
  children: React.ReactNode
}

const Text = styled(RNPText)<TextStyledProps>`
  ${color}
  ${fontSize}
  ${textAlign}
  ${space}
  ${margin}
  ${fontWeight}
  ${width}
`
export default Text
