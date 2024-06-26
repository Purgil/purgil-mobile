import {
  AnimatedScrollView,
  AnimatedView,
  Button,
  IconButton,
  Text,
  View,
} from '~/components/styled'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RootScreenProps } from '~/router/types.ts'
import { Appbar, Divider, Icon, useTheme } from 'react-native-paper'
import { MToHM } from '~/utils/datetime.utils.ts'
import {
  ActionSheet,
  ImgArea,
  ListActionSheet,
  Swiper,
  TabView,
} from '~/components/shared'
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
  { key: 'activity', title: '탐험' },
  { key: 'photo', title: '사진' },
]

const ActivityTab = (scrollRef: any, swiperRef: any) => (
  <Activities scrollRef={scrollRef} swiperRef={swiperRef} />
)

function AdventureDetailScreen({
  navigation,
  route: {
    params: { adventure },
  },
}: RootScreenProps<'AdventureDetail'>) {
  /** state */
  const [marked, setMarked] = useState(false)
  const [actionSheets, setActionSheets] = useState({ etc: false })

  /** hooks */
  const { colors } = useTheme()
  const scrollRef = useRef<any>(null)
  const swiperRef = useRef<any>(null)

  const renderTabs = useMemo(
    () =>
      SceneMap({
        review: AdventureReviewTab,
        activity: () => ActivityTab(scrollRef, swiperRef),
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
            onPress={() => setActionSheets(state => ({ ...state, etc: true }))}
            containerColor={colors.background}
            size={20}
          />
        </Appbar.Header>
      </AnimatedView>

      <View flex={1} bg={colors.background}>
        <NativeViewGestureHandler
          ref={scrollRef}
          simultaneousHandlers={swiperRef}>
          <AnimatedScrollView scrollEventThrottle={10} onScroll={handleScroll}>
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
                <View alignItems='center'>
                  <IconButton
                    m={0}
                    size={36}
                    icon='navigation-variant'
                    bg={colors.primary}
                    iconColor={colors.onPrimary}
                    onPress={handlePressNavigate}
                  />
                  <Text
                    variant='titleSmall'
                    color={colors.primary}
                    fontSize={12}>
                    탐험하기
                  </Text>
                </View>
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

        <View p={10} borderTopWidth={1} borderColor={colors.elevation.level3}>
          <Button mode='contained'>이 루트로 원정대 생성하기</Button>
        </View>
      </View>

      {actionSheets.etc && (
        <ListActionSheet
          list={[
            {
              title: '이 루트로 원정대 생성하기',
              onPress: handlePressReportAdventure,
            },
            {
              title: '부적절한 루트 신고하기',
              onPress: handlePressReportAdventure,
              mode: 'error',
            },
          ]}
          onClose={() => setActionSheets(state => ({ ...state, etc: false }))}
        />
      )}
    </>
  )
}

export default AdventureDetailScreen
