import { GetterTree } from 'vuex/types/index'
import { HotelRestaurantState } from '~/types/hotelRestaurantTypes'

const getters: GetterTree<HotelRestaurantState, HotelRestaurantState> = {
  getHotelRestaurantList: (state) => ({ ...state.hotelRestaurantList }),
  getRecommendHotelRestaurantList: (state) => ({ ...state.recommendHotelRestaurantList })
}

export default getters
