import { Appbar } from 'react-native-paper'
import { Button, Chip, Text, View } from '~/components/styled'
import React from 'react'
import { TabView } from '~/components/basic'
import { renderScene, routes } from '~/screens/social/SocialScreen.consts.ts'

export default function SocialScreen() {
  return (
    <View flex={1}>
      <Appbar.Header>
        <Appbar.Content title='소셜' />
        <Button compact>팔로워 266</Button>
        <Button compact>팔로잉 26</Button>
      </Appbar.Header>

      <TabView routes={routes} renderScene={renderScene} />
    </View>
  )
}
