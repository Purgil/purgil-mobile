import React from 'react'
import Router from './router'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
