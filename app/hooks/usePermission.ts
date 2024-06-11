import { PermissionsAndroid, Platform } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { PermissionType } from '~/enums/basic.enums.ts'

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
    if (hasPermission) return true

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

  const checkPermissions = useCallback(async () => {
    const allGranted = await Promise.all(
      permissionTypes.map(permissionType => {
        switch (permissionType) {
          case PermissionType.GALLERY:
            return checkGallerayPermission()
          case PermissionType.CAMERA:
            return true
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
