import {
  AnimatedScrollView,
  AnimatedView,
  Button,
  IconButton,
  Text,
  View,
} from '~/components/styled'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RootScreenProps } from '~/navigation/types.ts'
import { Appbar, Divider, Icon, useTheme } from 'react-native-paper'
import { MToHM } from '~/utils/datetime.utils.ts'
import { ActionSheet, ImgArea, Swiper, TabView } from '~/components/basic'
import Activities from '~/components/activity/Activities/Activities.tsx'
import { SceneMap } from 'react-native-tab-view'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { basicTimingConfig } from '~/utils/animation.utils.ts'
import globalStyles from '~/utils/style.utils.ts'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { adventureDetail } from '~/screens/adventureDetail/AdventureDetailScreen.consts.ts'
import AdventureReviewTab from '~/screens/adventureDetail/tabs/AdventureReview/AdventureReviewTab.tsx'
import AdventurePhotoTab from '~/screens/adventureDetail/tabs/AdventurePhoto/AdventurePhotoTab.tsx'

const routes = [
  { key: 'review', title: '리뷰' },
  { key: 'activity', title: '활동' },
  { key: 'photo', title: '사진' },
]

function AdventureDetailScreen({
  navigation,
  route: {
    params: { adventure },
  },
}: RootScreenProps<'AdventureDetail'>) {
  /** state */
  const [marked, setMarked] = useState(false)
  const [actionSheets, setActionSheets] = useState({ report: false })

  /** hooks */
  const { colors } = useTheme()
  const scrollRef = useRef<any>(null)
  const swiperRef = useRef<any>(null)

  const renderTabs = useMemo(
    () =>
      SceneMap({
        review: AdventureReviewTab,
        activity: () => (
          <Activities scrollRef={scrollRef} swiperRef={swiperRef} />
        ),
        photo: AdventurePhotoTab,
      }),
    [],
  )

  /** shared */
  const headerBg = useSharedValue(0)

  /** effect */
  useEffect(() => {
    navigation.setOptions({ headerTitle: adventure.name })
  }, [navigation, adventure])

  /** handle */
  const handlePressBookmark = useCallback(() => {
    setMarked(state => !state)
  }, [])
  const handlePressReportAdventure = useCallback(() => {
    console.log('>>')
  }, [])
  const handlePressNavigate = useCallback(() => {}, [])
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.y > 100 && headerBg.value === 0)
        headerBg.value = withTiming(1, basicTimingConfig)
      else if (e.nativeEvent.contentOffset.y <= 100 && headerBg.value === 1)
        headerBg.value = withTiming(0, basicTimingConfig)
    },
    [],
  )

  /** memo */
  const bookmarkIcon = useMemo(
    () => (marked ? 'bookmark' : 'bookmark-outline'),
    [marked],
  )

  /** style */
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      headerBg.value,
      [0, 1],
      ['transparent', colors.background],
    ),
  }))

  return (
    <>
      <AnimatedView
        position='absolute'
        top={0}
        zIndex={1}
        width='100%'
        style={headerStyle}>
        <Appbar.Header style={globalStyles.transparentBg}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            containerColor={colors.background}
            size={20}
          />
          <Appbar.Content title='' />
          <Appbar.Action
            icon='download'
            containerColor={colors.background}
            size={20}
          />
          <Appbar.Action
            icon={bookmarkIcon}
            onPress={handlePressBookmark}
            containerColor={colors.background}
            size={20}
          />
          <Appbar.Action
            icon='dots-vertical'
            onPress={() => setActionSheets({ ...actionSheets, report: true })}
            containerColor={colors.background}
            size={20}
          />
        </Appbar.Header>
      </AnimatedView>

      <NativeViewGestureHandler
        ref={scrollRef}
        simultaneousHandlers={swiperRef}>
        <AnimatedScrollView
          flex={1}
          bg={colors.background}
          scrollEventThrottle={10}
          onScroll={handleScroll}>
          <Swiper data={[...new Array(6)]} renderItem={() => <ImgArea />} />

          <View
            px={10}
            py={20}
            bg={colors.background}
            borderTopRightRadius={10}
            borderTopLeftRadius={10}
            top={-20}>
            <Text variant='titleLarge'>{adventure.name}</Text>
            <View flexDirection='row' justifyContent='space-between' pr={1}>
              <View justifyContent='flex-end'>
                <Text variant='bodyMedium' mb={1}>
                  {adventure.difficulty} ·{' '}
                  <Icon size={16} source='star' color={colors.primary} />
                  {adventure.rating}
                </Text>
                <Text variant='bodyMedium' mb={2}>
                  {adventure.address}
                </Text>
              </View>
              <IconButton
                size={36}
                icon='navigation-variant'
                bg={colors.primary}
                iconColor={colors.onPrimary}
                onPress={handlePressNavigate}
              />
            </View>

            <Divider />

            <View
              flexDirection='row'
              justifyContent='space-around'
              mt={55}
              mb={10}>
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
                    평균 소요시간
                  </Text>
                  <Text variant='titleLarge' textAlign='center'>
                    {MToHM(adventureDetail.avgCompleteTime)}
                  </Text>
                  {/* 칼로리 */}
                  {/* 루트 유형 */}
                </View>
              )}
              <View gap={10}>
                <Text variant='bodySmall' textAlign='center'>
                  누적 오르막
                </Text>
                <Text variant='titleLarge' textAlign='center'>
                  {adventureDetail.elevationGain}m
                </Text>
              </View>
            </View>
          </View>
          {/* 탭 */}
          <TabView routes={routes} renderScene={renderTabs} />
        </AnimatedScrollView>
      </NativeViewGestureHandler>

      {/* 신고하기 */}
      {actionSheets.report && (
        <ActionSheet
          visible={actionSheets.report}
          onClose={() => setActionSheets({ ...actionSheets, report: false })}>
          <ActionSheet.Body>
            <Button onPress={handlePressReportAdventure}>
              부적정한 루트 신고하기
            </Button>
          </ActionSheet.Body>
        </ActionSheet>
      )}
    </>
  )
}

export default AdventureDetailScreen
