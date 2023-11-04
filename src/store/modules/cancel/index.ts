import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  cancelPrice: {
    status: false,
    message: '',
    cancelPrice: 0,
    refundPrice: 0
  },
  cancelStatus: {
    status: false,
    message: ''
  },
  cancelPolicy: []
})
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
