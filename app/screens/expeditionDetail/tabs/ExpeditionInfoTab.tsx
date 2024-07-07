import {
  Avatar,
  Button,
  ScrollView,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import React, { memo, useCallback } from 'react'
import { List } from 'react-native-paper'
import { formatDatetime } from '~/utils/datetime.utils.ts'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import { expedition } from '~/screens/expeditionDetail/consts.ts'

type Props = {
  id: number
}

function ExpeditionInfoTab({ id }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  const navigateToRouteDetail = useCallback((routeId: number) => {
    navigation.navigate('RouteDetail', { id: routeId })
  }, [])

  return (
    <>
      <ScrollView>
        <View p={15} gap={25}>
          <View>
            <Text fontSize={20} fontWeight='bold'>
              루트
            </Text>
            <TouchableRipple
              onPress={() => navigateToRouteDetail(expedition.route.id)}>
              <List.Item
                title={expedition.route.name}
                description={expedition.route.address}
                left={({ style }) => <List.Icon icon='hiking' style={style} />}
              />
            </TouchableRipple>
          </View>

          <View>
            <Text fontSize={20} fontWeight='bold' mb={12}>
              소개
            </Text>
            <Text>{expedition.description}</Text>
          </View>

          <View>
            <Text fontSize={20} fontWeight='bold' mb={12}>
              나이 제한
            </Text>
            <Text>{`${expedition.minAge}살 ~ ${expedition.maxAge}살`}</Text>
          </View>

          <View>
            <Text fontSize={20} fontWeight='bold' mb={12}>
              출발 일시
            </Text>
            <Text>{formatDatetime(expedition.departureDatetime)}</Text>
          </View>

          <View>
            <Text fontSize={20} fontWeight='bold' mb={12}>
              모집 마감 일시
            </Text>
            <Text>{formatDatetime(expedition.applyDeadlineDatetime)}</Text>
          </View>

          <View>
            <Text fontSize={20} fontWeight='bold' mb={12}>
              원정대 리더
            </Text>
            <View flexDirection='row'>
              <Avatar user={expedition.leader} nicknameDisplayType='right' />
            </View>
          </View>
        </View>
      </ScrollView>

      <View p={12}>
        {/* 원정대 리더만 노출 */}
        <Button onPress={() => {}}>정보 수정하기</Button>
      </View>
    </>
  )
}

export default memo(ExpeditionInfoTab)
