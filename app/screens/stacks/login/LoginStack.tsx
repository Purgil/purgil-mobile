import { Button, Dialog, HelperText, Portal, Text } from 'react-native-paper'
import { TextInput, View } from '../../../components/styled'
import { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { Keyboard } from 'react-native'
import * as yup from 'yup'
import regex from '../../../utils/regex.tsx'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { login } from '../../../store/slices/authUser.slice.ts'
import { Gender } from '../../../enums/common.enums.ts'
import { RootStackScreenProps } from '../../../navigation/types.ts'

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

function LoginStack({ navigation }: RootStackScreenProps<'Login'>) {
  const dispatch = useDispatch<AppDispatch>()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [step, setStep] = useState<'email' | 'login' | 'register'>('email')

  const validationSchema = useMemo(() => {
    const additions: {
      email: yup.StringSchema
      nickname?: yup.StringSchema
      password?: yup.StringSchema
      passwordChk?: yup.StringSchema
    } = {
      email: yup
        .string()
        .required('이메일을 입력해주세요')
        .matches(regex.email, {
          message: '이메일 형식에 맞지 않습니다',
        }),
    }

    if (step !== 'email') {
      additions.password = yup
        .string()
        .required('패스워드를 입력해주세요')
        .min(8)
        .matches(regex.password, {
          message: '8자이상 영문, 숫자, 특수문자 조합',
        })
    }

    if (step === 'register') {
      additions.passwordChk = yup
        .string()
        .required(' ')
        .oneOf([yup.ref('password')], '패스워드가 일치하지 않습니다')
      additions.nickname = yup
        .string()
        .required('닉네임를 입력해주세요')
        .min(2, '두 글자 이상 입력해주세요')
        .max(20, '20자 이하로 입력해주세요')
    }

    return yup.object().shape(additions)
  }, [step])

  const { values, errors, setFieldValue, submitForm } = useFormik<AuthForm>({
    initialValues,
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    onSubmit: () => {
      Keyboard.dismiss()
      if (step === 'email') {
        const existsEmails = ['qwe@qwe.com', 'tmdghks2515@naver.com']
        if (existsEmails.includes(values.email)) {
          setStep('login')
        } else {
          setDialogVisible(true)
        }
      } else {
        dispatch(
          login({
            email: values.email,
            nickname: values.nickname || '아난이',
            age: 29,
            gender: Gender.MALE,
            phoneNum: '01042777768',
          }),
        )
        navigation.navigate('Home')
      }
    },
  })

  /* 뒤로가기 액션을 제어합니다 */
  useEffect(() => {
    const onBack = (e: any) => {
      if (step === 'email') {
        return
      }
      e.preventDefault()
      setStep('email')
    }
    navigation.addListener('beforeRemove', onBack)

    return () => {
      navigation.removeListener('beforeRemove', onBack)
    }
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

export default LoginStack
