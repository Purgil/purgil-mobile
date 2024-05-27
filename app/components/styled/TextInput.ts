import { SpaceProps, space, HeightProps, height } from 'styled-system'
import styled from 'styled-components/native'
import { TextInput as RNPTextInput } from 'react-native-paper'

interface TextInputStyledProps extends SpaceProps, HeightProps {}

const TextInput = styled(RNPTextInput)<TextInputStyledProps>`
  ${space}
  ${height}
`
export default TextInput
