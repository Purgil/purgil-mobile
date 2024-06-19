import { ScrollView } from '~/components/styled'
import Activities from '~/components/activity/Activities/Activities.tsx'
import React, { useRef, useState } from 'react'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'

export default function SocialActivityTab() {
  /** hook */
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()
  const swiperRef = useRef<any>(null)
  const scrollRef = useRef<any>(null)

  /** state */
  const [fabOpened, setFabOpened] = useState(false)

  return (
    <>
      <NativeViewGestureHandler
        ref={scrollRef}
        simultaneousHandlers={swiperRef}>
        <ScrollView>
          <Activities scrollRef={scrollRef} swiperRef={swiperRef} />
        </ScrollView>
      </NativeViewGestureHandler>

      <FAB.Group
        open={fabOpened}
        visible
        icon={fabOpened ? 'close' : 'plus'}
        actions={[
          /*          {
            icon: 'hiking',
            label: '액티비티 생성',
            onPress: () => navigation.navigate('CreateActivity'),
          },*/
          {
            icon: 'image-outline',
            label: '사진 업로드',
            onPress: () =>
              navigation.navigate('ImgUpload', {
                maxCount: 10,
                targetScreen: 'CreatePost',
              }),
          },
          {
            icon: 'post-outline',
            label: '게시글 작성',
            onPress: () => navigation.navigate('CreatePost'),
          },
        ]}
        onStateChange={() => setFabOpened(!fabOpened)}
      />
    </>
  )
}
