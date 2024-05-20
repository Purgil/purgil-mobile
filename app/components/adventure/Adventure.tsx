import { Adventure as AdventureT } from '../../core/data/adventure.data'
import { Text, TouchableRipple, View } from '../styled'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { Icon, useTheme } from 'react-native-paper'
import { RootStackParamList } from '../../navigation/types.ts'
import Carousel from '../basic/Carousel.tsx'
import { ImgArea } from '../basic'
import { Dimensions } from 'react-native'

type Props = {
  adventure: AdventureT
}

function Adventure({ adventure }: Props) {
  const width = Dimensions.get('screen').width
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { colors } = useTheme()

  const handlePress = () => {
    navigation.navigate('AdventureDetail', { adventure })
  }

  const itemRenderer = () => <ImgArea />

  return (
    <View>
      <Carousel
        data={[...new Array(3)]}
        renderItem={itemRenderer}
        width={width}
        height={250}
      />
      <TouchableRipple onPress={handlePress} p={10}>
        <>
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
        </>
      </TouchableRipple>
    </View>
  )
}

export default React.memo(Adventure)
