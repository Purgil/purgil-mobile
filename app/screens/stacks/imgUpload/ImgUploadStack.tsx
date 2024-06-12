import { Button, Image, Pressable, Text, View } from '~/components/styled'
import { useCameraRoll } from '@react-native-camera-roll/camera-roll'
import { Dimensions, FlatList } from 'react-native'
import usePermission from '~/hooks/usePermission.ts'
import { PermissionType } from '~/enums/basic.enums.ts'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList, RootStackScreenProps } from '~/navigation/types.ts'
import { Appbar, Dialog, Portal, useTheme } from 'react-native-paper'
import { useState } from 'react'
import { Image as ImageT } from '~/core/data/basic.types'
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll/src/CameraRoll.ts'

const windowWidth = Dimensions.get('window').width

export default function ImgUploadStack({
  navigation,
  route: {
    params: { maxCount },
  },
}: RootStackScreenProps<'ImgUpload'>) {
  /** state */
  const [selectedImgs, setSelectedImgs] = useState<ImageT[]>([])
  const [alertDialogVisible, setAlertDialogVisible] = useState(false)

  /** hook */
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

  /** function */
  const handlePressImg = (item: PhotoIdentifier) => {
    console.log('pressed>>')
    if (selectedImgs.some(img => img.uri === item.node.image.uri))
      setSelectedImgs(
        selectedImgs.filter(img => img.uri !== item.node.image.uri),
      )
    else if (selectedImgs.length === maxCount) {
      setAlertDialogVisible(true)
      return
    } else
      setSelectedImgs([
        ...selectedImgs,
        {
          uri: item.node.image.uri,
          fileSize: item.node.image.fileSize as number,
          width: item.node.image.width as number,
          height: item.node.image.height as number,
          extension: item.node.image.extension as string,
        },
      ])
  }

  const handleSubmit = () => {
    navigation.replace('CreatePost', { selectedImgs })
    /*navigation.navigate({
      name: 'CreatePost',
      params: { selectedImgs },
      merge: true,
    })*/
  }

  /** render */
  const renderImage = (item: PhotoIdentifier) => {
    const index = selectedImgs.findIndex(
      selectedImg => selectedImg.uri === item.node.image.uri,
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
  }

  return (
    <>
      <View flex={1}>
        <Appbar.Header>
          <Appbar.Action icon='close' onPress={navigation.goBack} />
          <Appbar.Content title='사진 선택' />
          <Button icon='check' onPress={handleSubmit}>
            선택완료
          </Button>
        </Appbar.Header>

        <FlatList
          data={photos?.edges}
          numColumns={4}
          keyExtractor={item => item.node.id}
          renderItem={({ item }) => renderImage(item)}
        />
      </View>

      <Dialog
        visible={alertDialogVisible}
        onDismiss={() => setAlertDialogVisible(false)}>
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
