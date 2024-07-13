import { Text, View } from '~/components/styled'
import { Searchbar } from 'react-native-paper'
import React from 'react'
import { useFormik } from 'formik'
import { UserSearchQuery } from '~/core/dto/user/user.query'
import { FlatList } from 'react-native'
import { users } from '~/screens/social/social-search/search-user-tab/consts.ts'
import UserListItem from '~/components/user/UserListItem.tsx'

export default function SearchUserTab() {
  const { values, setFieldValue } = useFormik<UserSearchQuery>({
    initialValues: {
      query: '',
    },
    onSubmit: () => {},
  })

  return (
    <View px={10} py={15}>
      <Searchbar
        placeholder='회원 검색'
        value={values.query}
        onChangeText={value => setFieldValue('query', value)}
      />

      <FlatList
        data={users}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <UserListItem user={item} />}
        contentContainerStyle={containerStyle}
      />
    </View>
  )
}

const containerStyle = { marginTop: 15 }
