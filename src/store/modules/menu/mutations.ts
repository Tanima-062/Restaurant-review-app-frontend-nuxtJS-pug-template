import { MenuTypes } from '~/types/menuTypes'
export default {
  setTakeoutMenu(state, data: MenuTypes.TakeoutMenuTypes) {
    state.TakeoutMenu = { ...data }
  },
  setIsFavorite(state) {
    state.TakeoutMenu.isFavorite = true
  },
  setIsNotFavorite(state) {
    state.TakeoutMenu.isFavorite = false
  }
}
