import { MenuTypes } from '~/types/menuTypes'
export default {
  getTakeoutMenu: (state): MenuTypes.TakeoutMenuTypes => state.TakeoutMenu,
  getStoreId: (state): number => state.TakeoutMenu.store.id
}
