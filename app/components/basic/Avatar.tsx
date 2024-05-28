import React from 'react'
import { User } from '~/core/data/user.data'
import { Text, View } from '~/components/styled'
import { Avatar as RNAvatar, useTheme } from 'react-native-paper'

type Props = {
  user: User
  size?: number
}

function Avatar({ user, size = 30 }: Props) {
  const { colors } = useTheme()

  return (
    <View flexDirection='row' alignItems='center' gap={3}>
      <Text>{user.nickname}</Text>
      <RNAvatar.Text
        label='XD'
        size={size}
        style={{ backgroundColor: colors.tertiary }}
      />
    </View>
  )
}

export default React.memo(Avatar)
