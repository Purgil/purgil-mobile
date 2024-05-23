import { Text, View } from '../styled'
import { useTheme } from 'react-native-paper'

function MapArea() {
  const { colors } = useTheme()

  return (
    <View flex={1} bg={colors.inverseSurface} justifyContent='center'>
      <Text textAlign='center' color={colors.inverseOnSurface}>
        지도영역
      </Text>
    </View>
  )
}

export default MapArea
