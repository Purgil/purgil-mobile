import React, { useState } from 'react'
import { Icon, TextInput, TouchableRipple, View } from '~/components/styled'
import { Avatar } from '~/components/basic'
import { useTheme } from 'react-native-paper'
import { me } from '~/screens/adventureDetail/tabs/AdventureReview/AdventureReviewTab.tsx'

type Props = {
  onSubmit: (text: string) => void
  isReply?: boolean
}

function CommentInput({ onSubmit, isReply = false }: Props) {
  const [commentText, setCommentText] = useState('')
  const { colors } = useTheme()

  return (
    <View
      flexDirection='row'
      borderTopWidth={1}
      bg={colors.elevation.level3}
      alignItems='center'
      borderColor={colors.elevation.level3}
      height={55}
      justifySelf='flex-end'>
      <View alignItems='center' justifyContent='center' pl={1} pr={2}>
        <Avatar user={me} nicknameDisplayType='hidden' />
      </View>
      <View flex={1}>
        <TextInput
          mode='outlined'
          dense
          label={isReply ? '답글 작성' : '댓글 작성'}
          multiline
          activeOutlineColor={colors.outline}
          onChangeText={setCommentText}
        />
      </View>
      <TouchableRipple
        px={3}
        height='100%'
        onPress={() => onSubmit(commentText)}
        alignItems='center'
        justifyContent='center'>
        <Icon size={30} source='send' />
      </TouchableRipple>
    </View>
  )
}

export default React.memo(CommentInput)
