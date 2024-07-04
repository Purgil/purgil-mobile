import { Text } from '~/components/styled'
import { ActionSheetProps } from '~/components/shared/ActionSheet/ActionSheet.tsx'
import React from 'react'
import { ActionSheet, Comment } from '~/components/shared'
import { FlatList } from 'react-native'
import { comments } from './CommentsActionSheet.consts.ts'
import CommentInput from '~/components/comment/CommentInput.tsx'

type Props = {
  activityId: number
} & ActionSheetProps

export default function CommentsActionSheet({ activityId, ...props }: Props) {
  /** functions */
  const handleSubmit = (commentText: string) => {}

  return (
    <ActionSheet {...props} snapPoints={[0.7, 1]} keyboardAvoiding>
      <ActionSheet.Header>
        <Text variant='titleLarge' px={20}>
          댓글
        </Text>
      </ActionSheet.Header>

      <ActionSheet.Body>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          renderItem={({ item }) => <Comment key={item.id} comment={item} />}
        />
      </ActionSheet.Body>

      <ActionSheet.Footer>
        <CommentInput onSubmit={handleSubmit} />
      </ActionSheet.Footer>
    </ActionSheet>
  )
}
