import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  NotificationTO: {
    notices: [
      {
        id: 0,
        title: '',
        message: '',
        datetimeFrom: '',
        datetimeTo: '',
        publishedAt: '',
        updateAt: ''
      }
    ]
  },
  NotificationRS: {
    notices: [
      {
        id: 0,
        title: '',
        message: '',
        datetimeFrom: '',
        datetimeTo: '',
        publishedAt: '',
        updateAt: ''
      }
    ]
  }
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
