import { Button, IconButton, Text, View } from '~/components/styled'
import React, { useState } from 'react'
import { Comment as CommentT } from '~/core/data/adventure.data'
import { ActionSheet, Avatar } from '~/components/basic'
import { useTheme } from 'react-native-paper'

type Props = {
  comment: CommentT
}

function Comment({ comment }: Props) {
  const { colors } = useTheme()

  const [reportActionSheetVisible, setReportActionSheetVisible] =
    useState(false)

  return (
    <>
      <View flexDirection='row' pt={10} pb={1} gap={8} alignItems='flex-start'>
        <Avatar user={comment.writer} nicknameDisplayType='hidden' />
        <View>
          <Text variant='bodySmall' color={colors.outline}>
            {comment.writer.nickname} · 2주 전
          </Text>
          <Text>{comment.content}</Text>
          <View flexDirection='row' mt={2} alignItems='center'>
            <IconButton size={16} icon='comment-text-outline' m={0} />
            <Text variant='labelSmall' ml={-1}>
              47
            </Text>
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
        <ActionSheet
          visible={reportActionSheetVisible}
          onClose={() => setReportActionSheetVisible(false)}>
          <ActionSheet.Body>
            <Button>부적절한 댓글 신고 및 차단하기</Button>
          </ActionSheet.Body>
        </ActionSheet>
      )}
    </>
  )
}

export default React.memo(Comment)
