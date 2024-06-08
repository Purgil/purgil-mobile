import {
  MarginProps,
  margin,
  PositionProps,
  position,
  DisplayProps,
  display,
} from 'styled-system'
import styled from 'styled-components/native'
import { Avatar as MyAvatar } from '~/components/basic'

interface AvatarStyledProps extends MarginProps, DisplayProps, PositionProps {}

const Avatar = styled(MyAvatar)<AvatarStyledProps>`
  ${margin}
  ${position}
  ${display}
`
export default Avatar
