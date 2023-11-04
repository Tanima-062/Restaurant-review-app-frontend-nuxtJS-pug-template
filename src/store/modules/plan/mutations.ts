import { RestaurantType } from '~/types/restaurantTypes'
export default {
  setPlan(state, data: RestaurantType.RestaurantPlanStatus) {
    state.result = data
  },
  resetPlan(state) {
    state.result = ''
  }
}
