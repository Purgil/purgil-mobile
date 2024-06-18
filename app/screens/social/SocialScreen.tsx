import { Appbar } from 'react-native-paper'
import { Button, IconButton, View } from '~/components/styled'
import React from 'react'
import { TabView } from '~/components/basic'
import { renderTabs, routes } from '~/screens/social/SocialScreen.consts.ts'
import { RootScreenProps } from '~/navigation/types.ts'

export default function SocialScreen({
  navigation,
}: RootScreenProps<'Social'>) {
  return (
    <View flex={1}>
      <Appbar.Header>
        <Appbar.Content title='소셜' />
        <IconButton
          icon='account-multiple'
          size={20}
          onPress={() => navigation.navigate('Follow')}
        />
      </Appbar.Header>

      <TabView routes={routes} renderScene={renderTabs} />
    </View>
  )
}
