import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableRipple,
  View,
} from '~/components/styled'
import { Icon, useTheme } from 'react-native-paper'
import { useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { Pressable } from 'react-native'
import AdventureReviews from '~/screens/stacks/adventureDetail/components/AdventureReviews.tsx'
import { ActionSheet, Avatar, RatingStars } from '~/components/basic'
import { User } from '~/core/data/user.data'

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

type WriteReviewForm = {
  content: string
  rating: number
}
const initialWriteReviewValues = {
  content: '',
  rating: 0,
}

export default function ReviewScene() {
  /** state */
  const [actionSheet, setActionSheet] = useState({ writeReview: false })

  /** hook */
  const { colors } = useTheme()
  const {
    values: writeReviewValues,
    setFieldValue,
    submitForm: submitWriteReview,
  } = useFormik<WriteReviewForm>({
    initialValues: initialWriteReviewValues,
    onSubmit: () => {
      setActionSheet({ ...actionSheet, writeReview: false })
    },
  })

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
  const renderRatingBar = (rating: 1 | 2 | 3 | 4 | 5) => (
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

      <AdventureReviews adventureId={1} />

      {actionSheet.writeReview && (
        <ActionSheet
          visible={actionSheet.writeReview}
          onClose={() =>
            setActionSheet({ ...actionSheet, writeReview: false })
          }>
          <ActionSheet.Body>
            <View gap={15} px={10} py={15}>
              <View flexDirection='row' justifyContent='center'>
                {[1, 2, 3, 4, 5].map(rating => (
                  <Pressable
                    key={rating}
                    onPress={() => setFieldValue('rating', rating)}>
                    <Icon
                      source='star'
                      size={40}
                      color={
                        writeReviewValues.rating >= rating
                          ? colors.primary
                          : colors.surfaceVariant
                      }
                    />
                  </Pressable>
                ))}
              </View>
              <TextInput
                mode='outlined'
                multiline
                placeholder='이 루트에 대한 내 평가를 남겨보세요!'
                height={150}
                value={writeReviewValues.content}
                onChangeText={value => setFieldValue('content', value)}
              />
              <View flexDirection='row'>
                <Button
                  flex={1}
                  onPress={() =>
                    setActionSheet({ ...actionSheet, writeReview: false })
                  }>
                  취소
                </Button>
                <Button flex={1} mode='contained' onPress={submitWriteReview}>
                  등록
                </Button>
              </View>
            </View>
          </ActionSheet.Body>
        </ActionSheet>
      )}
    </ScrollView>
  )
}
