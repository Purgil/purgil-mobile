import React, { useState } from 'react'
import { Activity as ActivityT } from '~/core/data/adventure.data'
import {
  Button,
  Chip,
  IconButton,
  Pressable,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import {
  ActionSheet,
  Avatar,
  ImgArea,
  RatingStars,
  Swiper,
} from '~/components/basic'
import { useTheme } from 'react-native-paper'
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
  const [reportActionSheetVisible, setReportActionSheetVisible] =
    useState(false)

  /** hook */
  const { colors } = useTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <>
      <TouchableRipple
        pt={20}
        pb={10}
        borderBottomWidth={2}
        borderColor={colors.elevation.level3}>
        <>
          <View flexDirection='row' justifyContent='space-between' mb={2}>
            <Avatar
              user={activity.user}
              nicknameDisplayType='right'
              size={30}
              underNickname='1시간 전'
            />

            <View flexDirection='row' alignItems='center'>
              <Chip
                borderRadius={100}
                fontSize={10}
                compact
                bg={colors.surfaceVariant}
                textStyle={{ fontSize: 12 }}>
                팔로우
              </Chip>
              <IconButton
                icon='dots-vertical'
                m={0}
                size={20}
                onPress={() => setReportActionSheetVisible(true)}
              />
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
            <View
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
              mt={2}>
              <Pressable
                onPress={() =>
                  navigation.navigate('AdventureDetail', {
                    adventure: activity.adventure,
                  })
                }>
                <Text color={colors.onSurfaceDisabled}>
                  {activity.adventure.name}
                </Text>
              </Pressable>
              <View flexDirection='row' gap={15}>
                <View flexDirection='row' alignItems='center'>
                  <IconButton size={18} icon='thumb-up-outline' m={0} />
                  <Text fontSize={12}>242</Text>
                </View>
                <View flexDirection='row' alignItems='center'>
                  <IconButton
                    size={18}
                    icon='comment-text-outline'
                    onPress={() => setCommentsActionSheetVisible(true)}
                    m={0}
                  />
                  <Text fontSize={12}>14</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      </TouchableRipple>

      {reportActionSheetVisible && (
        <ActionSheet
          visible={reportActionSheetVisible}
          onClose={() => setReportActionSheetVisible(false)}>
          <ActionSheet.Body>
            <Button>부적절한 활동 신고 및 차단하기</Button>
          </ActionSheet.Body>
        </ActionSheet>
      )}

      {commentsActionSheetVisible && (
        <CommentsActionSheet
          activityId={activity.id}
          visible={commentsActionSheetVisible}
          onClose={() => setCommentsActionSheetVisible(false)}
        />
      )}
    </>
  )
}

export default React.memo(Activity)
