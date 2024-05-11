import { combineReducers } from '@reduxjs/toolkit'
import colorModeSlice from './slices/colorMode.slice.ts'
import authUserSlice from './slices/authUser.slice.ts'

const rootReducer = combineReducers({
  colorMode: colorModeSlice,
  authUser: authUserSlice,
})

export default rootReducer
