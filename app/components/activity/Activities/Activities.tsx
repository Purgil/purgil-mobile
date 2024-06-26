import { Text, View } from '~/components/styled'
import { Icon } from 'react-native-paper'
import Activity from '~/components/activity/Activity/Activity.tsx'
import { Activity as ActivityT } from '~/core/dto/adventure.dto'
import { FlatList } from 'react-native'
import { activities } from '~/components/activity/Activities/Activities.consts.ts'
import { SimultaneousRefs } from '~/core/dto/shared/shared.dto'
import { memo } from 'react'

type Props = {} & Partial<SimultaneousRefs>

function Activities({ scrollRef, swiperRef }: Props) {
  /** render */
  const renderActivity = (activity: ActivityT) => (
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

export default memo(Activities)
