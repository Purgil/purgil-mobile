import { Text, View } from '~/components/styled'
import { Icon } from 'react-native-paper'
import Activity from '~/components/activity/Activity/Activity.tsx'
import { Activity as ActivityT } from '~/core/data/adventure.data'
import { FlatList } from 'react-native'
import { activities } from '~/components/activity/Activities/Activities.consts.ts'

export default function Activities() {
  /** render */
  const renderActivity = (activity: ActivityT) => (
    <Activity key={activity.id} activity={activity} />
  )

  return (
    <View p={10}>
      <View flexDirection='row' alignItems='center' gap={3}>
        <Text my={10}>최신순</Text>
        <Icon size={18} source='sort' />
      </View>

      <FlatList
        scrollEnabled={false}
        data={activities}
        renderItem={({ item }) => renderActivity(item)}
      />
    </View>
  )
}