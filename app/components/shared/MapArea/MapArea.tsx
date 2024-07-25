import { View } from '../../styled'
import { useTheme } from 'react-native-paper'
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import usePermission from '~/hooks/usePermission.ts'
import { PermissionType } from '~/enums/shared.enum.ts'

const routeCoordinates = [
  { latitude: 37.530341, longitude: 126.926073 }, // 여의도
  { latitude: 37.528965, longitude: 126.935584 }, // 한강공원 진입
  { latitude: 37.5326, longitude: 126.940775 }, // 한강대교
  { latitude: 37.526342, longitude: 126.947768 }, // 반포대교 북단
  { latitude: 37.520309, longitude: 126.996522 }, // 동호대교 북단
  { latitude: 37.51954, longitude: 127.016649 }, // 성수대교 북단
  { latitude: 37.517104, longitude: 127.034504 }, // 영동대교 북단
  { latitude: 37.520027, longitude: 127.050652 }, // 청담대교 북단
  { latitude: 37.520613, longitude: 127.070981 }, // 잠실철교 북단
  { latitude: 37.520992, longitude: 127.081625 }, // 잠실대교 북단
  { latitude: 37.517829, longitude: 127.093884 }, // 잠실
]
function MapArea() {
  const { colors } = useTheme()
  usePermission({
    permissionTypes: [PermissionType.GEOLOCATION],
  })

  const [region, setRegion] = useState({
    latitude: 37.517829,
    longitude: 127.093883,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  return (
    <View flex={1}>
      <MapView
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        <Polyline
          coordinates={routeCoordinates}
          strokeColor={colors.primaryContainer} // 라인의 색상
          strokeWidth={6} // 라인의 두께
        />
      </MapView>
    </View>
  )
}

export default MapArea

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
