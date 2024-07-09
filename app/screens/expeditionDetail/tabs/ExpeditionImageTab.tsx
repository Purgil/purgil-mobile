import { Button, ScrollView, Text, View } from '~/components/styled'
import { memo } from 'react'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import { useTheme } from 'react-native-paper'
import { Dimensions, FlatList } from 'react-native'
import { ImgArea } from '~/components/shared'

type Props = {
  id: number
}

function ExpeditionImageTab({ id }: Props) {
  const { colors } = useTheme()
  return (
    <>
      <ScrollView>
        <ListSubheader>
          사진 <Text color={colors.outline}>24</Text>
        </ListSubheader>
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
      </ScrollView>

      <View p={10}>
        <Button mode='contained-tonal'>사진 업로드</Button>
      </View>
    </>
  )
}

export default memo(ExpeditionImageTab)

const gap1 = { gap: 1 }
const imageW = Dimensions.get('window').width / 3
const imageH = imageW * 1.618
