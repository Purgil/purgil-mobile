import React from 'react'
import Router from './router'
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DefaultDarkTheme,
  PaperProvider,
} from 'react-native-paper'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useColorScheme } from 'react-native'
import { darkColors, lightColors } from '~/theme.ts'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  const defaultTheme = isDarkMode ? DefaultDarkTheme : DefaultTheme
  const colors = isDarkMode ? darkColors : lightColors

  const theme = {
    ...defaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...defaultTheme.colors,
      ...colors,
    },
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <Router />
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

export default App
