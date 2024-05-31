import React, { useState } from 'react'
import { AdventureReview as AdventureReviewT } from '~/core/data/adventure.data'
import {
  ActionSheet,
  Button,
  IconButton,
  Text,
  View,
} from '~/components/styled'
import { Icon, useTheme } from 'react-native-paper'
import { Avatar, RatingStars } from '~/components/basic'

type Props = {
  review: AdventureReviewT
}
function AdventureReview({ review }: Props) {
  /** state */
  const [reportActionSheetVisible, setReportActionSheetVisible] =
    useState(false)

  /** hook */
  const { colors } = useTheme()

  return (
    <>
      <View
        borderBottomWidth={1}
        borderColor={colors.elevation.level3}
        justifyContent='space-between'
        p={10}>
        <View flexDirection='row' justifyContent='space-between'>
          <RatingStars rating={review.rating} />
          <Avatar user={review.writer} underNickname='2개월 전' />
        </View>
        <View
          flexDirection='row'
          justifyContent='space-between'
          justifySelf='flex-end'>
          <Text width='90%'>{review.content}</Text>
          <View justifyContent='flex-end'>
            <IconButton
              icon='dots-vertical'
              size={16}
              m={0}
              onPress={() => setReportActionSheetVisible(true)}
            />
          </View>
        </View>
      </View>

      {reportActionSheetVisible && (
        <ActionSheet
          visible={reportActionSheetVisible}
          onClose={() => setReportActionSheetVisible(false)}>
          <View py={20}>
            <Button>부적절한 리뷰 신고 및 차단하기</Button>
          </View>
        </ActionSheet>
      )}
    </>
  )
}

export default React.memo(AdventureReview)
