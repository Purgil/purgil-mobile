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
import RouteDetailScreen from '~/screens/routeDetail/RouteDetailScreen.tsx'
import RouteFilterScreen from '~/screens/routeFilter/RouteFilterScreen.tsx'
import FollowScreen from '~/screens/follow/FollowScreen.tsx'
import { ExpeditionFilterScreen } from '~/screens/expeditionFilter/ExpeditionFilterScreen.tsx'
import CreateExpeditionScreen from '~/screens/createExpedition/CreateExpeditionScreen.tsx'
import SearchRouteScreen from '~/screens/searchRoute/SearchRouteScreen.tsx'
import ExpeditionDetailScreen from '~/screens/expeditionDetail/ExpeditionDetailScreen.tsx'
import { SocialSearchScreen } from '~/screens/social/social-search/SocialSearchScreen.tsx'

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
          <Stack.Screen name='RouteDetail' component={RouteDetailScreen} />
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
          <Stack.Screen name='Follow' component={FollowScreen} />
          <Stack.Screen
            name='ExpeditionFilter'
            component={ExpeditionFilterScreen}
          />
          <Stack.Screen
            name='CreateExpedition'
            component={CreateExpeditionScreen}
          />
          <Stack.Screen name='SearchRoute' component={SearchRouteScreen} />
          <Stack.Screen
            name='ExpeditionDetail'
            component={ExpeditionDetailScreen}
          />
          <Stack.Screen name='SocialSearch' component={SocialSearchScreen} />
        </Stack.Navigator>
      </Portal.Host>
    </NavigationContainer>
  )
}

export default Router
