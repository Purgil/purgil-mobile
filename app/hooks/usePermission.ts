import { PermissionsAndroid, Platform } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { PermissionType } from '~/enums/shared.enum.ts'

type Props = {
  permissionTypes: PermissionType[]
  onPermissionGranted?: () => void
  onPermissionDenied?: () => void
}

export default function usePermission({
  permissionTypes,
  onPermissionGranted,
  onPermissionDenied,
}: Props) {
  const [permissions, setPermissions] = useState<{
    [key in PermissionType]: boolean
  }>({
    [PermissionType.CAMERA]: false,
    [PermissionType.GALLERY]: false,
    [PermissionType.GEOLOCATION]: false,
  })

  const checkGallerayPermission = useCallback(async () => {
    const checkPermission = async () => {
      if (Number(Platform.Version) >= 33) {
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
    const hasPermission = await checkPermission()
    if (hasPermission) {
      setPermissions({ ...permissions, [PermissionType.GALLERY]: true })
      return true
    }

    const requestPermission = async () => {
      if (Number(Platform.Version) >= 33) {
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

    const result = await requestPermission()
    setPermissions({ ...permissions, [PermissionType.GALLERY]: result })
    return result
  }, [permissions])

  const checkGeoLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'We need access to your location to show your position on the map',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location')
        } else {
          console.log('Location permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }, [permissions])

  const checkPermissions = useCallback(async () => {
    const allGranted = await Promise.all(
      permissionTypes.map(permissionType => {
        switch (permissionType) {
          case PermissionType.GALLERY:
            return checkGallerayPermission()
          case PermissionType.CAMERA:
            return true
          case PermissionType.GEOLOCATION:
            return checkGeoLocationPermission()
        }
      }),
    )
    if (allGranted && onPermissionGranted) onPermissionGranted()
    else if (!allGranted && onPermissionDenied) onPermissionDenied()
  }, [permissions])

  useEffect(() => {
    checkPermissions()
  }, [])

  return {
    permissions,
  }
}
