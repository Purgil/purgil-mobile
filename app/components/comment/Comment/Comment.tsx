import { Button, IconButton, Text, View } from '~/components/styled'
import React, { useState } from 'react'
import { Comment as CommentT } from '~/core/data/adventure.data'
import { Avatar, ListActionSheet } from '~/components/basic'
import { useTheme } from 'react-native-paper'
import RepliesActionSheet from '~/components/comment/RepliesActionSheet/RepliesActionSheet.tsx'
import globalStyles from '~/utils/style.utils.ts'

type Props = {
  comment: CommentT
}

function Comment({ comment }: Props) {
  /** hooks */
  const { colors } = useTheme()

  /** states */
  const [reportActionSheetVisible, setReportActionSheetVisible] =
    useState(false)
  const [repliesActionSheetVisible, setRepliesActionSheetVisible] =
    useState(false)

  return (
    <>
      <View
        flexDirection='row'
        pt={10}
        pb={1}
        px={10}
        gap={8}
        alignItems='flex-start'>
        <Avatar user={comment.writer} nicknameDisplayType='hidden' />
        <View>
          <Text variant='bodySmall' color={colors.outline}>
            {comment.writer.nickname} · 2주 전
          </Text>
          <Text>{comment.content}</Text>
          <View flexDirection='row'>
            <Button
              mt={2}
              icon='comment-text-outline'
              compact
              onPress={() => setRepliesActionSheetVisible(true)}
              contentStyle={{ gap: 0, margin: 0, padding: 0 }}
              labelStyle={globalStyles.btnLabelXs}>
              47
            </Button>
          </View>
        </View>
        <View flex={1} alignItems='flex-end'>
          <IconButton
            icon='dots-vertical'
            size={16}
            onPress={() => setReportActionSheetVisible(true)}
          />
        </View>
      </View>

      {reportActionSheetVisible && (
        <ListActionSheet
          list={[
            {
              title: '부적절한 댓글 신고 및 차단하기',
              onPress: () => {},
              mode: 'error',
            },
          ]}
          onClose={() => setReportActionSheetVisible(false)}
        />
      )}

      {repliesActionSheetVisible && (
        <RepliesActionSheet
          comment={comment}
          onClose={() => setRepliesActionSheetVisible(false)}
        />
      )}
    </>
  )
}

export default React.memo(Comment)
