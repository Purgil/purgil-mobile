import {
  ActionSheet,
  AnimatedScrollView,
  AnimatedView,
  Button,
  IconButton,
  Text,
  View,
} from '~/components/styled'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RootStackScreenProps } from '~/navigation/types.ts'
import { Appbar, Divider, Icon, useTheme } from 'react-native-paper'
import { MToHM } from '~/utils/datetime.utils.ts'
import { adventureDetail } from './AdventureDetailStack.consts.ts'
import { ImgArea, Swiper, TabView } from '~/components/basic'
import ReviewScene from '~/screens/stacks/adventureDetail/components/ReviewScene'
import ActivityScene from '~/screens/stacks/adventureDetail/components/ActivityScene'
import PhotoScene from '~/screens/stacks/adventureDetail/components/PhotoScene'
import { SceneMap } from 'react-native-tab-view'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { basicTimingConfig } from '~/utils/animation.utils.ts'

const renderScene = SceneMap({
  review: ReviewScene,
  activity: ActivityScene,
  photo: PhotoScene,
})

function AdventureDetailStack({
  navigation,
  route: {
    params: { adventure },
  },
}: RootStackScreenProps<'AdventureDetail'>) {
  /** state */
  const [marked, setMarked] = useState(false)
  const [routes] = useState([
    { key: 'review', title: '리뷰' },
    { key: 'activity', title: '활동' },
    { key: 'photo', title: '사진' },
  ])
  const [actionSheets, setActionSheets] = useState({ report: false })

  /** hooks */
  const { colors } = useTheme()

  /** shared */
  const headerBg = useSharedValue(0)

  /** effect */
  useEffect(() => {
    navigation.setOptions({ headerTitle: adventure.name })
  }, [navigation, adventure])

  /** handle */
  const handlePressBookmark = useCallback(() => {
    setMarked(!marked)
  }, [marked])
  const handlePressReportAdventure = useCallback(() => {
    console.log('>>')
  }, [])
  const handlePressNavigate = useCallback(() => {}, [])

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

  /** render */
  const carouselItem = <ImgArea />

  return (
    <>
      <AnimatedView
        position='absolute'
        top={0}
        zIndex={1}
        width='100%'
        style={headerStyle}>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
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

      <AnimatedScrollView
        flex={1}
        bg={colors.background}
        scrollEventThrottle={10}
        onScroll={e => {
          // scrollY.value = e.nativeEvent.contentOffset.y
          if (e.nativeEvent.contentOffset.y > 100 && headerBg.value === 0)
            headerBg.value = withTiming(1, basicTimingConfig)
          else if (e.nativeEvent.contentOffset.y <= 100 && headerBg.value === 1)
            headerBg.value = withTiming(0, basicTimingConfig)
        }}>
        {/*<ScrollView flex={1} bg={colors.background} stickyHeaderIndices={[0]}>*/}
        <View height={300}>
          <Swiper data={[...new Array(6)]} renderItem={() => carouselItem} />
        </View>

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
        <TabView routes={routes} renderScene={renderScene} />
      </AnimatedScrollView>

      {/* 신고하기 */}
      {actionSheets.report && (
        <ActionSheet
          visible={actionSheets.report}
          onClose={() => setActionSheets({ ...actionSheets, report: false })}>
          <View pb={3}>
            <Button onPress={handlePressReportAdventure}>
              부적정한 루트 신고하기
            </Button>
          </View>
        </ActionSheet>
      )}
    </>
  )
}

export default AdventureDetailStack
