import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import HomeScreen from '../screens/home/HomeScreen.tsx'
import RecordScreen from '../screens/record/RecordScreen.tsx'
import MapScreen from '../screens/map/MapScreen.tsx'
import SocialScreen from '../screens/social/SocialScreen.tsx'
import ProfileScreen from '../screens/profile/ProfileScreen.tsx'
import { Icon } from 'react-native-paper'
import { ScreenPropsMap } from './types.ts'
import { ReactNode, useCallback } from 'react'
import { View } from '~/components/styled'
import { Dimensions } from 'react-native'
import { initialExpeditionFilter } from '~/screens/social/tabs/Expedition/ExpeditionTab.consts.ts'

const iconMap: { [screenName: string]: { icon: string; focusedIcon: string } } =
  {
    Home: {
      icon: 'map-search-outline',
      focusedIcon: 'map-search',
    },
    Social: {
      icon: 'account-group-outline',
      focusedIcon: 'account-group',
    },
    Record: {
      icon: 'compass-outline',
      focusedIcon: 'compass',
    },
    Chat: {
      icon: 'chat-outline',
      focusedIcon: 'chat',
    },
    Profile: {
      icon: 'account-circle-outline',
      focusedIcon: 'account-circle',
    },
  }

const { height } = Dimensions.get('window')

function BottomNav() {
  const Tab = createMaterialBottomTabNavigator<ScreenPropsMap>()

  const iconRenderer = useCallback(
    (screenName: string, focused: boolean, color: string): ReactNode => {
      return (
        <Icon
          source={
            focused
              ? iconMap[screenName]?.focusedIcon
              : iconMap[screenName]?.icon
          }
          color={color}
          size={25}
        />
      )
    },
    [],
  )

  return (
    <View height={height}>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: '지도',
            tabBarIcon: ({ focused, color }) =>
              iconRenderer('Home', focused, color),
          }}
        />
        <Tab.Screen
          name='Social'
          component={SocialScreen}
          options={{
            title: '소셜',
            tabBarIcon: ({ focused, color }) =>
              iconRenderer('Social', focused, color),
          }}
          initialParams={{ expeditionFilter: initialExpeditionFilter }}
        />
        <Tab.Screen
          name='Record'
          component={RecordScreen}
          options={{
            title: '탐험',
            tabBarIcon: ({ focused, color }) =>
              iconRenderer('Record', focused, color),
          }}
        />
        <Tab.Screen
          name='Map'
          component={MapScreen}
          options={{
            title: '채팅',
            tabBarIcon: ({ focused, color }) =>
              iconRenderer('Chat', focused, color),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            title: '나',
            tabBarIcon: ({ focused, color }) =>
              iconRenderer('Profile', focused, color),
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default BottomNav
