import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { HotelRestaurantState } from '~/types/hotelRestaurantTypes'

export const state = (): HotelRestaurantState => ({
  hotelRestaurantList: {},
  recommendHotelRestaurantList: {}
})
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
