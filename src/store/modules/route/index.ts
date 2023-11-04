import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  beforeURL: ''
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
