import React from 'react'
import { Activity as ActivityT } from '~/core/data/adventure.data'
import { Text } from '~/components/styled'

type Props = {
  activity: ActivityT
}

function Activity({ activity }: Props) {
  return <Text>{activity.title}</Text>
}

export default React.memo(Activity)
