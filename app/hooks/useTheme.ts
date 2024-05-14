import { useColorScheme } from 'react-native'
import { useMemo } from 'react'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

function useTheme() {
  const isDarkMode = useColorScheme() === 'dark'
  const theme = useMemo(
    () => (isDarkMode ? MD3DarkTheme : MD3LightTheme),
    [isDarkMode],
  )
  return {
    isDarkMode,
    theme,
  }
}

export default useTheme
