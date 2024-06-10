import { ScrollView, Text, View } from '~/components/styled'
import Activities from '~/components/activity/Activities/Activities.tsx'
import React, { useState } from 'react'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '~/navigation/types.ts'

export default function ActivityScene() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [fabOpened, setFabOpened] = useState(false)

  const handleToggleFab = () => setFabOpened(!fabOpened)

  return (
    <>
      <ScrollView>
        <Activities />
      </ScrollView>

      <FAB.Group
        open={fabOpened}
        visible
        icon={fabOpened ? 'close' : 'plus'}
        actions={[
          {
            icon: 'image-outline',
            label: '사진 업로드',
            onPress: () => navigation.navigate('ImgUpload'),
          },
          {
            icon: 'post-outline',
            label: '게시글 작성',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'hiking',
            label: '액티비티 올리기',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={handleToggleFab}
      />
    </>
  )
}
