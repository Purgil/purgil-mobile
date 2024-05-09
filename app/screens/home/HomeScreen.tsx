import AuthScreen from '../auth/AuthScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import { StackParamList } from '../Router.tsx'
import LoginScreen from '../login/LoginScreen.tsx'
import RegisterScreen from '../register/RegisterScreen.tsx'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'

function MainScreen() {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator>
      <Tab.Screen name='Login' component={LoginScreen} />
      <Tab.Screen name='Settings' component={AuthScreen} />
    </Tab.Navigator>
  )
}

export default MainScreen
