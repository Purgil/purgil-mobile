import React, { useState } from 'react'
import { Activity as ActivityT } from '~/core/data/adventure.data'
import {
  ActionSheet,
  Button,
  Chip,
  IconButton,
  Pressable,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import { Avatar, ImgArea, RatingStars, Swiper } from '~/components/basic'
import { Icon, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '~/navigation/types.ts'
import CommentsActionSheet from '~/screens/stacks/adventureDetail/components/CommentsActionSheet.tsx'

type Props = {
  activity: ActivityT
}

function Activity({ activity }: Props) {
  /** state */
  const [commentsActionSheetVisible, setCommentsActionSheetVisible] =
    useState(false)

  /** hook */
  const { colors } = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <>
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

            <View flexDirection='row' alignItems='center'>
              <Button mode='outlined' padding={0} compact>
                팔로우
              </Button>
              <IconButton icon='dots-vertical' m={0} size={20} />
            </View>
          </View>

          <View>
            <Swiper data={[1, 2, 3]} renderItem={() => <ImgArea />} />
          </View>

          <View>
            <Text variant='titleMedium' mb={2}>
              {activity.title}
            </Text>
            <View flexDirection='row' gap={3} alignItems='center'>
              <Text fontSize={12}>하이킹</Text>
              <Text>·</Text>
              <RatingStars rating={activity.rating} single />
            </View>
            <Text variant='bodyMedium' mt={1}>
              {activity.description}
            </Text>
            <View flexDirection='row' justifyContent='space-between' mt={2}>
              <Pressable
                onPress={() =>
                  navigation.navigate('AdventureDetail', {
                    adventure: activity.adventure,
                  })
                }
                borderBottomWidth={0.6}
                borderColor={colors.onSurfaceDisabled}>
                <Text color={colors.onSurfaceDisabled}>
                  {activity.adventure.name}
                </Text>
              </Pressable>
              <View flexDirection='row' gap={10}>
                <View flexDirection='row' alignItems='center' gap={2}>
                  <Icon size={18} source='thumb-up-outline' />
                  <Text fontSize={12}>242</Text>
                </View>
                <Pressable
                  flexDirection='row'
                  alignItems='center'
                  gap={2}
                  onPress={() => setCommentsActionSheetVisible(true)}>
                  <Icon size={18} source='comment-text-outline' />
                  <Text fontSize={12}>14</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      </TouchableRipple>

      {commentsActionSheetVisible && (
        <CommentsActionSheet
          visible={commentsActionSheetVisible}
          onClose={() => setCommentsActionSheetVisible(false)}
        />
      )}
    </>
  )
}

export default React.memo(Activity)
