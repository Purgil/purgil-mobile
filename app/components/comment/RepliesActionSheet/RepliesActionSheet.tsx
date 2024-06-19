import { ActionSheetProps } from '~/components/shared/ActionSheet/ActionSheet.tsx'
import { Comment as CommentT } from '~/core/dto/adventure.dto'
import { ActionSheet, Comment } from '~/components/shared'
import { IconButton, ScrollView, Text, View } from '~/components/styled'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { FlatList } from 'react-native'
import { comments } from '~/components/comment/CommentsActionSheet/CommentsActionSheet.consts.ts'
import CommentInput from '~/components/comment/CommentInput/CommentInput.tsx'

type Props = {
  comment: CommentT
} & ActionSheetProps

export default function RepliesActionSheet({
  comment,
  onClose,
  ...props
}: Props) {
  const { colors } = useTheme()

  const handleSubmit = (commentText: string) => {}

  return (
    <ActionSheet
      {...props}
      snapPoints={[0.7, 1]}
      keyboardAvoiding
      onClose={onClose}>
      <ActionSheet.Header>
        <View flexDirection='row' alignItems='center'>
          <IconButton icon='arrow-left' onPress={onClose} />
          <Text variant='titleLarge'>답글</Text>
        </View>
      </ActionSheet.Header>

      <ActionSheet.Body>
        <ScrollView>
          <View bg={colors.elevation.level3}>
            <Comment comment={comment} />
          </View>
          <View pl={30}>
            <FlatList
              scrollEnabled={false}
              data={comments}
              renderItem={({ item }) => (
                <Comment key={comment.id} comment={item} />
              )}
            />
          </View>
        </ScrollView>
      </ActionSheet.Body>

      <ActionSheet.Footer>
        <CommentInput onSubmit={handleSubmit} isReply />
      </ActionSheet.Footer>
    </ActionSheet>
  )
}
