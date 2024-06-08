import {
  AnimatedScrollView,
  AnimatedView,
  Avatar,
  Button,
  Chip,
  Divider,
  Pressable,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import { RootStackScreenProps } from '~/navigation/types.ts'
import { Appbar, List, useTheme } from 'react-native-paper'
import React, { useCallback, useMemo, useState } from 'react'
import {
  ActionSheet,
  Comment,
  ImgArea,
  ListActionSheet,
  MapArea,
  RatingStars,
  Swiper,
} from '~/components/basic'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import globalStyles from '~/utils/style.utils.ts'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { basicTimingConfig } from '~/utils/animation.utils.ts'
import CommentsActionSheet from '~/components/comment/CommentsActionSheet/CommentsActionSheet.tsx'
import { adventureDetail } from '~/screens/stacks/adventureDetail/AdventureDetailStack.consts.ts'
import { MToHM } from '~/utils/datetime.utils.ts'

export default function ActivityDetailStack({
  navigation,
  route: {
    params: { activity },
  },
}: RootStackScreenProps<'ActivityDetail'>) {
  /** hooks */
  const { colors } = useTheme()

  /** states */
  const [commentsActionSheetVisible, setCommentsActionSheetVisible] =
    useState(false)
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const [marked, setMarked] = useState(false)

  /** shared values */
  const headerBg = useSharedValue(0)

  /** memo */
  const bookmarkIcon = useMemo(
    () => (marked ? 'bookmark' : 'bookmark-outline'),
    [marked],
  )

  /** functions */
  const handlePressBookmark = () => {
    setMarked(!marked)
  }
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 100 && headerBg.value === 0)
      headerBg.value = withTiming(1, basicTimingConfig)
    else if (e.nativeEvent.contentOffset.y <= 100 && headerBg.value === 1)
      headerBg.value = withTiming(0, basicTimingConfig)
  }

  /** styles */
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      headerBg.value,
      [0, 1],
      ['transparent', colors.background],
    ),
  }))

  return (
    <>
      <View flex={1}>
        <AnimatedView
          position='absolute'
          top={0}
          zIndex={1}
          width='100%'
          style={headerStyle}>
          <Appbar.Header style={globalStyles.transparentBg}>
            <Appbar.Action
              icon='close'
              onPress={navigation.goBack}
              containerColor={colors.background}
              size={20}
            />
            <Appbar.Content title='' />
            <Appbar.Action
              icon={bookmarkIcon}
              containerColor={colors.background}
              onPress={handlePressBookmark}
              size={20}
            />
            <Appbar.Action
              icon='dots-vertical'
              onPress={() => setActionSheetVisible(true)}
              containerColor={colors.background}
              size={20}
            />
          </Appbar.Header>
        </AnimatedView>

        <AnimatedScrollView
          flex={1}
          bg={colors.background}
          scrollEventThrottle={10}
          onScroll={handleScroll}>
          <Swiper data={[...new Array(3)]} renderItem={() => <ImgArea />} />
          <View px={10}>
            <RatingStars
              rating={activity.rating}
              ratingPosition='hide'
              size={25}
            />
            <Text variant='titleLarge'>{activity.title}</Text>
            <Text variant='bodySmall' mb={10} color={colors.onSurfaceDisabled}>
              하이킹 · 2024년 2월 13일
            </Text>

            <View flexDirection='row' justifyContent='space-between' mb={2}>
              <Avatar
                user={activity.user}
                size={30}
                nicknameDisplayType='right'
              />
              <Chip
                borderRadius={100}
                fontSize={10}
                compact
                bg={colors.surfaceVariant}
                textStyle={{ fontSize: 12 }}>
                팔로우
              </Chip>
            </View>

            <View
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'>
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
              <Button
                labelStyle={globalStyles.btnLabelS}
                icon='thumb-up-outline'
                compact>
                242
              </Button>
            </View>

            <TouchableRipple
              bg={colors.elevation.level2}
              borderRadius={10}
              p={2}
              pb={3}
              mt={1}
              onPress={() => setCommentsActionSheetVisible(true)}>
              <>
                <Text variant='bodyMedium' mb={2}>
                  댓글
                </Text>
                <View flexDirection='row' alignItems='center' gap={10}>
                  <Avatar
                    user={activity.user}
                    size={30}
                    nicknameDisplayType='hidden'
                  />
                  <Text variant='bodyMedium'>재밌음 ㅇㅇ</Text>
                </View>
              </>
            </TouchableRipple>

            <Divider my={10} />

            <View flexDirection='row' justifyContent='space-around' mt={30}>
              <View gap={10}>
                <Text variant='bodySmall' textAlign='center'>
                  거리
                </Text>
                <Text variant='titleLarge' textAlign='center'>
                  {adventureDetail.distance}km
                </Text>
              </View>
              {adventureDetail.avgCompleteTime && (
                <View gap={10}>
                  <Text variant='bodySmall' textAlign='center'>
                    소요시간
                  </Text>
                  <Text variant='titleLarge' textAlign='center'>
                    {MToHM(adventureDetail.avgCompleteTime)}
                  </Text>
                </View>
              )}
            </View>

            <View
              flexDirection='row'
              justifyContent='space-around'
              mt={30}
              mb={10}>
              <View gap={10}>
                <Text variant='bodySmall' textAlign='center'>
                  칼로리
                </Text>
                <Text variant='titleLarge' textAlign='center'>
                  {activity.calories}kcal
                </Text>
              </View>
              <View gap={10}>
                <Text variant='bodySmall' textAlign='center'>
                  누적 오르막
                </Text>
                <Text variant='titleLarge' textAlign='center'>
                  {activity.elevationGain}m
                </Text>
              </View>
            </View>
          </View>

          <Divider my={30} />

          <View gap={10}>
            <Text px={10} variant='titleLarge'>
              경로
            </Text>
            <View height={300}>
              <MapArea />
            </View>
          </View>
        </AnimatedScrollView>
      </View>

      {actionSheetVisible && (
        <ListActionSheet
          onClose={() => setActionSheetVisible(false)}
          list={[
            { title: '길찾기', onPress: handlePressBookmark },
            {
              title: '해당 경로를 사용하여 탐색하기',
              onPress: handlePressBookmark,
            },
            {
              title: '부적절한 활동 신고 및 차단하기',
              onPress: handlePressBookmark,
              mode: 'error',
            },
          ]}
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
