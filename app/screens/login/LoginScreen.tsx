import { Button, Dialog, HelperText, Portal, Text } from 'react-native-paper'
import { ScreenParams } from '../../router'
import { StackNavigationProp } from '@react-navigation/stack'
import { TextInput, View } from '../../components/styled'
import { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { BackHandler, Keyboard } from 'react-native'

type AuthForm = {
  email: string
  password?: string
  passwordChk?: string
  nickname?: string
}

const initialValues: AuthForm = {
  email: '',
  password: '',
  passwordChk: '',
  nickname: '',
}

type Props = {
  navigation: StackNavigationProp<ScreenParams>
}

function LoginScreen({ navigation }: Props) {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [step, setStep] = useState<'email' | 'login' | 'register'>('email')

  const { values, errors, setFieldValue, submitForm } = useFormik<AuthForm>({
    initialValues,
    onSubmit: () => {
      console.log('>>', values)
      Keyboard.dismiss()
      if (step === 'email') {
        if (values.email === 'tmdghks2515@naver.com') {
          setStep('login')
        } else {
          setDialogVisible(true)
        }
      }
    },
  })

  /* 뒤로가기 액션을 제어합니다 */
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (step === 'email') {
        return
      }
      e.preventDefault()
      setStep('email')
    })
  }, [navigation, step])

  const onPressVerificate = () => {
    setDialogVisible(false)
    // navigation.navigate('Register')
    setStep('register')
  }

  const onChangeEmail = (value: string) => {
    setFieldValue('email', value)
    if (step === 'login') {
      setStep('email')
    }
  }

  const buttonText = useMemo(() => {
    if (step === 'email') {
      return '다음'
    }
    if (step === 'login') {
      return '로그인'
    }
    if (step === 'register') {
      return '가입하기'
    }
  }, [step])

  return (
    <>
      <View flex={1} p={12}>
        {/* 이메일 */}
        <TextInput
          mode='outlined'
          label='이메일'
          value={values.email}
          onChangeText={onChangeEmail}
          disabled={step !== 'email'}
          inputMode='email'
        />
        <HelperText type='error' visible={!!errors.email}>
          {errors.email}
        </HelperText>

        {step === 'register' && (
          <>
            {/* 닉네임 */}
            <TextInput
              mode='outlined'
              label='닉네임'
              value={values.nickname}
              onChangeText={value => setFieldValue('nickname', value)}
            />
            <HelperText type='error' visible={!!errors.nickname}>
              {errors.nickname}
            </HelperText>
          </>
        )}

        {step !== 'email' && (
          <>
            {/* 패스워드 */}
            <TextInput
              mode='outlined'
              label='패스워드'
              value={values.password}
              onChangeText={value => setFieldValue('password', value)}
              secureTextEntry
            />
            <HelperText type='error' visible={!!errors.password}>
              {errors.password}
            </HelperText>
          </>
        )}

        {step === 'register' && (
          <>
            {/* 패스워드 확인 */}
            <TextInput
              mode='outlined'
              label='패스워드 확인'
              value={values.passwordChk}
              onChangeText={value => setFieldValue('passwordChk', value)}
              secureTextEntry
            />
            <HelperText type='error' visible={!!errors.passwordChk}>
              {errors.passwordChk}
            </HelperText>
          </>
        )}

        <View flex={1} justifyContent='flex-end'>
          <Button mode='contained' onPress={submitForm}>
            {buttonText}
          </Button>
        </View>
      </View>

      {/* Dialog */}
      <Portal>
        <Dialog
          onDismiss={() => setDialogVisible(false)}
          visible={dialogVisible}
          dismissable={false}
          dismissableBackButton>
          <Dialog.Icon size={35} icon='check-circle' />
          <Dialog.Title>가입할 수 있는 이메일이에요.</Dialog.Title>
          <Dialog.Content>
            <Text>가입을 위해 휴대폰 본인인증을 진행해 주세요.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>닫기</Button>
            <Button mode='contained' onPress={onPressVerificate}>
              본인 확인하기
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

export default LoginScreen
