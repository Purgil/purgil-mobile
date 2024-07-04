import { Text, View } from '~/components/styled'
import { Icon } from 'react-native-paper'
import Activity from '~/components/activity/ActivityListItem.tsx'
import { ActivityListData } from '~/core/dto/activity/activity.data'
import { FlatList } from 'react-native'
import { SimultaneousRefs } from '~/core/dto/shared/shared.data'
import { memo } from 'react'
import { activities } from '~/components/activity/ActivityList.consts.ts'

type Props = {} & Partial<SimultaneousRefs>

function ActivityList({ scrollRef, swiperRef }: Props) {
  /** render */
  const renderActivity = (activity: ActivityListData) => (
    <Activity activity={activity} scrollRef={scrollRef} swiperRef={swiperRef} />
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
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => renderActivity(item)}
      />
    </View>
  )
}

export default memo(ActivityList)
