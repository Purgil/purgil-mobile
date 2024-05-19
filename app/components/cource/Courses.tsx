import { Text, View } from '../styled'
import { Course as CourseT } from '../../core/data/course.data.d'
import Course from './Course.tsx'
import React from 'react'

type Props = {
  totalCount: number
  courses: CourseT[]
}

function Courses({ totalCount, courses }: Props) {
  return (
    <View px={12}>
      <Text textAlign='center' variant='titleMedium' pb={10}>
        {totalCount} 결과
      </Text>
      <View gap={30}>
        {courses.map(activity => (
          <Course key={activity.id} course={activity} />
        ))}
      </View>
    </View>
  )
}

export default React.memo(Courses)
