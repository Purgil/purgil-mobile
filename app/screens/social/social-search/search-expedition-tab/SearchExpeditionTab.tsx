import { View } from '~/components/styled'
import { Searchbar } from 'react-native-paper'
import React from 'react'
import { useFormik } from 'formik'
import { ExpeditionSearchQuery } from '~/core/dto/expedition/expedition.query'
import { FlatList } from 'react-native'
import { expeditions } from '~/screens/social/tabs/Expedition/ExpeditionTab.consts.ts'
import ExpeditionListItem from '~/components/expedition/ExpeditionListItem.tsx'

export default function SearchExpeditionTab() {
  const { values, setFieldValue } = useFormik<ExpeditionSearchQuery>({
    initialValues: {
      query: '',
    },
    onSubmit: () => {},
  })

  return (
    <View px={10} py={15}>
      <Searchbar
        placeholder='원정대 검색'
        value={values.query}
        onChangeText={value => setFieldValue('query', value)}
      />
      <FlatList
        data={expeditions}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <ExpeditionListItem expedition={item} />}
        contentContainerStyle={containerStyle}
      />
    </View>
  )
}

const containerStyle = { marginTop: 15, gap: 10 }
