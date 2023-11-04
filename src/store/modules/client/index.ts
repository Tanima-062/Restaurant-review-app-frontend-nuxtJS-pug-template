import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  ClientInfo: {},
  ClientLoginInfo: {},
  ClientTodayList: [],
  ClientTomorrowList: [],
  ClientLogoutStatus: { status: false }
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
