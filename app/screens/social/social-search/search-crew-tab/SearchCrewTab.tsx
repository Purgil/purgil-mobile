import { View } from '~/components/styled'
import { useFormik } from 'formik'
import { Searchbar } from 'react-native-paper'
import React from 'react'
import { CrewSearchQuery } from '~/core/dto/crew/crew.query'
import { FlatList } from 'react-native'
import { myCrews } from '~/screens/social/tabs/Crew/consts.ts'
import CrewListItem from '~/screens/social/tabs/Crew/components/CrewListItem.tsx'

export default function SearchCrewTab() {
  const { values, setFieldValue } = useFormik<CrewSearchQuery>({
    initialValues: {
      query: '',
    },
    onSubmit: () => {},
  })

  return (
    <View px={10} py={15}>
      <Searchbar
        placeholder='크루 검색'
        value={values.query}
        onChangeText={value => setFieldValue('query', value)}
      />

      <FlatList
        numColumns={2}
        keyExtractor={item => `${item.id}`}
        data={myCrews}
        renderItem={({ item }) => <CrewListItem crew={item} />}
        contentContainerStyle={containerStyle}
        columnWrapperStyle={gap10}
      />
    </View>
  )
}

const containerStyle = { marginTop: 15, gap: 10 }
const gap10 = { gap: 10 }
