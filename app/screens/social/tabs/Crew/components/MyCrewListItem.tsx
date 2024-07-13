import { Text, TouchableRipple } from '~/components/styled'
import { memo } from 'react'
import { CrewListData } from '~/core/dto/crew/crew.data'
import { Avatar as RNAvatar } from 'react-native-paper'

type Props = {
  crew: CrewListData
}

function MyCrewListItem({ crew }: Props) {
  return (
    <TouchableRipple onPress={() => {}} px={2} py={2} alignItems='center'>
      <>
        <RNAvatar.Text label={crew.name[0]} size={45} />
        <Text mt={1} fontSize={12} width={60} textAlign='center'>
          {crew.name}
        </Text>
      </>
    </TouchableRipple>
  )
}

export default memo(MyCrewListItem)
