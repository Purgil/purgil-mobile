import * as React from 'react'
import {
  FlexboxProps,
  flexbox,
  ColorProps,
  color,
  PaddingProps,
  padding,
  BorderProps,
  border,
  HeightProps,
  height,
} from 'styled-system'
import styled from 'styled-components/native'
import { ScrollView as GHScrollView } from 'react-native-gesture-handler'

interface ScrollViewStyledProps
  extends FlexboxProps,
    ColorProps,
    PaddingProps,
    HeightProps,
    BorderProps {
  children: React.ReactNode
  gap?: number
}

const ScrollView = styled(GHScrollView)<ScrollViewStyledProps>`
  ${flexbox}
  ${color}
  ${padding}
  ${border}
  ${height}
`
export default ScrollView
