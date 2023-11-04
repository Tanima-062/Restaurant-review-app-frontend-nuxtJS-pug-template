import cloneDeep from 'lodash/cloneDeep'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { StoreTypes } from '~/types/storeTypes'

const storeResult: StoreTypes.StoreResult = {
  stores: {
    id: 0,
    name: '',
    access: '',
    daytimeBudgetLowerLimit: 0,
    nightBudgetLowerLimit: 0,
    latitude: 0,
    longitude: 0,
    storeGenres: [
      {
        id: 0,
        name: '',
        genreCd: '',
        appCd: '',
        path: ''
      }
    ],
    storeImage: [
      {
        id: 0,
        imageCd: '',
        imageUrl: ''
      }
    ],
    recommendMenu: {
      id: 0,
      name: '',
      price: {
        id: 0,
        priceCd: '',
        price: 0
      }
    },
    distance: 0,
    openinghours: [
      {
        id: 0,
        name: '',
        openTime: '',
        closeTime: '',
        code: '',
        lastOrderTime: '',
        week: ''
      }
    ]
  },
  sumCount: 0,
  page: 0,
  pageMax: 0
}

export const preferences: StoreTypes.Preference = { genres: [] }

export const searchBoxTO: StoreTypes.SearchBox = {
  suggestCd: '',
  suggestText: '',
  suggestTextName: '',
  cookingGenreCd: '',
  cookingGenreCdName: '',
  menuGenreCd: '',
  menuGenreCdName: '',
  latitude: null,
  longitude: null,
  page: null,
  appCd: 'TO'
}
export const searchBoxRS: StoreTypes.SearchBoxRS = {
  suggestCd: '',
  suggestText: '',
  suggestTextName: '',
  visitDate: '',
  visitTime: '',
  visitPeople: 0,
  cookingGenreCd: '',
  cookingGenreCdName: '',
  menuGenreCd: '',
  menuGenreCdName: '',
  latitude: null,
  longitude: null,
  page: null,
  appCd: 'RS',
  lowerPrice: null,
  upperPrice: null,
  details: '',
  zone: 1
}

export const state = () => ({
  storeId: 0,
  searchBoxTO: cloneDeep(searchBoxTO),
  searchBoxRS: cloneDeep(searchBoxRS),
  storeResult: cloneDeep(storeResult),
  preferences: cloneDeep(preferences),
  whenever: false
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
