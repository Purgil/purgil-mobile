import { Text, View } from '../../../components/styled'
import React, { useEffect } from 'react'
import { RootStackScreenProps } from '../../../navigation/types.tsx'
import { ImgArea, Swiper } from '../../../components/basic'
import { Divider, Icon, useTheme } from 'react-native-paper'
import { MToHM } from '../../../utils/datetime.utils.ts'
import { courseDetail } from './CourseDetailStack.consts.ts'

function CourseDetailStack({
  navigation,
  route: {
    params: { course },
  },
}: RootStackScreenProps<'CourseDetail'>) {
  const { colors } = useTheme()

  useEffect(() => {
    navigation.setOptions({ headerTitle: course.name })
  }, [navigation, course])

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
          {course.difficulty} ·{' '}
          <Icon size={16} source='star' color={colors.primary} />
          {`${course.rating}(455)`}
        </Text>
        <Text variant='bodyMedium' mb={3}>
          {course.address}
        </Text>

        <Divider />

        <View flexDirection='row' justifyContent='space-around' mt={4}>
          <View>
            <Text variant='titleSmall' textAlign='center'>
              거리
            </Text>
            <Text variant='titleMedium' textAlign='center'>
              {courseDetail.distance}km
            </Text>
          </View>
          <View>
            <Text variant='titleSmall' textAlign='center'>
              누적 오르막
            </Text>
            <Text variant='titleMedium' textAlign='center'>
              {courseDetail.elevationGain}m
            </Text>
          </View>
          {courseDetail.avgCompleteTime && (
            <View>
              <Text variant='titleSmall' textAlign='center'>
                평균 소요시간
              </Text>
              <Text variant='titleMedium' textAlign='center'>
                {MToHM(courseDetail.avgCompleteTime)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default CourseDetailStack
