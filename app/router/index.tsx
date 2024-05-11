import 'react-native-gesture-handler'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import RegisterScreen from '../screens/register/RegisterScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavRouter from './BottomNavRouter.tsx'
import AuthScreen from '../screens/auth/AuthScreen.tsx'
import LoginScreen from '../screens/login/LoginScreen.tsx'

export type ScreenParams = {
  BottomNav: undefined
  // 하단 nav 화면들 입니다
  Home: undefined
  Map: undefined
  Record: undefined
  Social: undefined
  Profile: undefined
  // 하단 nav 이외의 화면들 입니다
  Auth: undefined
  Login: undefined
  Register: undefined
}

function Router() {
  const Stack = createStackNavigator<ScreenParams>()
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name='BottomNav'
          component={BottomNavRouter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Auth'
          component={AuthScreen}
          options={{ headerTitle: '로그인/회원가입' }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerTitle: '이메일로 시작' }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerTitle: '이메일로 시작' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
