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
        options={{ title: '홈', tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{ title: '지도', tabBarIcon: 'map' }}
      />
      <Tab.Screen
        name='Record'
        component={RecordScreen}
        options={{ title: '기록', tabBarIcon: 'compass' }}
      />
      <Tab.Screen
        name='Social'
        component={SocialScreen}
        options={{ title: '소셜', tabBarIcon: 'account-group' }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ title: '프로필', tabBarIcon: 'account-circle' }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavRouter
