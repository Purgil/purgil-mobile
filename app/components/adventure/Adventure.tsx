import { Adventure as AdventureT } from '../../core/data/adventure.data'
import { Text, TouchableRipple, View } from '../styled'
import ImgArea from '../basic/ImgArea.tsx'
import React from 'react'
import { Swiper } from '../basic'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { Icon, useTheme } from 'react-native-paper'
import { RootStackParamList } from '../../navigation/types.ts'

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

  return (
    <View>
      <Swiper showsButtons height={250} loop={false}>
        <ImgArea />
        <ImgArea />
        <ImgArea />
      </Swiper>
      <TouchableRipple onPress={handlePress} py={10}>
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
