import { View } from '../../styled'
import { useTheme } from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'

function MapArea() {
  const [region, setRegion] = useState({
    latitude: 34.8081487177366,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  })

  return (
    <View flex={1}>
      <MapView
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />
    </View>
  )
}

export default MapArea

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
