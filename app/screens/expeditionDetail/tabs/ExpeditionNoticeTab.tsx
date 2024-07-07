import { Text, View } from '~/components/styled'
import { memo } from 'react'

type Props = {
  id: number
}

function ExpeditionNoticeTab({ id }: Props) {
  return (
    <View>
      <Text>Expedition Notice Tab</Text>
    </View>
  )
}

export default memo(ExpeditionNoticeTab)
