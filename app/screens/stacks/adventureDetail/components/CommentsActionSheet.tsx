import { ActionSheet, Text, View } from '~/components/styled'
import { ActionSheetProps } from '~/components/basic/ActionSheet.tsx'
import React from 'react'

type Props = {
  activityId: number
} & ActionSheetProps

function CommentsActionSheet({ activityId, ...props }: Props) {
  return (
    <ActionSheet {...props}>
      <View>
        <Text>123</Text>
      </View>
    </ActionSheet>
  )
}

export default React.memo(CommentsActionSheet)
