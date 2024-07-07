import { View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/router/types.ts'
import { TabView } from '~/components/shared'
import { SceneMap } from 'react-native-tab-view'
import ExpeditionInfoTab from '~/screens/expeditionDetail/tabs/ExpeditionInfoTab.tsx'
import ExpeditionNoticeTab from '~/screens/expeditionDetail/tabs/ExpeditionNoticeTab.tsx'
import ExpeditionImageTab from '~/screens/expeditionDetail/tabs/ExpeditionImageTab.tsx'
import { useCallback, useMemo } from 'react'
import { expedition } from '~/screens/expeditionDetail/consts.ts'
import ExpeditionParticipantTab from '~/screens/expeditionDetail/tabs/ExpeditionParticipantTab.tsx'

const tabs = [
  {
    key: 'info',
    title: '정보',
  },
  {
    key: 'participant',
    title: '참가인원',
  },
  {
    key: 'notice',
    title: '공지',
  },
  {
    key: 'image',
    title: '사진',
  },
]

export default function ExpeditionDetailScreen({
  navigation,
  route: {
    params: { id },
  },
}: RootScreenProps<'ExpeditionDetail'>) {
  /** hook */
  const { colors } = useTheme()

  /** memo */
  const renderTabs = useMemo(
    () =>
      SceneMap({
        info: () => renderInfoTab(),
        participant: () => renderParticipantTab(),
        notice: () => renderNoticeTab(),
        image: () => renderImageTab(),
      }),
    [],
  )

  /** render */
  const renderInfoTab = useCallback(
    () => <ExpeditionInfoTab id={expedition.id} />,
    [],
  )
  const renderParticipantTab = useCallback(
    () => <ExpeditionParticipantTab id={expedition.id} />,
    [],
  )
  const renderNoticeTab = useCallback(
    () => <ExpeditionNoticeTab id={expedition.id} />,
    [],
  )
  const renderImageTab = useCallback(
    () => <ExpeditionImageTab id={expedition.id} />,
    [],
  )

  return (
    <View bg={colors.background} flex={1}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={expedition.title} />
        <Appbar.Action icon='chat' />
      </Appbar.Header>

      <TabView tabs={tabs} renderScene={renderTabs} />
    </View>
  )
}
