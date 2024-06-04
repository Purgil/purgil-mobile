import {
  Icon,
  Text,
  TextInput,
  TouchableRipple,
  View,
} from '~/components/styled'
import { ActionSheetProps } from '~/components/basic/ActionSheet/ActionSheet.tsx'
import React, { useState } from 'react'
import { ActionSheet, Avatar, Comment } from '~/components/basic'
import { FlatList } from 'react-native'
import { comments } from './CommentsActionSheet.consts.ts'
import { useTheme } from 'react-native-paper'
import { me } from '~/screens/stacks/adventureDetail/components/ReviewScene/ReviewScene.tsx'

type Props = {
  activityId: number
} & ActionSheetProps

export default function CommentsActionSheet({ activityId, ...props }: Props) {
  /** states */
  const [commentText, setCommentText] = useState('')

  /** hooks */
  const { colors } = useTheme()

  /** functions */
  const handleWriteComment = () => {}

  return (
    <ActionSheet {...props} snapPoints={[0.7, 1]} keyboardAvoiding>
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
          borderColor={colors.elevation.level3}>
          <View alignItems='center' justifyContent='center' pl={1} pr={2}>
            <Avatar user={me} nicknameDisplayType='hidden' />
          </View>
          <View flex={1}>
            <TextInput
              mode='outlined'
              dense
              label='댓글 작성'
              multiline
              activeOutlineColor={colors.outline}
              onChangeText={setCommentText}
            />
          </View>
          <TouchableRipple
            px={3}
            height='100%'
            onPress={handleWriteComment}
            alignItems='center'
            justifyContent='center'>
            <Icon size={30} source='send' />
          </TouchableRipple>
        </View>
      </ActionSheet.Footer>
    </ActionSheet>
  )
}
