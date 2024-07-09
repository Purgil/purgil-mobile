import { RouteListData } from '~/core/dto/activity/route.data'
import { Text, TouchableRipple, View } from '../styled'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { Icon, useTheme } from 'react-native-paper'
import { ScreenPropsMap } from '~/router/types.ts'
import { ImgArea } from '../shared'
import { Swiper } from '~/components/shared'
import { SimultaneousRefs } from '~/core/dto/shared/shared.data'

type Props = {
  route: RouteListData
} & Partial<SimultaneousRefs>

function RouteListItem({ route, swiperRef, scrollRef }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()
  const { colors } = useTheme()

  const handlePress = () => {
    navigation.navigate('RouteDetail', { id: route.id })
  }

  const itemRenderer = () => <ImgArea />

  return (
    <TouchableRipple onPress={handlePress} py={10}>
      <View>
        <Swiper
          swiperRef={swiperRef}
          scrollRef={scrollRef}
          data={[...new Array(3)]}
          renderItem={itemRenderer}
        />
        <View px={10} py={1}>
          <Text variant='titleMedium' mb={2}>
            {route.name}
          </Text>
          <Text variant='labelMedium' mb={1}>
            {route.address}
          </Text>
          <Text variant='labelSmall'>
            <Icon size={12} source='star' color={colors.primary} />
            {route.rating} · {route.distance}km · {route.difficulty}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  )
}

export default React.memo(RouteListItem)
