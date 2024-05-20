import { Text, View } from '../../../components/styled'
import React, { useEffect } from 'react'
import { RootStackScreenProps } from '../../../navigation/types.ts'
import { ImgArea, Swiper } from '../../../components/basic'
import { Divider, Icon, useTheme } from 'react-native-paper'
import { MToHM } from '../../../utils/datetime.utils.ts'
import { adventureDetail } from './AdventureDetailStack.consts.ts'

function AdventureDetailStack({
  navigation,
  route: {
    params: { adventure },
  },
}: RootStackScreenProps<'AdventureDetail'>) {
  const { colors } = useTheme()

  useEffect(() => {
    navigation.setOptions({ headerTitle: adventure.name })
  }, [navigation, adventure])

  return (
    <View flex={1}>
      <View height={250}>
        <Swiper loop={false}>
          <ImgArea />
          <ImgArea />
          <ImgArea />
        </Swiper>
      </View>

      <View px={10} py={20}>
        <Text variant='bodyMedium' mb={1}>
          {adventure.difficulty} ·{' '}
          <Icon size={16} source='star' color={colors.primary} />
          {`${adventure.rating}(455)`}
        </Text>
        <Text variant='bodyMedium' mb={3}>
          {adventure.address}
        </Text>

        <Divider />

        <View flexDirection='row' justifyContent='space-around' mt={4}>
          <View>
            <Text variant='titleSmall' textAlign='center'>
              거리
            </Text>
            <Text variant='titleMedium' textAlign='center'>
              {adventureDetail.distance}km
            </Text>
          </View>
          <View>
            <Text variant='titleSmall' textAlign='center'>
              누적 오르막
            </Text>
            <Text variant='titleMedium' textAlign='center'>
              {adventureDetail.elevationGain}m
            </Text>
          </View>
          {adventureDetail.avgCompleteTime && (
            <View>
              <Text variant='titleSmall' textAlign='center'>
                평균 소요시간
              </Text>
              <Text variant='titleMedium' textAlign='center'>
                {MToHM(adventureDetail.avgCompleteTime)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default AdventureDetailStack
