import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root.reducer.ts'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig: PersistConfig<RootState> = {
  key: 'root', // 식별자 입니다
  // persist store의 storage로 AsyncStorage를 이용하겠습니다.
  storage: AsyncStorage,
  whitelist: ['colorMode', 'authUser'], // persist store에 저장 할 reducer들
  blacklist: [], // persist store에 저장하지 않을 reducer들
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
