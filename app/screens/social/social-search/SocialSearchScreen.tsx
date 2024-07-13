import { View } from '~/components/styled'
import { RootScreenProps } from '~/router/types.ts'
import { Appbar, useTheme } from 'react-native-paper'
import { TabView } from '~/components/shared'
import { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import SearchExpeditionTab from '~/screens/social/social-search/search-expedition-tab/SearchExpeditionTab.tsx'
import SearchCrewTab from '~/screens/social/social-search/search-crew-tab/SearchCrewTab.tsx'
import SearchUserTab from '~/screens/social/social-search/search-user-tab/SearchUserTab.tsx'

export function SocialSearchScreen({
  navigation,
}: RootScreenProps<'SocialSearch'>) {
  const { colors } = useTheme()

  const renderTabs = useMemo(
    () =>
      SceneMap({
        user: SearchUserTab,
        expedition: SearchExpeditionTab,
        crew: SearchCrewTab,
      }),
    [],
  )

  return (
    <View flex={1} backgroundColor={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='소셜 검색' />
      </Appbar.Header>

      <TabView
        tabs={[
          { key: 'user', title: '회원' },
          { key: 'expedition', title: '원정대' },
          { key: 'crew', title: '크루' },
        ]}
        renderScene={renderTabs}
      />
    </View>
  )
}
