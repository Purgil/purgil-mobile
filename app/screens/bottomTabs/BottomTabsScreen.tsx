import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import HomeScreen from '../home/HomeScreen.tsx'
import RecordScreen from '../record/RecordScreen.tsx'
import MapScreen from '../map/MapScreen.tsx'
import SocialScreen from '../social/SocialScreen.tsx'
import { StackParamList } from '../Router.tsx'
import ProfileScreen from '../profile/ProfileScreen.tsx'

function BottomTabsScreen() {
  const Tab = createMaterialBottomTabNavigator<StackParamList>()
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#f0edf6'
      inactiveColor='#3e2465'
      barStyle={{}}>
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

export default BottomTabsScreen
