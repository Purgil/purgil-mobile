import React from 'react'
import { User } from '~/core/data/user.data'
import { Text, View } from '~/components/styled'
import { Avatar as RNAvatar, useTheme } from 'react-native-paper'

type Props = {
  user: User
  nicknameDisplayType?: 'left' | 'right' | 'hidden'
  underNickname?: string
  size?: number
  nicknameSize?: number
}

function Avatar({
  user,
  size = 30,
  nicknameDisplayType = 'left',
  underNickname,
  nicknameSize = 13,
}: Props) {
  const { colors } = useTheme()

  return (
    <View
      flexDirection={nicknameDisplayType === 'right' ? 'row-reverse' : 'row'}
      justifyContent='flex-end'
      alignItems='center'
      gap={5}>
      <View
        gap={1}
        alignItems={
          nicknameDisplayType === 'right' ? 'flex-start' : 'flex-end'
        }>
        {nicknameDisplayType !== 'hidden' && (
          <Text fontSize={nicknameSize}>{user.nickname}</Text>
        )}
        {underNickname && (
          <Text color={colors.onSurfaceVariant} fontSize={nicknameSize * 0.8}>
            {underNickname}
          </Text>
        )}
      </View>
      <RNAvatar.Text
        label='XD'
        size={size}
        style={{ backgroundColor: colors.tertiary }}
      />
    </View>
  )
}

export default React.memo(Avatar)
