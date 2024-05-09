import { Button, Text } from 'react-native-paper'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { StackParamList } from '../Router.tsx'

function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  return (
    <View>
      <Button mode='outlined' onPress={() => navigation.navigate('Auth')}>
        <Text>인증</Text>
      </Button>
      <Button mode='outlined' onPress={() => navigation.navigate('Login')}>
        <Text>로그인</Text>
      </Button>
      <Button mode='outlined' onPress={() => navigation.navigate('Register')}>
        <Text>회원가입</Text>
      </Button>
    </View>
  )
}

export default ProfileScreen
