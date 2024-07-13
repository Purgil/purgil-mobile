import { Avatar, Button, TouchableRipple } from '~/components/styled'
import { UserData } from '~/core/dto/user/user.data'
import { memo } from 'react'

type Props = {
  user: UserData
}

function UserListItem({ user }: Props) {
  return (
    <TouchableRipple
      onPress={() => {}}
      px={10}
      py={15}
      flexDirection='row'
      justifyContent='space-between'>
      <>
        <Avatar user={user} nicknameDisplayType='right' />
        <Button compact mode='contained-tonal' onPress={() => {}}>
          팔로우
        </Button>
      </>
    </TouchableRipple>
  )
}

export default memo(UserListItem)
