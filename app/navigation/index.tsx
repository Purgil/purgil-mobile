import 'react-native-gesture-handler'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import SignUpStack from '../screens/stacks/register/SignUpStack.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNav from './BottomNav.tsx'
import AuthStack from '../screens/stacks/auth/AuthStack.tsx'
import LoginStack from '../screens/stacks/login/LoginStack.tsx'
import { RootStackParamList } from './types.ts'
import AdventureDetailStack from '../screens/stacks/adventureDetail/AdventureDetailStack.tsx'

function Router() {
  const Stack = createStackNavigator<RootStackParamList>()
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name='BottomNav'
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Auth'
          component={AuthStack}
          options={{ headerTitle: '로그인/회원가입' }}
        />
        <Stack.Screen
          name='Login'
          component={LoginStack}
          options={{ headerTitle: '이메일로 시작' }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUpStack}
          options={{ headerTitle: '이메일로 시작' }}
        />
        <Stack.Screen
          name='AdventureDetail'
          component={AdventureDetailStack}
          options={{ headerTitle: '모험 상세' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
