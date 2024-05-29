import { Text, View } from '~/components/styled'
import { Icon } from 'react-native-paper'

export default function ActivityScene() {
  return (
    <View p={10}>
      <Text my={10}>
        최신순 <Icon size={16} source='sort' />
      </Text>
    </View>
  )
}
