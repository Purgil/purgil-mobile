import { ScrollView, Text, TouchableRipple, View } from '~/components/styled'
import { Icon, useTheme } from 'react-native-paper'
import React, { useCallback, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { Avatar, RatingStars } from '~/components/basic'
import { User } from '~/core/data/user.data'
import AdventureReview from '~/components/adventure/AdventureReview/AdventureReview.tsx'
import WriteReviewActionSheet from '~/screens/adventureDetail/tabs/AdventureReview/components/WriteReviewActionSheet.tsx'
import { reviews } from '~/screens/adventureDetail/tabs/AdventureReview/AdventureReviewTab.consts.ts'

export const me: User = {
  id: 151,
  username: 'qwrtqw',
  nickname: '아난',
}

const ratingData = {
  rating: 4.1,
  count: 30,
  distribution: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 20,
  },
}

export default function AdventureReviewTab() {
  /** state */
  const [actionSheet, setActionSheet] = useState({ writeReview: false })

  /** hook */
  const { colors } = useTheme()

  /** memo */
  const mostDistributedRating = useMemo(() => {
    const entries = Object.entries(ratingData.distribution)

    let maxKey = entries[0][0]
    let maxValue = entries[0][1]

    // 배열을 순회하면서 최대 값을 찾음
    for (const [key, value] of entries) {
      if (value > maxValue) {
        maxValue = value
        maxKey = key
      }
    }

    return Number(maxKey)
  }, [])

  /** render */
  const renderRatingBar = useCallback(
    (rating: 1 | 2 | 3 | 4 | 5) => (
      <View gap={5} alignItems='center' key={rating}>
        <View
          borderRadius={3}
          height={120 * (ratingData.distribution[rating] / ratingData.count)}
          width={30}
          bg={
            rating === mostDistributedRating
              ? colors.primary
              : colors.surfaceVariant
          }
        />
        <Text textAlign='center'>
          <Icon size={15} source='star' color={colors.primary} />
          {rating}
        </Text>
      </View>
    ),
    [],
  )

  return (
    <ScrollView collapsable>
      <View flexDirection='row' height={150} justifyContent='space-evenly'>
        <View justifyContent='flex-end'>
          <RatingStars
            rating={ratingData.rating}
            size={20}
            ratingPosition='top'
            textVariant='titleLarge'
          />
          <Text variant='bodySmall' textAlign='center'>
            125개의 리뷰
          </Text>
        </View>

        <View
          alignItems='flex-end'
          justifyContent='center'
          flexDirection='row'
          gap={10}>
          {[1, 2, 3, 4, 5].map(value =>
            renderRatingBar(value as 1 | 2 | 3 | 4 | 5),
          )}
        </View>
      </View>

      {/* 리뷰 작성 버튼 */}
      <TouchableRipple
        mt={20}
        px={10}
        py={30}
        borderTopWidth={2}
        borderBottomWidth={2}
        borderColor={colors.elevation.level3}
        flexDirection='row'
        alignItems='flex-end'
        justifyContent='space-between'
        onPress={() => setActionSheet({ ...actionSheet, writeReview: true })}>
        <>
          <View>
            <RatingStars
              rating={5}
              color={colors.surfaceVariant}
              ratingPosition='hide'
            />
            <Text color={colors.surfaceVariant}>
              이 코스에 대해 리뷰를 남겨보세요!
            </Text>
          </View>
          <Avatar user={me} size={25} />
        </>
      </TouchableRipple>

      <FlatList
        scrollEnabled={false}
        data={reviews}
        renderItem={({ item }) => (
          <AdventureReview key={item.id} review={item} />
        )}
      />

      {actionSheet.writeReview && (
        <WriteReviewActionSheet
          onClose={() => setActionSheet({ writeReview: false })}
          onSubmit={() => {}}
        />
      )}
    </ScrollView>
  )
}
