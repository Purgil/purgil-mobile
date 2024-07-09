import {
  Avatar,
  Button,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import { memo, useCallback, useState } from 'react'
import { List, useTheme } from 'react-native-paper'
import { FlatList } from 'react-native'
import { applies } from '~/screens/expeditionDetail/consts.ts'
import { UserData } from '~/core/dto/user/user.data'

type Props = {
  id: number
}

function ExpeditionApplyTab({ id }: Props) {
  const { colors } = useTheme()

  const renderApplyItem = useCallback(
    ({ item }: { item: UserData }) => (
      <TouchableRipple px={18} py={15} onPress={() => {}}>
        <View justifyContent='space-between' flexDirection='row'>
          <Avatar user={item} nicknameDisplayType='right' />
          <View flexDirection='row'>
            <Button
              onPress={() => {}}
              textColor={colors.onErrorContainer}
              rippleColor={colors.errorContainer}>
              거절
            </Button>
            <Button onPress={() => {}}>승인</Button>
          </View>
        </View>
      </TouchableRipple>
    ),
    [],
  )

  return (
    <>
      <List.Subheader>
        참가신청{' '}
        <Text color={colors.outline} fontSize={13}>
          3
        </Text>
      </List.Subheader>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={applies}
        renderItem={renderApplyItem}
      />
    </>
  )
}

export default memo(ExpeditionApplyTab)
