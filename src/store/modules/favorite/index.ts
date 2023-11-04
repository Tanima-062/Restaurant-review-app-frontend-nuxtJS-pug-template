import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  LocalFavorite: [],
  LocalRestaurantFavorite: [],
  FavoriteTakeout: {
    id: 0,
    name: '',
    description: '',
    serviceCd: '',
    salesStartTime: '',
    salesEndTime: '',
    stockNumber: 0,
    menuImages: '',
    menuPrice: ''
  },
  FavoriteRestaurant: {
    id: 0,
    name: '',
    description: '',
    serviceCd: '',
    salesStartTime: '',
    salesEndTime: '',
    stockNumber: 0,
    menuImages: '',
    menuPrice: ''
  },
  takeoutMenus: [],
  restaurants: [],
  registrationResponse: {}
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
