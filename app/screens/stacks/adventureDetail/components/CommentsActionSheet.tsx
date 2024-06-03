import { IconButton, Text, TextInput, View } from '~/components/styled'
import { ActionSheetProps } from '~/components/basic/ActionSheet.tsx'
import React from 'react'
import { ActionSheet, Avatar, Comment } from '~/components/basic'
import { FlatList } from 'react-native'
import { comments } from './CommentsActionSheet.consts.ts'
import { useTheme } from 'react-native-paper'
import { me } from '~/screens/stacks/adventureDetail/components/ReviewScene.tsx'

type Props = {
  activityId: number
} & ActionSheetProps

function CommentsActionSheet({ activityId, ...props }: Props) {
  const { colors } = useTheme()

  /** function */
  const handleWriteComment = () => {}

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
        <View
          flexDirection='row'
          borderTopWidth={1}
          bg={colors.elevation.level3}
          alignItems='center'
          p={1}
          gap={10}
          borderColor={colors.elevation.level3}>
          <Avatar user={me} nicknameDisplayType='hidden' />
          <View flex={1}>
            <TextInput
              mode='outlined'
              dense
              placeholder='댓글 작성'
              multiline
            />
          </View>
          <IconButton icon='send' onPress={handleWriteComment} />
        </View>
      </ActionSheet.Footer>
    </ActionSheet>
  )
}

export default React.memo(CommentsActionSheet)
