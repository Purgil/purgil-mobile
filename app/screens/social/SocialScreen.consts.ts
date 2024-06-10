import { SceneMap } from 'react-native-tab-view'
import ActivityScene from '~/screens/social/components/ActivityScene/ActivityScene.tsx'
import CrewScene from '~/screens/social/components/CrewScene/CrewScene.tsx'
import ExpeditionScene from '~/screens/social/components/ExpeditionScene/ExpeditionScene.tsx'

const routes = [
  { key: 'activity', title: '활동' },
  { key: 'expedition', title: '원정대' },
  { key: 'crew', title: '크루' },
  // { key: 'follow', title: '팔로우' },
]

const renderScene = SceneMap({
  activity: ActivityScene,
  crew: CrewScene,
  expedition: ExpeditionScene,
})

export { routes, renderScene }
