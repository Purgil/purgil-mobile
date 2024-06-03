import {
  IconButton,
  Pressable,
  Text,
  TextInput,
  View,
} from '~/components/styled'
import { ActionSheetProps } from '~/components/basic/ActionSheet.tsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActionSheet, Avatar, Comment } from '~/components/basic'
import { FlatList, Keyboard } from 'react-native'
import { comments } from './CommentsActionSheet.consts.ts'
import { Portal, useTheme } from 'react-native-paper'
import { me } from '~/screens/stacks/adventureDetail/components/ReviewScene.tsx'

type Props = {
  activityId: number
} & ActionSheetProps

function CommentsActionSheet({ activityId, ...props }: Props) {
  /** states */
  const [textInputFocused, setTextInputFocused] = useState(false)
  const [comment, setComment] = useState('')

  /** hooks */
  const { colors } = useTheme()
  const textInputRef = useRef<any>(null)

  /** functions */
  const handlePressInput = () => {
    if (textInputRef.current) {
      textInputRef.current?.focus()
      setTextInputFocused(true)
    }
  }
  const handleWriteComment = () => {}
  const handleChangeComment = useCallback((value: string) => {
    console.log('value>>', value)
    setComment(value)
  }, [])

  /** effect */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTextInputFocused(true)
        console.log('Keyboard is shown')
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setTextInputFocused(false)
        console.log('Keyboard is hidden')
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <>
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
          <Pressable
            onPress={handlePressInput}
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
                value={comment}
                mode='outlined'
                dense
                placeholder='댓글 작성'
                readOnly
              />
            </View>
          </Pressable>
        </ActionSheet.Footer>
      </ActionSheet>

      <Portal>
        <View flex={1} display={textInputFocused ? 'flex' : 'none'}>
          <View
            bg={colors.elevation.level3}
            flexDirection='row'
            position='absolute'
            bottom={0}
            width='100%'
            p={1}
            gap={10}>
            <Avatar user={me} nicknameDisplayType='hidden' />
            <View flex={1}>
              <TextInput
                ref={textInputRef}
                value={comment}
                onChangeText={setComment}
                mode='outlined'
                dense
                placeholder='댓글 작성'
              />
            </View>
            <IconButton icon='send' onPress={handleWriteComment} />
          </View>
        </View>
      </Portal>
    </>
  )
}

export default React.memo(CommentsActionSheet)
