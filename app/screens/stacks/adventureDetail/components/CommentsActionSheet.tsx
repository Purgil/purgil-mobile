import { Text, TextInput, View } from '~/components/styled'
import { ActionSheetProps } from '~/components/basic/ActionSheet.tsx'
import React from 'react'
import { ActionSheet, Comment } from '~/components/basic'
import { FlatList } from 'react-native'
import { comments } from './CommentsActionSheet.consts.ts'

type Props = {
  activityId: number
} & ActionSheetProps

function CommentsActionSheet({ activityId, ...props }: Props) {
  return (
    <ActionSheet {...props} snapPoints={[0.7, 1]}>
      <ActionSheet.Header>
        <Text variant='titleLarge'>댓글</Text>
      </ActionSheet.Header>
      <ActionSheet.Body>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          renderItem={({ item }) => <Comment key={item.id} comment={item} />}
        />
      </ActionSheet.Body>

      <ActionSheet.Footer>
        <TextInput />
      </ActionSheet.Footer>
    </ActionSheet>
  )
}

export default React.memo(CommentsActionSheet)
