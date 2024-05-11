import { SpaceProps, space } from 'styled-system'
import styled from 'styled-components/native'
import { TextInput as RNPTextInput } from 'react-native-paper'

interface TextInputStyledProps extends SpaceProps {}

const TextInput = styled(RNPTextInput)<TextInputStyledProps>`
  ${space}
`
export default TextInput
