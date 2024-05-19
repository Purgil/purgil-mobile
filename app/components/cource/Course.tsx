import { Course as CourseT } from '../../core/data/course.data'
import { Text, TouchableRipple, View } from '../styled'
import ImgArea from '../basic/ImgArea.tsx'
import React from 'react'
import { Swiper } from '../basic'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { Icon, useTheme } from 'react-native-paper'
import { RootStackParamList } from '../../navigation/types.tsx'

type Props = {
  course: CourseT
}

function Course({ course }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { colors } = useTheme()

  const handlePress = () => {
    navigation.navigate('CourseDetail', { course })
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
            {course.name}
          </Text>
          <Text variant='labelMedium' mb={1}>
            {course.address}
          </Text>
          <Text variant='labelSmall'>
            <Icon size={12} source='star' color={colors.primary} />
            {course.rating} · {course.distance}km · {course.difficulty}
          </Text>
        </>
      </TouchableRipple>
    </View>
  )
}

export default React.memo(Course)
