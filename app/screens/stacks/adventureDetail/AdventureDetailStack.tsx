import { Button, IconButton, Text, View } from '~/components/styled'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RootStackScreenProps } from '~/navigation/types.ts'
import { Divider, Icon, useTheme } from 'react-native-paper'
import { MToHM } from '~/utils/datetime.utils.ts'
import { adventureDetail } from './AdventureDetailStack.consts.ts'
import { BottomSheet, Carousel, ImgArea, TabView } from '~/components/basic'
import { Dimensions } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ReviewScene from '~/screens/stacks/adventureDetail/components/ReviewScene'
import ActivityScene from '~/screens/stacks/adventureDetail/components/ActivityScene'
import PhotoScene from '~/screens/stacks/adventureDetail/components/PhotoScene'
import { SceneMap } from 'react-native-tab-view'

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
  const { colors } = useTheme()
  const adventureReportBottomSheetRef = useRef<BottomSheetModal>(null)
  /* state */
  const [marked, setMarked] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [routes] = useState([
    { key: 'review', title: '리뷰' },
    { key: 'activity', title: '활동' },
    { key: 'photo', title: '사진' },
  ])

  useEffect(() => {
    navigation.setOptions({ headerTitle: adventure.name })
  }, [navigation, adventure])

  /* handle */
  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])
  const handlePressBookmark = useCallback(() => {
    setMarked(!marked)
  }, [marked])
  const handlePressReportAdventure = useCallback(() => {
    console.log('>>')
  }, [])
  const handlePressAdventureMenu = useCallback(() => {
    adventureReportBottomSheetRef?.current?.present()
  }, [])
  const handlePressNavigate = useCallback(() => {}, [])

  /* memo */
  const bookmarkIcon = useMemo(
    () => (marked ? 'bookmark' : 'bookmark-outline'),
    [marked],
  )
  const carouselItem = <ImgArea />

  return (
    <>
      <View flex={1}>
        <View
          bg='transparent'
          position='absolute'
          zIndex={1}
          width='100%'
          py={1}
          justifyContent='space-between'
          flexDirection='row'>
          <IconButton
            icon='chevron-left'
            mode='contained-tonal'
            bg={colors.background}
            onPress={handleGoBack}
          />
          <View flexDirection='row'>
            <IconButton
              icon={bookmarkIcon}
              onPress={handlePressBookmark}
              mode='contained-tonal'
              bg={colors.background}
            />
            <IconButton
              icon='dots-vertical'
              onPress={handlePressAdventureMenu}
              mode='contained-tonal'
              bg={colors.background}
            />
          </View>
        </View>

        <View height={300}>
          <Carousel
            width={Dimensions.get('screen').width}
            data={[...new Array(6)]}
            renderItem={() => carouselItem}
          />
        </View>

        <View px={10} py={20}>
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
            mb={15}>
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
      </View>

      {/* bottomSheet */}
      <BottomSheet bottomSheetRef={adventureReportBottomSheetRef} hideIndicator>
        <View pb={3}>
          <Button onPress={handlePressReportAdventure}>
            부적정한 루트 신고하기
          </Button>
        </View>
      </BottomSheet>
    </>
  )
}

export default AdventureDetailStack
