import { memo } from 'react'
import {
  Avatar,
  Icon,
  Pressable,
  Surface,
  Text,
  View,
} from '~/components/styled'
import { ExpeditionNoticeData } from '~/core/dto/expedition/expedition.data'
import { useTheme } from 'react-native-paper'

type Props = {
  notice: ExpeditionNoticeData
}

function ExpeditionNoticeItem({ notice }: Props) {
  const { colors } = useTheme()

  return (
    <Surface p={15} pb={18} elevation={2} borderRadius={10}>
      <View flexDirection='row' justifyContent='space-between'>
        <View flexDirection='row' alignItems='center'>
          <Avatar size={20} user={notice.writer} nicknameDisplayType='right' />
          <Text color={colors.outline} fontSize={12}>
            {' '}
            · 6시간 전
          </Text>
        </View>
        <Pressable>
          <Icon size={16} source='dots-vertical' color={colors.outline} />
        </Pressable>
      </View>
      <Text mt={10} fontWeight='bold' fontSize={15}>
        {notice.title}
      </Text>
      <Text mt={1} fontSize={13}>
        {notice.content}
      </Text>
    </Surface>
  )
}

export default memo(ExpeditionNoticeItem)
