import {
  FlexboxProps,
  flexbox,
  MarginProps,
  margin,
  BorderProps,
  border,
  HeightProps,
  height,
  WidthProps,
  width,
} from 'styled-system'
import styled from 'styled-components/native'
import { Image as RNImage } from 'react-native'

interface ImageStyledProps
  extends FlexboxProps,
    MarginProps,
    HeightProps,
    WidthProps,
    BorderProps {}

const Image = styled(RNImage)<ImageStyledProps>`
  ${flexbox}
  ${border}
  ${margin}
  ${height}
  ${width}
`
export default Image
