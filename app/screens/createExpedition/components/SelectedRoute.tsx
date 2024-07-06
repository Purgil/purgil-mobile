import React, { memo, useCallback } from 'react'
import { RouteSearchResultData } from '~/core/dto/activity/route.data'
import { IconButton, TouchableRipple } from '~/components/styled'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import { Style } from 'react-native-paper/lib/typescript/components/List/utils'

type Props = {
  route: RouteSearchResultData
}

function SelectedRoute({ route }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  const removeSelectedRoute = useCallback(() => {
    navigation.setParams({ route: undefined })
  }, [])

  const navigateToRouteDetail = useCallback((id: number) => {
    navigation.navigate('RouteDetail', { id })
  }, [])

  const renderIcon = useCallback(
    (icon: string | undefined, style: Style) =>
      icon ? <List.Icon icon={icon} style={style} /> : undefined,
    [],
  )

  const renderRightButton = useCallback(
    () => <IconButton m={0} icon='close' onPress={removeSelectedRoute} />,
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
        right={renderRightButton}
      />
    </TouchableRipple>
  )
}

export default memo(SelectedRoute)
