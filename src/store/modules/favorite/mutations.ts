export default {
  setLocalFavorite(state, id: number) {
    state.LocalFavorite.push(id)
  },
  setLocalRestaurantFavorite(state, id: number) {
    state.LocalRestaurantFavorite.push(id)
  },
  removeLocalFavorite(state, id: number) {
    state.LocalFavorite = state.LocalFavorite.filter((n) => n !== id)
  },
  removeLocalRestaurantFavorite(state, id: number) {
    state.LocalRestaurantFavorite = state.LocalRestaurantFavorite.filter((n) => n !== id)
  },
  setTakeoutMenus(state, data) {
    state.takeoutMenus = data
  },
  setRegistResult(state, data) {
    state.registrationResponse = data
  },
  setRestaurant(state, data) {
    state.restaurants = data
  },
  removeFavorite(state, id: number) {
    state.takeoutMenus.takeoutMenus = state.takeoutMenus.takeoutMenus.filter((n) => n.id !== id)
  },
  removeRestaurant(state, id: number) {
    state.restaurants.restorantStores = state.restaurants.restorantStores.filter((n) => n.id !== id)
  }
}
