import { View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/router/types.ts'
import { TabView } from '~/components/shared'
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import FollowingsTab from '~/screens/follow/tabs/FollowingsTab.tsx'
import FollowersTab from '~/screens/follow/tabs/FollowersTab.tsx'

const routes = [
  { key: 'followings', title: '팔로잉' },
  { key: 'followers', title: '팔로워' },
]

const sceneMap = SceneMap({
  followings: FollowingsTab,
  followers: FollowersTab,
})

export default function FollowScreen({
  navigation,
}: RootScreenProps<'Follow'>) {
  const { colors } = useTheme()

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='팔로우' />
      </Appbar.Header>

      <TabView routes={routes} renderScene={sceneMap} />
    </View>
  )
}
