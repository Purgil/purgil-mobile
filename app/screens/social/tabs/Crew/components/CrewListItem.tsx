import {
  Button,
  Icon,
  Surface,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import { memo } from 'react'
import { CrewListData } from '~/core/dto/crew/crew.data'
import { Avatar as RNAvatar } from 'react-native-paper'

type Props = {
  crew: CrewListData
}

function CrewListItem({ crew }: Props) {
  return (
    <Surface elevation={2} flex={1} borderRadius={10}>
      <TouchableRipple onPress={() => {}} p={10}>
        <>
          <RNAvatar.Text label={crew.name[0]} size={30} />
          <Text mt={1} fontSize={14}>
            {crew.name}
          </Text>
          <View flexDirection='row' gap={5} mt={1}>
            <Icon size={18} source='hiking' />
            <Text>·</Text>
            <Text fontSize={14}>{crew.memberCount} 멤버</Text>
          </View>

          <Button mt={20} mode='contained-tonal' onPress={() => {}}>
            {crew.accessType === 'PUBLIC' ? '가입 신청' : '가입'}
          </Button>
        </>
      </TouchableRipple>
    </Surface>
  )
}

export default memo(CrewListItem)
