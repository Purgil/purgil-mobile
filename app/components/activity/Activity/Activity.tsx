import React, { useState } from 'react'
import { Activity as ActivityT } from '~/core/dto/adventure.dto'
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
  ListActionSheet,
  RatingStars,
  Swiper,
} from '~/components/shared'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import CommentsActionSheet from '~/components/comment/CommentsActionSheet/CommentsActionSheet.tsx'
import globalStyles from '~/utils/style.utils.ts'
import { SimultaneousRefs } from '~/core/dto/shared/shared.dto'

type Props = {
  activity: ActivityT
} & Partial<SimultaneousRefs>

function Activity({ activity, scrollRef, swiperRef }: Props) {
  /** state */
  const [commentsActionSheetVisible, setCommentsActionSheetVisible] =
    useState(false)
  const [reportActionSheetVisible, setReportActionSheetVisible] =
    useState(false)

  /** hook */
  const { colors } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  return (
    <>
      <View
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
                textStyle={font12}>
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

          <TouchableRipple
            onPress={() => navigation.navigate('ActivityDetail', { activity })}>
            <>
              <Swiper
                data={[1, 2, 3]}
                renderItem={() => <ImgArea />}
                swiperRef={swiperRef}
                scrollRef={scrollRef}
              />

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
            </>
          </TouchableRipple>

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
              <Button
                labelStyle={globalStyles.btnLabelS}
                icon='thumb-up-outline'
                compact>
                242
              </Button>
              <Button
                labelStyle={globalStyles.btnLabelS}
                icon='comment-text-outline'
                compact
                onPress={() => setCommentsActionSheetVisible(true)}>
                14
              </Button>
            </View>
          </View>
        </>
      </View>

      {reportActionSheetVisible && (
        <ListActionSheet
          list={[
            {
              title: '부적절한 탐험 신고 및 차단하기',
              onPress: () => {},
              mode: 'error',
            },
          ]}
          onClose={() => setReportActionSheetVisible(false)}
        />
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

const font12 = { fontSize: 12 }
