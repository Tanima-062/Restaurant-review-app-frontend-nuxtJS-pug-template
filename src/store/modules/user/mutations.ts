import { LoginUserTypes } from '~/types/LoginUserTypes'
export default {
  setUserInfo(state, data: LoginUserTypes.UserTypes) {
    state.UserInfo = { ...data }
  },
  resetUserData(state) {
    state.UserInfo = {}
  },
  setLocation(state, data: LoginUserTypes.LocationTypes) {
    state.location = { ...data }
  },
  resetLocation(state) {
    state.location = {}
  }
}
