import { Appbar } from 'react-native-paper'
import { Button, View } from '~/components/styled'
import React from 'react'
import { TabView } from '~/components/basic'
import { renderTabs, routes } from '~/screens/social/SocialScreen.consts.ts'

export default function SocialScreen() {
  return (
    <View flex={1}>
      <Appbar.Header>
        <Appbar.Content title='소셜' />
        <Button compact>팔로워 266</Button>
        <Button compact>팔로잉 26</Button>
      </Appbar.Header>

      <TabView routes={routes} renderScene={renderTabs} />
    </View>
  )
}
