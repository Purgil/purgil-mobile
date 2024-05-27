import { Text, View } from '../styled'
import { Adventure as AdventureT } from '~/core/data/adventure.data'
import Adventure from './Adventure.tsx'
import React from 'react'

type Props = {
  totalCount: number
  adventures: AdventureT[]
}

function Adventures({ totalCount, adventures }: Props) {
  return (
    <View>
      <Text textAlign='center' variant='titleMedium' pb={10}>
        {totalCount} 결과
      </Text>
      <View gap={30}>
        {adventures.map(activity => (
          <Adventure key={activity.id} adventure={activity} />
        ))}
      </View>
    </View>
  )
}

export default React.memo(Adventures)
