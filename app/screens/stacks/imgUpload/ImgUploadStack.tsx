import { Button, Image, Text, TouchableRipple, View } from '~/components/styled'
import { useCameraRoll } from '@react-native-camera-roll/camera-roll'
import { Dimensions, FlatList } from 'react-native'
import usePermission from '~/hooks/usePermission.ts'
import { PermissionType } from '~/enums/basic.enums.ts'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '~/navigation/types.ts'
import { Appbar } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width

export default function ImgUploadStack() {
  /** hook */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [photos, getPhotos] = useCameraRoll()

  usePermission({
    permissionTypes: [PermissionType.GALLERY],
    onPermissionGranted: () => getPhotos({ first: 80, assetType: 'Photos' }),
    onPermissionDenied: navigation.goBack,
  })

  /** function */
  const handlePressImg = (item: any) => {}

  return (
    <View flex={1}>
      <Appbar.Header>
        <Appbar.Action icon='close' onPress={() => navigation.goBack()} />
        <Appbar.Content title='사진 선택' />
        <Button icon='check'>선택완료</Button>
      </Appbar.Header>

      <FlatList
        data={photos?.edges}
        numColumns={4}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => (
          <TouchableRipple
            onPress={() => handlePressImg(item)}
            flex={1 / 4}
            height={windowWidth / 4}
            p='1px'>
            <Image
              source={{ uri: item.node.image.uri }}
              width='100%'
              height='100%'
            />
          </TouchableRipple>
        )}
      />
    </View>
  )
}
