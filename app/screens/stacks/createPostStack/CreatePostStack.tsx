import {
  Button,
  Icon,
  IconButton,
  Image,
  Text,
  TextInput,
  TouchableRipple,
  View,
} from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootStackScreenProps } from '~/navigation/types.ts'
import { Swiper } from '~/components/basic'
import { LayoutChangeEvent } from 'react-native'
import { memo, useCallback, useEffect, useState } from 'react'
import { Image as ImageT } from '~/core/data/basic.types'

export default function CreatePostStack({
  navigation,
  route: { params },
}: RootStackScreenProps<'CreatePost'>) {
  /** state */
  const [contentW, setContentW] = useState(0)

  /** hook */
  const { colors } = useTheme()

  /** memo */
  const images = params?.selectedImgs || []

  /** function */
  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContentW(e.nativeEvent.layout.width)
  }, [])
  const handleRemoveImage = (uri: string) => {
    navigation.setParams({
      selectedImgs: params?.selectedImgs?.filter(img => img.uri !== uri) || [],
    })
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

      <View px={10} gap={6}>
        <TextInput
          multiline
          mode='outlined'
          label='무슨일이 일어나고 있나요?'
          numberOfLines={8}
        />

        <View onLayout={handleLayout}>
          {images.length > 0 && (
            <Swiper
              hideIndicator
              groupCount={3}
              data={images}
              renderItem={item => (
                <ImageItem
                  image={item}
                  onRemove={handleRemoveImage}
                  contentW={contentW}
                />
              )}
            />
          )}
        </View>
        <TouchableRipple
          onPress={() =>
            navigation.navigate('ImgUpload', { maxCount: 10 - images.length })
          }
          border={1}
          borderColor={colors.primary}
          opacity={0.6}
          borderStyle='dashed'
          height={contentW / 3}
          width={contentW / 3}
          borderRadius={10}
          justifyContent='center'
          alignItems='center'>
          <Icon source='image' color={colors.primary} size={30} />
        </TouchableRipple>
      </View>
    </View>
  )
}

type Props = {
  image: ImageT
  onRemove: (uri: string) => void
  contentW: number
}

const ImageItem = memo(({ image, onRemove, contentW }: Props) => {
  return (
    <View>
      <View position='absolute' alignItems='flex-end' width='100%'>
        <IconButton
          size={16}
          icon='close'
          zIndex={1}
          backgroundColor='white'
          iconColor='black'
          opacity={0.8}
          onPress={() => onRemove(image.uri)}
        />
      </View>
      <Image
        borderRadius={10}
        height={contentW / 3}
        source={{ uri: image.uri }}
      />
    </View>
  )
})
