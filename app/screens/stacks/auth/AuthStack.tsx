import { Button, IconButton, Text, View } from '../../../components/styled'
import KakaoIcon from '../../../assets/svgs/kakao-logo.svg'
import NaverIcon from '../../../assets/svgs/naver-logo.svg'
import GoogleIcon from '../../../assets/svgs/google-logo.svg'
import { RootStackScreenProps } from '../../../navigation/types.tsx'

function AuthStack({ navigation }: RootStackScreenProps<'Auth'>) {
  return (
    <View flex={1} py={20} px={12} justifyContent='flex-end'>
      <Button
        mode='contained'
        mb={10}
        onPress={() => navigation.navigate('Login')}>
        이메일로 시작하기
      </Button>
      <Text textAlign='center' mb={10}>
        또는
      </Text>
      <View flexDirection='row' justifyContent='center'>
        <IconButton icon={KakaoIcon} bg='#FEE500' size={32} />
        <IconButton icon={NaverIcon} bg='#03cf5d' size={32} />
        <IconButton icon={GoogleIcon} bg='#f8f8f8' size={32} />
      </View>
    </View>
  )
}

export default AuthStack
