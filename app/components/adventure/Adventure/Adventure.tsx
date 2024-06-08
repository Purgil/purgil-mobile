import { Adventure as AdventureT } from '../../../core/data/adventure.data'
import { Text, TouchableRipple, View } from '../../styled'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { Icon, useTheme } from 'react-native-paper'
import { RootStackParamList } from '~/navigation/types.ts'
import { ImgArea } from '../../basic'
import { Swiper } from '~/components/basic'

type Props = {
  adventure: AdventureT
}

function Adventure({ adventure }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { colors } = useTheme()

  const handlePress = () => {
    navigation.navigate('AdventureDetail', { adventure })
  }

  const itemRenderer = () => <ImgArea />

  return (
    <TouchableRipple onPress={handlePress} flex={1} py={10}>
      <View flex={1}>
        <Swiper data={[...new Array(3)]} renderItem={itemRenderer} />
        <View px={10} py={1}>
          <Text variant='titleMedium' mb={2}>
            {adventure.name}
          </Text>
          <Text variant='labelMedium' mb={1}>
            {adventure.address}
          </Text>
          <Text variant='labelSmall'>
            <Icon size={12} source='star' color={colors.primary} />
            {adventure.rating} · {adventure.distance}km · {adventure.difficulty}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  )
}

export default React.memo(Adventure)
