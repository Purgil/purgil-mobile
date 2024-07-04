import React, { useState } from 'react'
import { RouteReviewListData } from '~/core/dto/activity/route.data'
import { IconButton, Text, View } from '~/components/styled'
import { useTheme } from 'react-native-paper'
import { Avatar, ListActionSheet, RatingStars } from '~/components/shared'

type Props = {
  review: RouteReviewListData
}
function RouteReviewListItem({ review }: Props) {
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
          <Avatar
            user={review.writer}
            underNickname='2개월 전'
            size={25}
            nicknameSize={12}
          />
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
        /*        <ActionSheet
          visible={reportActionSheetVisible}
          onClose={() => setReportActionSheetVisible(false)}>
          <ActionSheet.Body>
            <Button>부적절한 리뷰 신고 및 차단하기</Button>
          </ActionSheet.Body>
        </ActionSheet>*/
        <ListActionSheet
          visible={reportActionSheetVisible}
          onClose={() => setReportActionSheetVisible(false)}
          list={[
            {
              title: '부적절한 리뷰 신고 및 차단하기',
              onPress: () => {},
              mode: 'error',
            },
          ]}
        />
      )}
    </>
  )
}

export default React.memo(RouteReviewListItem)
