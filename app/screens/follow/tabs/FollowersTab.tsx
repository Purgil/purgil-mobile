import React, { memo } from 'react'
import { users } from '~/screens/social/social-search/search-user-tab/consts.ts'
import UserListItem from '~/components/user/UserListItem.tsx'
import { FlatList } from 'react-native'

function FollowersTab() {
  return (
    <FlatList
      data={users}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  )
}

export default memo(FollowersTab)
