import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  // defaultで0、reservationHeaderで1
  // 今後増える可能性も0ではないのでbooleanで定義はしないておく
  headerInfo: {
    layoutType: 0,
    returnPath: '',
    headerTitle: ''
  }
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
