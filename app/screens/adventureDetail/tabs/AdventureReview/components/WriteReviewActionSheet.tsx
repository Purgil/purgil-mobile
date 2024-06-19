import React, { memo, useCallback, useMemo } from 'react'
import { ActionSheet } from '~/components/shared'
import { Button, IconButton, TextInput, View } from '~/components/styled'
import { ActionSheetProps } from '~/components/shared/ActionSheet/ActionSheet.tsx'
import { useTheme } from 'react-native-paper'
import { useFormik } from 'formik'

type WriteReviewForm = {
  content: string
  rating: number
}
const initialWriteReviewValues = {
  content: '',
  rating: 0,
}

type Props = {
  onSubmit: () => void
  onClose: () => void
} & ActionSheetProps

function WriteReviewActionSheet({ visible, onSubmit, onClose }: Props) {
  /** hook */
  const { colors } = useTheme()
  const {
    values: writeReviewValues,
    setFieldValue,
    submitForm: submitWriteReview,
  } = useFormik<WriteReviewForm>({
    initialValues: initialWriteReviewValues,
    onSubmit: () => {
      onClose()
    },
  })

  /** function */
  const getIconColor = useCallback(
    (rating: number) =>
      writeReviewValues.rating >= rating
        ? colors.primary
        : colors.surfaceVariant,
    [writeReviewValues.rating],
  )

  /** memo */
  const rippleColor = useMemo(() => colors.primary + '11', [])

  return (
    <ActionSheet visible={visible} onClose={onClose}>
      <ActionSheet.Body>
        <View gap={15} px={10} py={15}>
          <View flexDirection='row' justifyContent='center'>
            {[1, 2, 3, 4, 5].map(rating => (
              <IconButton
                icon='star'
                size={40}
                margin={0}
                key={rating}
                iconColor={getIconColor(rating)}
                rippleColor={rippleColor}
                onPress={() => setFieldValue('rating', rating)}
              />
            ))}
          </View>
          <TextInput
            mode='outlined'
            multiline
            placeholder='이 루트에 대한 내 평가를 남겨보세요!'
            height={150}
            onChangeText={value => setFieldValue('content', value)}
          />
          <View flexDirection='row'>
            <Button flex={1} onPress={onClose}>
              취소
            </Button>
            <Button flex={1} mode='contained' onPress={submitWriteReview}>
              등록
            </Button>
          </View>
        </View>
      </ActionSheet.Body>
    </ActionSheet>
  )
}

export default memo(WriteReviewActionSheet)
