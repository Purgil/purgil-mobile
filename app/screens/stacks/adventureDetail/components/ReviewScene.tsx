import {
  ActionSheet,
  Button,
  Text,
  TextInput,
  TouchableRipple,
  View,
} from '~/components/styled'
import { Avatar, Icon, useTheme } from 'react-native-paper'
import { useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { Pressable } from 'react-native'
import AdventureReviews from '~/screens/stacks/adventureDetail/components/AdventureReviews.tsx'

const scoreData = {
  score: 4.1,
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
  score: number
}
const initialWriteReviewValues = {
  content: '',
  score: 0,
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
  const mostDistributedScore = useMemo(() => {
    const entries = Object.entries(scoreData.distribution)

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
  const renderStars = () => {
    const flooredScore = Math.floor(scoreData.score)
    const stars = [...new Array(flooredScore)].map((_, index) => (
      <Icon key={index} size={20} source='star' color={colors.primary} />
    ))
    if (flooredScore !== scoreData.score)
      stars.push(<Icon size={20} source='star-half' color={colors.primary} />)
    return stars
  }
  const renderScoreBar = (score: 1 | 2 | 3 | 4 | 5) => (
    <View gap={5} alignItems='center'>
      <View
        borderRadius={3}
        height={120 * (scoreData.distribution[score] / scoreData.count)}
        width={30}
        bg={
          score === mostDistributedScore
            ? colors.primary
            : colors.surfaceVariant
        }
      />
      <Text textAlign='center'>
        <Icon size={15} source='star' color={colors.primary} />
        {score}
      </Text>
    </View>
  )

  return (
    <>
      <View flexDirection='row' height={150} justifyContent='space-evenly'>
        <View justifyContent='flex-end'>
          <Text variant='titleLarge' textAlign='center'>
            {scoreData.score}
          </Text>
          <View flexDirection='row' alignItems='center' justifyContent='center'>
            {renderStars()}
          </View>
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
            renderScoreBar(value as 1 | 2 | 3 | 4 | 5),
          )}
        </View>
      </View>

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
            <View flexDirection='row'>
              {[...new Array(5)].map(() => (
                <Icon source='star' size={16} color={colors.surfaceVariant} />
              ))}
            </View>
            <Text color={colors.surfaceVariant}>
              이 코스에 대해 리뷰를 남겨보세요!
            </Text>
          </View>
          <View flexDirection='row' alignItems='center' gap={3}>
            <Text>아난</Text>
            <Avatar.Text
              label='XD'
              size={30}
              style={{ backgroundColor: colors.tertiary }}
            />
          </View>
        </>
      </TouchableRipple>

      <AdventureReviews adventureId={1} />

      {actionSheet.writeReview && (
        <ActionSheet
          visible={actionSheet.writeReview}
          onClose={() =>
            setActionSheet({ ...actionSheet, writeReview: false })
          }>
          <View gap={15} px={10} py={15}>
            <View flexDirection='row' justifyContent='center'>
              {[1, 2, 3, 4, 5].map(score => (
                <Pressable
                  key={score}
                  onPress={() => setFieldValue('score', score)}>
                  <Icon
                    source='star'
                    size={40}
                    color={
                      writeReviewValues.score >= score
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
        </ActionSheet>
      )}
    </>
  )
}
