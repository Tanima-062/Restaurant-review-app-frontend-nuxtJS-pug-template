import cloneDeep from 'lodash/cloneDeep'
import { Store } from './index'
import { StoreTypes } from '~/types/storeTypes'
import { ListStoreTypes } from '~/types/ListStoreTypes'

export default {
  setNotification(state, data) {
    state.Notification = data
  },
  setReview(state, data) {
    state.Review = data
  },
  setImage(state, data) {
    state.Image = data
  },
  setTakeout(state, data) {
    state.TakeoutMenu = data
  },
  setStore(state, data: StoreTypes.StoreDetail) {
    state.Store = data
  },
  resetNotification(state) {
    state.Notification = {}
  },
  resetImage(state) {
    state.Image = []
  },
  resetStore(state) {
    state.Store = cloneDeep(Store)
  },
  resetTakeout(state) {
    state.TakeoutMenu = []
  },
  setDistance(state, data) {
    state.distance = data
  },
  setImageDetail(state, data: ListStoreTypes.MenuTypes) {
    state.menuDetail = data
  },
  setIsFavorite(state) {
    state.Store.isFavorite = true
  },
  setIsNotFavorite(state) {
    state.Store.isFavorite = false
  }
}
