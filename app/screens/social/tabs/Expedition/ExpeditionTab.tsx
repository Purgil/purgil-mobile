import { Chip, Text, View } from '~/components/styled'
import { useState } from 'react'

type ExpeditionTabActionSheets = {
  routeTypeFilter: boolean
  etcFilter: boolean
}

export default function ExpeditionTab() {
  const [actionSheets, setActionSheets] = useState<ExpeditionTabActionSheets>({
    routeTypeFilter: false,
    etcFilter: false,
  })

  return (
    <View>
      <View flexDirection='row'>
        <Chip>탐험 유형</Chip>
      </View>
    </View>
  )
}
