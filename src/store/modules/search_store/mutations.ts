import cloneDeep from 'lodash/cloneDeep'
import { preferences, searchBoxTO, searchBoxRS } from './index'
import { StoreTypes } from '~/types/storeTypes'

export default {
  setStoreId(state, id: number) {
    state.storeId = id
  },
  // 帰ってきたresを保存
  setSearchResult(state, data: StoreTypes.StoreResult) {
    state.storeResult = data
  },
  setPreference(state, data: StoreTypes.Preference) {
    state.preferences = data
  },
  setSearchTO(state, data) {
    Object.assign(state.searchBoxTO, data)
  },
  setSearchRS(state, data) {
    Object.assign(state.searchBoxRS, data)
  },
  resetSearchResult(state) {
    state.storeResult = ''
  },
  resetPreference(state) {
    state.preferences = cloneDeep(preferences)
  },
  resetSearchTO(state) {
    state.searchBoxTO = cloneDeep(searchBoxTO)
  },
  resetSearchRS(state) {
    state.searchBoxRS = cloneDeep(searchBoxRS)
  },
  setWhenever(state, val: boolean) {
    state.whenever = val
  }
}
