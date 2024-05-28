import React from 'react'
import { AdventureReview as AdventureReviewT } from '~/core/data/adventure.data'
import { View } from '~/components/styled'
import { Icon } from 'react-native-paper'

type Props = {
  review: AdventureReviewT
}
function AdventureReview({ review }: Props) {
  return (
    <View>
      <Icon size={25} source='star' />
    </View>
  )
}

export default React.memo(AdventureReview)
