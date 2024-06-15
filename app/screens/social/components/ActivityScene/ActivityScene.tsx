import { ScrollView, Text, View } from '~/components/styled'
import Activities from '~/components/activity/Activities/Activities.tsx'
import React, { useRef, useState } from 'react'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '~/navigation/types.ts'
import { Image } from '~/core/data/basic.types'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import swiper from '~/components/basic/Swiper/Swiper.tsx'

export default function ActivityScene() {
  /** hook */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
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
          {
            icon: 'hiking',
            label: '액티비티 올리기',
            onPress: () => console.log('Pressed notifications'),
          },
          {
            icon: 'post-outline',
            label: '게시글 작성',
            onPress: () => navigation.navigate('CreatePost'),
          },
          {
            icon: 'image-outline',
            label: '사진 업로드',
            onPress: () =>
              navigation.navigate('ImgUpload', {
                maxCount: 10,
              }),
          },
        ]}
        onStateChange={() => setFabOpened(!fabOpened)}
      />
    </>
  )
}
