import {
  Button,
  IconButton,
  Image,
  ScrollView,
  TextInput,
  View,
} from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootStackScreenProps } from '~/navigation/types.ts'
import { ImgArea, Swiper } from '~/components/basic'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import { useState } from 'react'

const windowWidth = Dimensions.get('window').width

export default function CreatePostStack({
  navigation,
  route: {
    params: { selectedImgs },
  },
}: RootStackScreenProps<'CreatePost'>) {
  /** state */
  const [contentW, setContentW] = useState(0)

  /** hook */
  const { colors } = useTheme()

  /** function */
  const handleLayout = (e: LayoutChangeEvent) => {
    console.log('e>>')
    setContentW(e.nativeEvent.layout.width)
  }

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.Action icon='close' onPress={navigation.goBack} />
        <Appbar.Content title='게시글' />
        <Button mode='contained' mr={2}>
          게시하기
        </Button>
      </Appbar.Header>

      <View p={10}>
        <TextInput
          multiline
          mode='outlined'
          label='무슨일이 일어나고 있나요?'
          numberOfLines={6}
        />

        <View onLayout={handleLayout}>
          <Swiper
            hideIndicator
            groupCount={3}
            data={selectedImgs}
            renderItem={item => (
              <View>
                <Image
                  borderRadius={10}
                  width='100%'
                  height={contentW / 3}
                  source={{ uri: item.uri }}
                />
              </View>
            )}
          />
        </View>
      </View>

      <View
        bg={colors.background}
        position='absolute'
        bottom={0}
        width='100%'
        borderTopWidth={2}
        borderColor={colors.background}>
        <IconButton
          icon='image'
          iconColor={colors.primary}
          onPress={() => navigation.navigate('ImgUpload', { maxCount: 10 })}
        />
      </View>
    </View>
  )
}
