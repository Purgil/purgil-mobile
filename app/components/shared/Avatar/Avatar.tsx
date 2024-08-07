import React from 'react'
import { Text, View } from '~/components/styled'
import { Avatar as RNAvatar, useTheme } from 'react-native-paper'
import { UserData } from '~/core/dto/user/user.data'

type Props = {
  user: UserData
  nicknameDisplayType?: 'left' | 'right' | 'hidden'
  flexEnd?: boolean
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
  flexEnd = false,
}: Props) {
  const { colors } = useTheme()

  return (
    <View
      flexDirection={nicknameDisplayType === 'right' ? 'row-reverse' : 'row'}
      alignItems='center'
      justifyContent={
        nicknameDisplayType === 'right' ? 'flex-end' : 'flex-start'
      }
      gap={5}>
      <View gap={1} alignItems={flexEnd ? 'flex-end' : 'flex-start'}>
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
