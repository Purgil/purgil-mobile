import { createSlice } from '@reduxjs/toolkit'
import { Gender } from '~/enums/common.enums.ts'

export type AuthUser = {
  email: string
  nickname: string
  phoneNum?: string
  gender?: Gender
  age?: number
}

const initialState: { value?: AuthUser } = {
  value: undefined,
}

export const AuthUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    /* 인증 사용자 정보를 설정합니다  */
    login(state, action: { payload: AuthUser }) {
      state.value = action.payload
    },
    /* 인증 사용자 정보를 제거합니다 */
    logout(state) {
      state.value = undefined
    },
  },
})

export const { login, logout } = AuthUserSlice.actions
export default AuthUserSlice.reducer
