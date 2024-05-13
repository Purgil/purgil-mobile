import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import HomeScreen from '../screens/home/HomeScreen.tsx'
import RecordScreen from '../screens/record/RecordScreen.tsx'
import MapScreen from '../screens/map/MapScreen.tsx'
import SocialScreen from '../screens/social/SocialScreen.tsx'
import { ScreenParams } from './index.tsx'
import ProfileScreen from '../screens/profile/ProfileScreen.tsx'
import { Icon } from 'react-native-paper'

function BottomNavRouter() {
  const Tab = createMaterialBottomTabNavigator<ScreenParams>()

  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              source={focused ? 'map-search' : 'map-search-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          title: '북마크',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              source={focused ? 'bookmark' : 'bookmark-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Record'
        component={RecordScreen}
        options={{
          title: '기록',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              source={focused ? 'compass' : 'compass-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Social'
        component={SocialScreen}
        options={{
          title: '소셜',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              source={focused ? 'account-group' : 'account-group-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: '프로필',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              source={focused ? 'account-circle' : 'account-circle-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavRouter
