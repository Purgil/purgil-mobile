import { memo } from 'react'
import {
  Avatar,
  Button,
  Chip,
  Icon,
  IconButton,
  Surface,
  Text,
  View,
} from '~/components/styled'
import { ExpeditionListResDto } from '~/core/dto/expedition/expedition.res-dto'
import { useTheme } from 'react-native-paper'
import { User } from '~/core/dto/user.dto'

type Props = {
  expedition: ExpeditionListResDto
}

function ExpeditionListItem({ expedition }: Props) {
  const { colors } = useTheme()

  return (
    <Surface p={10} elevation={2} borderRadius={10}>
      <View flexDirection='row' justifyContent='space-between' mb={1}>
        <Avatar
          user={expedition.leader as unknown as User}
          size={30}
          underNickname='3분 전'
          nicknameDisplayType='right'
        />
        <IconButton icon='dots-vertical' size={18} m={0} />
      </View>

      <View flexDirection='row' gap={5}>
        <Text mb={1} fontSize={17}>
          {expedition.title}
        </Text>
        {/*<Chip icon='hiking'>하이킹</Chip>*/}
      </View>

      <Text mb={1} fontSize={14} color={colors.onSurfaceVariant}>
        {expedition.description}
      </Text>

      <View flexDirection='row' my={3} px={10}>
        <View
          alignItems='center'
          pr={10}
          borderRightWidth={1}
          borderColor={colors.elevation.level4}>
          <Text fontSize={13} color={colors.onSurfaceDisabled}>
            모집마감
          </Text>
          <Text fontSize={13} color={colors.onSurface}>
            9월 5일
          </Text>
          <Text fontSize={13} color={colors.onSurface}>
            14시 0분
          </Text>
        </View>

        <View
          alignItems='center'
          px={10}
          borderRightWidth={1}
          borderColor={colors.elevation.level4}>
          <Text fontSize={13} color={colors.onSurfaceDisabled}>
            출발
          </Text>
          <Text fontSize={13} color={colors.onSurface}>
            9월 5일
          </Text>
          <Text fontSize={13} color={colors.onSurface}>
            14시 0분
          </Text>
        </View>

        <View
          alignItems='center'
          px={10}
          borderRightWidth={1}
          borderColor={colors.elevation.level4}>
          <Text fontSize={13} color={colors.onSurfaceDisabled}>
            나이제한
          </Text>
          <Text fontSize={13} color={colors.onSurface}>
            20세 ~ 60세
          </Text>
        </View>

        <View alignItems='center' px={10}>
          <Text fontSize={13} color={colors.onSurfaceDisabled}>
            모집현황
          </Text>
          <Text fontSize={13} color={colors.onSurface}>
            10명 / 15명
          </Text>
        </View>
      </View>

      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='flex-end'>
        <View flexDirection='row' mb={1} gap={5}>
          <Text color={colors.primary} fontSize={13}>
            {expedition.route.title}
          </Text>
          <Text
            color={colors.onSurfaceDisabled}
            fontSize={12}
            fontWeight='bold'>
            · 서울시 송파구
          </Text>
        </View>
        <Button mode='contained'>참가 신청</Button>
      </View>
    </Surface>
  )
}

export default memo(ExpeditionListItem)
