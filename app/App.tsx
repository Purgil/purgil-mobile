import React from 'react'
import Router from './navigation'
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DefaultDarkTheme,
  PaperProvider,
} from 'react-native-paper'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useColorScheme } from 'react-native'
import { MD3Colors } from 'react-native-paper/src/styles/themes/v3/tokens.tsx'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const defaultTheme = isDarkMode ? DefaultDarkTheme : DefaultTheme

  const darkColors = {
    primary: '#A9D292',
    surfaceTint: '#A9D292',
    onPrimary: '#163808',
    primaryContainer: '#2C4F1D',
    onPrimaryContainer: '#C4EFAC',
    secondary: '#BCCBB0',
    onSecondary: '#273421',
    secondaryContainer: '#3E4B36',
    onSecondaryContainer: '#D8E7CB',
    tertiary: '#A0CFD0',
    onTertiary: '#003738',
    tertiaryContainer: '#1E4E4F',
    onTertiaryContainer: '#BBEBEC',
    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',
    background: '#11140F',
    onBackground: '#E1E4D9',
    surface: '#11140F',
    onSurface: '#E1E4D9',
    surfaceVariant: '#43483E',
    onSurfaceVariant: '#C3C8BB',
    outline: '#8D9287',
    outlineVariant: '#43483E',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E1E4D9',
    inverseOnSurface: '#2E312B',
    inversePrimary: '#436833',
    primaryFixed: '#C4EFAC',
    onPrimaryFixed: '#062100',
    primaryFixedDim: '#A9D292',
    onPrimaryFixedVariant: '#2C4F1D',
    secondaryFixed: '#D8E7CB',
    onSecondaryFixed: '#131F0D',
    secondaryFixedDim: '#BCCBB0',
    onSecondaryFixedVariant: '#3E4B36',
    tertiaryFixed: '#BBEBEC',
    onTertiaryFixed: '#002021',
    tertiaryFixedDim: '#A0CFD0',
    onTertiaryFixedVariant: '#1E4E4F',
    backdrop: '#11140F',
    elevation: {
      level0: '#373A33',
      level1: '#0C0F0A',
      level2: '#191D17',
      level3: '#1D211A',
      level4: '#282B24',
      level5: '#32362F',
    },
  }

  const lightColors = {
    primary: '#436833',
    surfaceTint: '#436833',
    onPrimary: '#FFFFFF',
    primaryContainer: '#C4EFAC',
    onPrimaryContainer: '#062100',
    secondary: '#55624C',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D8E7CB',
    onSecondaryContainer: '#131F0D',
    tertiary: '#386667',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#BBEBEC',
    onTertiaryContainer: '#002021',
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#410002',
    background: '#F8FAF0',
    onBackground: '#191D17',
    surface: '#F8FAF0',
    onSurface: '#191D17',
    surfaceVariant: '#DFE4D7',
    onSurfaceVariant: '#43483E',
    outline: '#73796D',
    outlineVariant: '#C3C8BB',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#2E312B',
    inverseOnSurface: '#EFF2E7',
    inversePrimary: '#A9D292',
    primaryFixed: '#C4EFAC',
    onPrimaryFixed: '#062100',
    primaryFixedDim: '#A9D292',
    onPrimaryFixedVariant: '#2C4F1D',
    secondaryFixed: '#D8E7CB',
    onSecondaryFixed: '#131F0D',
    secondaryFixedDim: '#BCCBB0',
    onSecondaryFixedVariant: '#3E4B36',
    tertiaryFixed: '#BBEBEC',
    onTertiaryFixed: '#002021',
    tertiaryFixedDim: '#A0CFD0',
    onTertiaryFixedVariant: '#1E4E4F',
    backdrop: '#D9DBD1',
    elevation: {
      level0: '#F8FAF0',
      level1: '#FFFFFF',
      level2: '#F2F5EA',
      level3: '#EDEFE5',
      level4: '#E7E9DF',
      level5: '#E1E4D9',
    },
  }

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
            <BottomSheetModalProvider>
              <Router />
            </BottomSheetModalProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

export default App
