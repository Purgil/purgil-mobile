import { Text, View } from '~/components/styled'
import { Icon } from 'react-native-paper'
import { Dimensions, FlatList } from 'react-native'
import { ImgArea } from '~/components/shared'

const imageW = Dimensions.get('window').width / 3
const imageH = imageW * 1.618

export default function RoutePhotoTab() {
  return (
    <View>
      <View p={10} flexDirection='row' alignItems='center' gap={3}>
        <Text my={10}>최신순</Text>
        <Icon size={18} source='sort' />
      </View>

      <FlatList
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={gap1}
        columnWrapperStyle={gap1}
        data={[...Array(21).keys()]}
        keyExtractor={item => `${item}`}
        renderItem={() => (
          <View width={imageW} height={imageH}>
            <ImgArea height='100%' />
          </View>
        )}
      />
    </View>
  )
}

const gap1 = { gap: 1 }
