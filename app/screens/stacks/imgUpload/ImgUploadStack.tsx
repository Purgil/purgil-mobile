import { Button, Icon, View } from '~/components/styled'
import {
  CameraRoll,
  useCameraRoll,
} from '@react-native-camera-roll/camera-roll'
import { Image, PermissionsAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import { useGallery } from '~/hooks/useGallary.ts'
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll/src/CameraRoll.ts'

export default function ImgUploadStack() {
  const [photos, getPhotos] = useCameraRoll()

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (true) {
        // if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        )
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        )
      }
    }

    const hasPermission = await getCheckPermissionPromise()
    console.log('hasPermission', hasPermission)
    if (hasPermission) {
      return true
    }
    const getRequestPermissionPromise = () => {
      if (true) {
        // if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        )
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED)
      }
    }
    const rr = await getRequestPermissionPromise()
    console.log('rr', rr)
    return rr
  }

  const kk = async () => {
    const hasRole = await hasAndroidPermission()
    if (hasRole) await getPhotos()
  }

  useEffect(() => {
    console.log('000')
    kk()
  }, [])

  return (
    <>
      <Button>get Photo</Button>

      {photos?.edges?.map((photo, index) => (
        <Image
          source={{ uri: photo.node.image.uri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      ))}
    </>
  )
}
