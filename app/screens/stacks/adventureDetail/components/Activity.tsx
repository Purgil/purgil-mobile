import React from 'react'
import { Activity as ActivityT } from '~/core/data/adventure.data'
import {
  Button,
  Chip,
  IconButton,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import { Avatar, ImgArea, RatingStars, Swiper } from '~/components/basic'
import { Icon, useTheme } from 'react-native-paper'

type Props = {
  activity: ActivityT
}

function Activity({ activity }: Props) {
  const { colors } = useTheme()

  return (
    <TouchableRipple
      py={20}
      borderBottomWidth={2}
      borderColor={colors.elevation.level3}>
      <>
        <View flexDirection='row' justifyContent='space-between' mb={2}>
          <Avatar
            user={activity.user}
            nicknameDisplayType='right'
            size={40}
            underNickname='1시간 전'
          />

          <View flexDirection='row'>
            <Button mode='outlined' padding={0} compact>
              팔로우
            </Button>
            <IconButton icon='dots-vertical' m={0} />
          </View>
        </View>

        <View>
          <Swiper data={[1, 2, 3]} renderItem={() => <ImgArea />} />
        </View>

        <View>
          <Text variant='titleMedium'>{activity.title}</Text>
          <RatingStars rating={activity.rating} size={22} />
          <Text variant='bodyMedium' mt={2}>
            {activity.description}
          </Text>
          <View flexDirection='row' justifyContent='space-between' mt={2}>
            <View flexDirection='row'>
              <Text>{activity.adventure.name}</Text>
            </View>
            <View flexDirection='row' gap={10}>
              <View flexDirection='row' alignItems='center' gap={2}>
                <Icon size={18} source='thumb-up-outline' />
                <Text fontSize={12}>242</Text>
              </View>
              <View flexDirection='row' alignItems='center' gap={2}>
                <Icon size={18} source='comment-text-outline' />
                <Text fontSize={12}>14</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    </TouchableRipple>
  )
}

export default React.memo(Activity)
