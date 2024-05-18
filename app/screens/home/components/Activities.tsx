import { ScrollView, Text } from '../../../components/styled'

type Activity = {}

type Props = {
  totalCount: number
  activities: Activity[]
}

function Activities({ totalCount, activities }: Props) {
  return (
    <ScrollView>
      <Text textAlign='center' variant='titleMedium' pb={10}>
        {totalCount} 결과
      </Text>
    </ScrollView>
  )
}

export default Activities
