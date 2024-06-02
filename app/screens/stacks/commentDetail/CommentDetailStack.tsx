import { RootStackScreenProps } from '~/navigation/types.ts'
import { Appbar } from 'react-native-paper'
import React from 'react'
import { View } from '~/components/styled'

export function CommentDetailStack({
  navigation,
  route: {
    params: { comment },
  },
}: RootStackScreenProps<'CommentDetail'>) {
  return (
    <View zIndex={999}>
      <Appbar.Header style={{ backgroundColor: 'transparent' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} size={20} />
        <Appbar.Content title='답글' />
      </Appbar.Header>
    </View>
  )
}
