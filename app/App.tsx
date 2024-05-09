import React from 'react'
import Router from './screens/Router.tsx'
import { PaperProvider } from 'react-native-paper'

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  )
}

export default App
