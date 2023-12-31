import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  UserInfo: {},
  location: {}
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
