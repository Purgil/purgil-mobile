import {
  SpaceProps,
  space,
  HeightProps,
  height,
  FlexProps,
  flex,
} from 'styled-system'
import styled from 'styled-components/native'
import { TextInput as RNPTextInput } from 'react-native-paper'

interface TextInputStyledProps extends SpaceProps, HeightProps, FlexProps {}

const TextInput = styled(RNPTextInput)<TextInputStyledProps>`
  ${space}
  ${height}
  ${flex}
`
export default TextInput
