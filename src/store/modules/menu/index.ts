import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  TakeoutMenu: {
    id: 0,
    name: '',
    description: '',
    appCd: '',
    salesStartTime: '',
    salesEndTime: '',
    stockNumber: '',
    menuImage: {
      id: 0,
      imageCd: '',
      imageUrl: ''
    },
    menuPrice: {
      id: 0,
      priceCd: '',
      price: 0
    },
    store: {
      id: 0,
      name: '',
      latitude: 0,
      longitude: 0,
      storeGenres: [],
      evaluations: [],
      station: {
        id: 0,
        name: '',
        latitude: 0,
        longitude: 0
      }
    },
    options: {
      id: 1,
      optionCd: '',
      required: false,
      keywordId: 0,
      keyword: '',
      contentsId: '',
      contents: '',
      price: ''
    },
    status: {
      canSale: false,
      message: ''
    }
  }
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
