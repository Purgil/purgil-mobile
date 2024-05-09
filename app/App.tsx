import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return <SafeAreaView style={backgroundStyle} />
}

export default App
