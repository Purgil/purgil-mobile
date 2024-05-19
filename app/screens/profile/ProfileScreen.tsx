import { Button } from 'react-native-paper'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { RootStackParamList } from '../../navigation/types.tsx'

function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View>
      <Button mode='outlined' onPress={() => navigation.navigate('Auth')}>
        인증
      </Button>
      <Button mode='outlined' onPress={() => navigation.navigate('Login')}>
        로그인
      </Button>
      <Button mode='outlined' onPress={() => navigation.navigate('SignUp')}>
        회원가입
      </Button>
    </View>
  )
}

export default ProfileScreen
