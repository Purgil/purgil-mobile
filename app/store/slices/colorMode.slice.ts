import { createSlice } from '@reduxjs/toolkit'
import { COLORMODES } from '@gluestack-style/react/lib/typescript/types'

const initialState: { value: COLORMODES } = { value: 'dark' }

export const ColorModeSlice = createSlice({
  name: 'colorMode',
  initialState,
  reducers: {
    /* colorMode 를 변경 합니다 */
    setColorMode(state, action) {
      state.value = action.payload
    },
  },
})

export const { setColorMode } = ColorModeSlice.actions
export default ColorModeSlice.reducer
