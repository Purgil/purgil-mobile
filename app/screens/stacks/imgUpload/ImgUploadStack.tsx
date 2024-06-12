import { Button, Image, Pressable, Text, View } from '~/components/styled'
import { useCameraRoll } from '@react-native-camera-roll/camera-roll'
import { Dimensions, FlatList } from 'react-native'
import usePermission from '~/hooks/usePermission.ts'
import { PermissionType } from '~/enums/basic.enums.ts'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '~/navigation/types.ts'
import { Appbar, Dialog, useTheme } from 'react-native-paper'
import { useState } from 'react'
import { Image as ImageT } from '~/core/data/basic.types'
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll/src/CameraRoll.ts'

const windowWidth = Dimensions.get('window').width

type Props = {
  onComplete: () => void
  maxCount: number
}

export default function ImgUploadStack({ onComplete, maxCount }: Props) {
  /** hook */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [photos, getPhotos] = useCameraRoll()
  const { colors } = useTheme()

  usePermission({
    permissionTypes: [PermissionType.GALLERY],
    onPermissionGranted: () =>
      getPhotos({
        first: 80,
        assetType: 'Photos',
        include: ['filename', 'fileSize', 'imageSize', 'fileExtension'],
      }),
    onPermissionDenied: navigation.goBack,
  })

  /** state */
  const [pickedImgs, setPickedImgs] = useState<ImageT[]>([])
  const [alertDialogVisible, setAlertDialogVisible] = useState(false)

  /** function */
  const handlePressImg = (item: PhotoIdentifier) => {
    if (pickedImgs.some(img => img.uri === item.node.image.uri))
      setPickedImgs(pickedImgs.filter(img => img.uri !== item.node.image.uri))
    else if (pickedImgs.length >= 10) {
      setAlertDialogVisible(true)
      return
    } else
      setPickedImgs([
        ...pickedImgs,
        {
          uri: item.node.image.uri,
          fileSize: item.node.image.fileSize as number,
          width: item.node.image.width as number,
          height: item.node.image.height as number,
          extension: item.node.image.extension as string,
        },
      ])
  }

  return (
    <>
      <View flex={1}>
        <Appbar.Header>
          <Appbar.Action icon='close' onPress={navigation.goBack} />
          <Appbar.Content title='사진 선택' />
          <Button icon='check' onPress={onComplete}>
            선택완료
          </Button>
        </Appbar.Header>

        <FlatList
          data={photos?.edges}
          numColumns={4}
          keyExtractor={item => item.node.id}
          renderItem={({ item }) => {
            const index = pickedImgs.findIndex(
              pickedImg => pickedImg.uri === item.node.image.uri,
            )
            const picked = index > -1
            return (
              <Pressable
                onPress={() => handlePressImg(item)}
                flex={1 / 4}
                height={windowWidth / 4}
                p='1px'>
                <Image
                  source={{ uri: item.node.image.uri }}
                  width='100%'
                  height='100%'
                />
                <View
                  border={2}
                  borderColor='white'
                  width={25}
                  height={25}
                  bg={picked ? colors.primaryContainer : colors.background}
                  borderRadius={100}
                  position='absolute'
                  right={1}
                  bottom={1}
                  justifyContent='center'
                  alignItems='center'>
                  {picked && (
                    <Text
                      color={colors.onPrimaryContainer}
                      fontSize={12}
                      fontWeight='bold'>
                      {index + 1}
                    </Text>
                  )}
                </View>
              </Pressable>
            )
          }}
        />
      </View>

      <Dialog visible={alertDialogVisible}>
        <Dialog.Content>
          <Text>최대 {maxCount}장까지 선택 가능합니다.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setAlertDialogVisible(false)}>확인</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
