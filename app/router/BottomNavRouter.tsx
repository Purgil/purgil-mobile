import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import HomeScreen from '../screens/home/HomeScreen.tsx'
import RecordScreen from '../screens/record/RecordScreen.tsx'
import MapScreen from '../screens/map/MapScreen.tsx'
import SocialScreen from '../screens/social/SocialScreen.tsx'
import { ScreenParams } from './index.tsx'
import ProfileScreen from '../screens/profile/ProfileScreen.tsx'

function BottomNavRouter() {
  const Tab = createMaterialBottomTabNavigator<ScreenParams>()
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: '홈' }}
      />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{ title: '지도' }}
      />
      <Tab.Screen
        name='Record'
        component={RecordScreen}
        options={{ title: '기록' }}
      />
      <Tab.Screen
        name='Social'
        component={SocialScreen}
        options={{ title: '소셜' }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ title: '프로필' }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavRouter
