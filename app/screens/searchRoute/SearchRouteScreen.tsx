import { Button, Chip, Icon, TouchableRipple, View } from '~/components/styled'
import { List, Searchbar, useTheme } from 'react-native-paper'
import { Keyboard } from 'react-native'
import { RootScreenProps } from '~/router/types.ts'
import { AdventureListReqDto } from '~/core/dto/adventure/adventure.req-dto'
import { useFormik } from 'formik'
import React, { useCallback, useState } from 'react'
import { Style } from 'react-native-paper/lib/typescript/components/List/utils'

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
        <TouchableRipple onPress={() => {}}>
          <List.Item
            title='설악산 메인 루트'
            description='서울 송파구'
            left={({ style }) => renderIcon('navigation-variant', style)}
            right={({ style }) => (
              <View
                style={style}
                bg={colors.primary}
                px={3}
                py={1}
                borderRadius={100}>
                <Icon size={20} source='bike' color={colors.onPrimary} />
              </View>
            )}
          />
        </TouchableRipple>
      </List.Section>
    </View>
  )
}
