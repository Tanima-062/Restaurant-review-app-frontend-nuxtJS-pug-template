import { MutationTree } from 'vuex/types/index'
import { HotelRestaurantState } from '~/types/hotelRestaurantTypes'

const mutations: MutationTree<HotelRestaurantState> = {
  setHotelRestaurant(state, data) {
    state.hotelRestaurantList = Object.assign({ ...state.hotelRestaurantList }, { [data.id]: data.hotelRestaurantInfo })
  },
  setHotelRestaurantList(state, data) {
    state.hotelRestaurantList = { ...data }
  },
  setRecommendHotelRestaurant(state, data) {
    state.recommendHotelRestaurantList = Object.assign(
      { ...state.recommendHotelRestaurantList },
      { [data.id]: data.recommendHotelRestaurantInfo }
    )
  },
  setRecommendHotelRestaurantList(state, data) {
    state.recommendHotelRestaurantList = { ...data }
  }
}

export default mutations
