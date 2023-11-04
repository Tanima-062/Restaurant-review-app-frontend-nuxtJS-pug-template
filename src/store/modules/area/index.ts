import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  SelectArea: [],
  SelectAreaSmall: [],
  AreaInfo: [],
  AreaInfoFromList: {
    id: 0,
    name: '',
    areaCd: '',
    level: ''
  },
  ResetArea: {},
  SearchboxTO: {
    id: 0,
    name: '',
    areaCd: '',
    path: '',
    level: 0,
    weight: 0
  },
  SearchboxRS: {
    id: 0,
    name: '',
    areaCd: '',
    path: '',
    level: 0,
    weight: 0
  },
  Rename: {}
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
