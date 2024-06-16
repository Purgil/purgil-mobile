import { SceneMap } from 'react-native-tab-view'
import SocialActivityTab from '~/screens/social/tabs/SocialActivity/SocialActivityTab.tsx'
import CrewTab from '~/screens/social/tabs/Crew/CrewTab.tsx'
import ExpeditionTab from '~/screens/social/tabs/Expedition/ExpeditionTab.tsx'

const routes = [
  { key: 'activity', title: '활동' },
  { key: 'expedition', title: '원정대' },
  { key: 'crew', title: '크루' },
  // { key: 'follow', title: '팔로우' },
]

const renderTabs = SceneMap({
  activity: SocialActivityTab,
  crew: CrewTab,
  expedition: ExpeditionTab,
})

export { routes, renderTabs }
