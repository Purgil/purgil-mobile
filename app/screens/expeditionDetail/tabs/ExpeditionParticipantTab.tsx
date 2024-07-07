import { Text, View } from '~/components/styled'
import { memo } from 'react'

type Props = {
  id: number
}

function ExpeditionParticipantTab({ id }: Props) {
  return (
    <View>
      <Text>ExpeditionParticipantTab</Text>
    </View>
  )
}

export default memo(ExpeditionParticipantTab)
