import { Button, View } from '~/components/styled'
import { Appbar } from 'react-native-paper'
import { Image, PermissionsAndroid, Platform } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { useState } from 'react'

export default function ImgUploadStack() {
  const [imageUri, setImageUri] = useState(null)

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to select photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      console.log('granted', granted)
      console.log('PermissionsAndroid.RESULTS', PermissionsAndroid.RESULTS)
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }
    return true
  }

  const pickImage = async () => {
    const hasPermission = await requestPermission()
    // if (!hasPermission) return

    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    })

    if (result.didCancel) {
      console.log('User cancelled image picker')
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error)
    } else if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri)
    }
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title='이미지 업로드' mode='small' />
      </Appbar.Header>

      <Button onPress={pickImage}>Pick an Image</Button>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  )
}
