import {
  Avatar,
  Button,
  ScrollView,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import React, { memo, useCallback } from 'react'
import { List, useTheme } from 'react-native-paper'
import { formatDatetime } from '~/utils/datetime.utils.ts'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import { expedition } from '~/screens/expeditionDetail/consts.ts'
import { FlatList } from 'react-native'
import { UserData } from '~/core/dto/user/user.data'

type Props = {
  id: number
}

function ExpeditionInfoTab({ id }: Props) {
  const { colors } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  const navigateToRouteDetail = useCallback((routeId: number) => {
    navigation.navigate('RouteDetail', { id: routeId })
  }, [])

  const renderMemberItem = useCallback(
    (member: UserData) => (
      <TouchableRipple onPress={() => {}} px={20} py={15}>
        <Avatar user={member} nicknameDisplayType='right' />
      </TouchableRipple>
    ),
    [],
  )

  return (
    <>
      <ScrollView>
        <View py={20}>
          <List.Subheader>루트</List.Subheader>
          <TouchableRipple
            mb={20}
            onPress={() => navigateToRouteDetail(expedition.route.id)}>
            <List.Item
              title={expedition.route.name}
              description={expedition.route.address}
              left={({ style }) => <List.Icon icon='hiking' style={style} />}
            />
          </TouchableRipple>

          <List.Subheader>소개</List.Subheader>
          <Text px={20} mb={35}>
            {expedition.description}
          </Text>

          <List.Subheader>나이 제한</List.Subheader>
          <Text
            mb={35}
            px={20}>{`${expedition.minAge}살 ~ ${expedition.maxAge}살`}</Text>

          <List.Subheader>출발 일시</List.Subheader>
          <Text px={20} mb={35}>
            {formatDatetime(expedition.departureDatetime)}
          </Text>

          <List.Subheader>모집 마감 일시</List.Subheader>
          <Text px={20} mb={35}>
            {formatDatetime(expedition.applyDeadlineDatetime)}
          </Text>

          <List.Subheader>리더</List.Subheader>
          <TouchableRipple onPress={() => {}} px={20} py={15} mb={15}>
            <Avatar user={expedition.leader} nicknameDisplayType='right' />
          </TouchableRipple>

          <List.Subheader>
            멤버{' '}
            <Text color={colors.outline} fontSize={13}>
              3
            </Text>
          </List.Subheader>
          <FlatList
            scrollEnabled={false}
            data={expedition.members}
            renderItem={({ item }) => renderMemberItem(item)}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>

      <View p={12}>
        {/* 원정대 리더만 노출 */}
        <Button mode='contained-tonal' onPress={() => {}}>
          정보 수정하기
        </Button>
      </View>
    </>
  )
}

export default memo(ExpeditionInfoTab)
