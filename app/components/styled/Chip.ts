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
import { Chip as RNPChip } from 'react-native-paper'

interface ChipStyledProps
  extends ColorProps,
    FontSizeProps,
    SpaceProps,
    FlexboxProps,
    WidthProps,
    MaxWidthProps {
  children: React.ReactNode
}

const Chip = styled(RNPChip)<ChipStyledProps>`
  ${color}
  ${fontSize}
  ${space}
  ${flexbox}
  ${width}
  ${maxWidth}
`
export default Chip
