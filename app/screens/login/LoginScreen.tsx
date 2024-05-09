import { Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { StackParamList } from '../Router.tsx'

function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  return (
    <Button onPress={() => navigation.navigate('Register')}>
      <Text>go to Register</Text>
    </Button>
  )
}

export default LoginScreen
