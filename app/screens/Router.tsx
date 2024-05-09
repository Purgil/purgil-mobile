import 'react-native-gesture-handler'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import RegisterScreen from './register/RegisterScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabsScreen from './bottomTabs/BottomTabsScreen.tsx'
import AuthScreen from './auth/AuthScreen.tsx'
import LoginScreen from './login/LoginScreen.tsx'

export type StackParamList = {
  BottomTabs: undefined
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
  const Stack = createStackNavigator<StackParamList>()
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='BottomTabs' component={BottomTabsScreen} />
        <Stack.Screen name='Auth' component={AuthScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
