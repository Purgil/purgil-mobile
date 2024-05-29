import { Text, View } from '~/components/styled'
import { Icon } from 'react-native-paper'
import Activity from '~/screens/stacks/adventureDetail/components/Activity.tsx'
import { Activity as ActivityT } from '~/core/data/adventure.data'
import { FlatList } from 'react-native'
import { activities } from '~/screens/stacks/adventureDetail/components/ActivityScene.consts.ts'

export default function ActivityScene() {
  /** render */
  const renderActivity = (activity: ActivityT) => (
    <Activity key={activity.id} activity={activity} />
  )

  return (
    <View p={10}>
      <Text my={10}>
        최신순 <Icon size={16} source='sort' />
      </Text>

      <FlatList
        scrollEnabled={false}
        data={activities}
        renderItem={({ item }) => renderActivity(item)}
      />
    </View>
  )
}
