import React from 'react'
import Router from './navigation'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
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
