import React, { memo, useCallback } from 'react'
import { RouteSearchResultData } from '~/core/dto/activity/route.data'
import { Button, TouchableRipple } from '~/components/styled'
import { List } from 'react-native-paper'
import { Style } from 'react-native-paper/lib/typescript/components/List/utils'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'

type Props = {
  route: RouteSearchResultData
}

function RouteSearchResultItem({ route }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  const navigateToRouteDetail = useCallback((id: number) => {
    navigation.navigate('RouteDetail', { id, toCreateExpedition: true })
  }, [])

  const navigateToExpeditionCreate = useCallback(
    (routeToCreateExpedition: RouteSearchResultData) => {
      navigation.navigate('CreateExpedition', {
        route: routeToCreateExpedition,
      })
    },
    [],
  )

  const renderIcon = useCallback(
    (icon: string | undefined, style: Style) =>
      icon ? <List.Icon icon={icon} style={style} /> : undefined,
    [],
  )

  const renderRightButton = useCallback(
    (routeToCreateExpedition: RouteSearchResultData) => (
      <Button
        onPress={() => navigateToExpeditionCreate(routeToCreateExpedition)}>
        선택
      </Button>
    ),
    [],
  )

  return (
    <TouchableRipple
      onPress={() => navigateToRouteDetail(route.id)}
      key={route.id}>
      <List.Item
        title={route.name}
        description={route.address}
        left={({ style }) => renderIcon('hiking', style)}
        right={() => renderRightButton(route)}
      />
    </TouchableRipple>
  )
}

export default memo(RouteSearchResultItem)
