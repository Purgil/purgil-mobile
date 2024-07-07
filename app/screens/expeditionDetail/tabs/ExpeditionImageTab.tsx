import { Text, View } from '~/components/styled'
import { memo } from 'react'

type Props = {
  id: number
}

function ExpeditionImageTab({ id }: Props) {
  return (
    <View>
      <Text>Expedition Image Tab</Text>
    </View>
  )
}

export default memo(ExpeditionImageTab)
