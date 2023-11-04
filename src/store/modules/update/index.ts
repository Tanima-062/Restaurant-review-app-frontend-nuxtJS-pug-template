import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  changeInfo: {
    date: '',
    time: '',
    persons: 0,
    request: '',
    reservationOptions: [] // オプションが追加された時ように一旦残し
  },
  changedResult: {
    status: false,
    message: '',
    returnUrl: '',
    isOnlySeat: false
  },
  vacancyInfo: []
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
