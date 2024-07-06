import { Button, Icon, TouchableRipple, View } from '~/components/styled'
import { List, Searchbar, useTheme } from 'react-native-paper'
import { FlatList, Keyboard } from 'react-native'
import { RootScreenProps } from '~/router/types.ts'
import React, { useCallback, useState } from 'react'
import { Style } from 'react-native-paper/lib/typescript/components/List/utils'
import { routeSearchResults } from '~/screens/searchRoute/consts.ts'
import { RouteSearchResultData } from '~/core/dto/activity/route.data'
import RouteSearchResultItem from '~/screens/searchRoute/components/RouteSearchResultItem.tsx'

export default function SearchRouteScreen({
  navigation,
}: RootScreenProps<'SearchRoute'>) {
  const [searchText, setSearchText] = useState('')

  const { colors } = useTheme()

  const renderIcon = useCallback(
    (icon: string | undefined, style: Style) =>
      icon ? <List.Icon icon={icon} style={style} /> : undefined,
    [],
  )

  const renderRouteSearchResultItem = useCallback(
    (route: RouteSearchResultData) => <RouteSearchResultItem route={route} />,
    [],
  )

  return (
    <View py={10} px={2} bg={colors.background} flex={1}>
      <Searchbar
        placeholder='루트 검색'
        onChangeText={value => setSearchText(value)}
        value={searchText}
        onIconPress={() => {
          Keyboard.dismiss()
          navigation.goBack()
        }}
        onClearIconPress={() => {
          setSearchText('')
        }}
        icon='arrow-left'
      />
      {/* 내 주변 루트 */}
      <TouchableRipple onPress={() => {}} mt={10}>
        <List.Item
          title='내 주변 루트 검색'
          left={({ style }) => renderIcon('map-marker-radius', style)}
        />
      </TouchableRipple>
      {/* 최근 본 루트 */}
      <List.Section title='최근 본 루트'>
        <FlatList
          data={routeSearchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => renderRouteSearchResultItem(item)}
        />
      </List.Section>
    </View>
  )
}
