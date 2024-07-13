import { Avatar, ScrollView, Surface, Text, View } from '~/components/styled'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import { memo } from 'react'
import { myCrews } from '~/screens/social/tabs/Crew/consts.ts'
import MyCrewListItem from '~/screens/social/tabs/Crew/components/MyCrewListItem.tsx'
import { me } from '~/screens/routeDetail/tabs/RouteReview/RouteReviewTab.tsx'
import CrewListItem from '~/screens/social/tabs/Crew/components/CrewListItem.tsx'
import { FlatList } from 'react-native'

function CrewTab() {
  return (
    <ScrollView p={10}>
      <Surface elevation={3} borderRadius={10} pb={10}>
        <ListSubheader>
          내 크루 <Text>5</Text>
        </ListSubheader>
        <FlatList
          data={myCrews}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <MyCrewListItem crew={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Surface>

      <View mt={25} pb={20}>
        <View flexDirection='row' alignItems='center' gap={5} mb={2}>
          <Avatar user={me} nicknameDisplayType='hidden' />
          <Text>{me.nickname}님을 위한 추천 크루</Text>
        </View>
        <FlatList
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          scrollEnabled={false}
          data={myCrews}
          renderItem={({ item }) => <CrewListItem crew={item} />}
          contentContainerStyle={crewListContainerStyle}
          columnWrapperStyle={columnWrapperContainerStyle}
        />
      </View>
    </ScrollView>
  )
}

export default memo(CrewTab)

const crewListContainerStyle = {
  gap: 10,
}
const columnWrapperContainerStyle = {
  gap: 10,
}
