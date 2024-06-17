import 'react-native-gesture-handler'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import SignUpScreen from '~/screens/register/SignUpScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNav from './BottomNav.tsx'
import AuthScreen from '~/screens/auth/AuthScreen.tsx'
import LoginScreen from '~/screens/login/LoginScreen.tsx'
import { ScreenPropsMap } from './types.ts'
import { Portal } from 'react-native-paper'
import ActivityDetailScreen from '~/screens/activityDetail/ActivityDetailScreen.tsx'
import ImgUploadScreen from '~/screens/imgUpload/ImgUploadScreen.tsx'
import CreateActivityScreen from '~/screens/createActivity/CreateActivityScreen.tsx'
import CreatePostScreen from '~/screens/createPost/CreatePostScreen.tsx'
import AdventureDetailScreen from '~/screens/adventureDetail/AdventureDetailScreen.tsx'
import RouteFilterScreen from '~/screens/routeFilter/RouteFilterScreen.tsx'

function Router() {
  const Stack = createStackNavigator<ScreenPropsMap>()
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Portal.Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='BottomNav' component={BottomNav} />
          <Stack.Screen
            name='Auth'
            component={AuthScreen}
            options={{ headerTitle: '로그인/회원가입', headerShown: true }}
          />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerTitle: '이메일로 시작', headerShown: true }}
          />
          <Stack.Screen
            name='SignUp'
            component={SignUpScreen}
            options={{ headerTitle: '이메일로 시작', headerShown: true }}
          />
          <Stack.Screen
            name='AdventureDetail'
            component={AdventureDetailScreen}
          />
          <Stack.Screen
            name='ActivityDetail'
            component={ActivityDetailScreen}
          />
          <Stack.Screen name='ImgUpload' component={ImgUploadScreen} />
          <Stack.Screen name='CreatePost' component={CreatePostScreen} />
          <Stack.Screen
            name='CreateActivity'
            component={CreateActivityScreen}
          />
          <Stack.Screen name='RouteFilter' component={RouteFilterScreen} />
        </Stack.Navigator>
      </Portal.Host>
    </NavigationContainer>
  )
}

export default Router
