import React from 'react'
import { FlatList } from 'react-native'
import { reviews } from '~/screens/stacks/adventureDetail/components/ReviewScene.consts.ts'
import { AdventureReview as AdventureReviewT } from '~/core/data/adventure.data'
import AdventureReview from '~/screens/stacks/adventureDetail/components/AdventureReview.tsx'

type Props = {
  adventureId: number
}
function AdventureReviews({ adventureId }: Props) {
  /** render */
  const renderReview = (review: AdventureReviewT) => (
    <AdventureReview key={review.id} review={review} />
  )

  return (
    <FlatList
      scrollEnabled={false}
      data={reviews}
      renderItem={({ item }) => renderReview(item)}
    />
  )
}

export default React.memo(AdventureReviews)
