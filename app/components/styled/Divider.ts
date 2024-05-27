import * as React from 'react'
import { MarginProps, margin } from 'styled-system'
import styled from 'styled-components/native'
import { Divider as RNDivider } from 'react-native-paper'

interface DivierStyledProps extends MarginProps {}

const Divider = styled(RNDivider)<DivierStyledProps>`
  ${margin}
`
export default Divider
