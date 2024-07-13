import { Appbar } from 'react-native-paper'
import { IconButton, View } from '~/components/styled'
import React, { useMemo } from 'react'
import { TabView } from '~/components/shared'
import { routes } from '~/screens/social/SocialScreen.consts.ts'
import { RootScreenProps } from '~/router/types.ts'
import { SceneMap } from 'react-native-tab-view'
import SocialActivityTab from '~/screens/social/tabs/SocialActivity/SocialActivityTab.tsx'
import CrewTab from '~/screens/social/tabs/Crew/CrewTab.tsx'
import ExpeditionTab from '~/screens/social/tabs/Expedition/ExpeditionTab.tsx'
import { ExpeditionListQuery } from '~/core/dto/expedition/expedition.query'

const renderExpeditionTab = (filter: ExpeditionListQuery) => (
  <ExpeditionTab filter={filter} />
)

export default function SocialScreen({
  navigation,
  route: {
    params: { expeditionFilter },
  },
}: RootScreenProps<'Social'>) {
  const renderTabs = useMemo(
    () =>
      SceneMap({
        activity: SocialActivityTab,
        crew: CrewTab,
        expedition: () => renderExpeditionTab(expeditionFilter),
      }),
    [expeditionFilter],
  )

  return (
    <View flex={1}>
      <Appbar.Header>
        <Appbar.Content title='소셜' />
        <IconButton
          icon='magnify'
          size={20}
          onPress={() => navigation.navigate('SocialSearch')}
        />
        <IconButton
          icon='account-multiple'
          size={20}
          onPress={() => navigation.navigate('Follow')}
        />
      </Appbar.Header>

      <TabView tabs={routes} renderScene={renderTabs} />
    </View>
  )
}
