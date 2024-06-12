import {
  Avatar,
  Button,
  IconButton,
  Image,
  TextInput,
  View,
} from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootStackScreenProps } from '~/navigation/types.ts'
import { Swiper } from '~/components/basic'
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export default function CreatePostStack({
  navigation,
  route: {
    params: { selectedImgs },
  },
}: RootStackScreenProps<'CreatePost'>) {
  /** hook */
  const { colors } = useTheme()

  return (
    <View flex={1}>
      <Appbar.Header>
        <Appbar.Action icon='close' onPress={navigation.goBack} />
        <Appbar.Content title='게시글' />
        <Button mode='contained' mr={2}>
          게시하기
        </Button>
      </Appbar.Header>

      <View p={2}>
        <TextInput
          multiline
          mode='outlined'
          placeholder='무슨일이 일어나고 있나요?'
          numberOfLines={6}
        />

        <Swiper
          data={selectedImgs}
          renderItem={item => (
            <Image
              width='100%'
              height={windowWidth}
              source={{ uri: item.uri }}
            />
          )}
        />
      </View>

      <View
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
