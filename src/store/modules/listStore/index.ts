import cloneDeep from 'lodash/cloneDeep'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { StoreTypes } from '~/types/storeTypes'

export const Store: StoreTypes.StoreDetail = {
  storeGenres: [
    {
      id: 0,
      name: '',
      genreCd: '',
      appCd: '',
      path: ''
    }
  ],
  topImages: {
    id: 0,
    imageCd: '',
    imageUrl: ''
  },
  openingHours: {
    id: 0,
    name: '',
    openTime: '',
    closeTime: ''
  },
  station: {
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0
  },
  evaluation: {
    evaluationCd: '',
    percentage: ''
  },
  id: 0,
  name: '',
  address: '',
  postalCode: '',
  tel: '',
  latitude: 0,
  longitude: 0,
  email_1: '',
  daytimeBudgetLowerLimit: 0,
  daytimeBudgetLimit: 0,
  access: '',
  account: '',
  remarks: '',
  description: '',
  fax: '',
  userFax: '',
  reservationNecessity: '',
  regularHoliday: '',
  nightBudgetLowerLimit: '',
  nightBudgetLimit: '',
  canCardL: false,
  cardTypes: '',
  canDigitalMoney: '',
  digitalMoneyTypes: '',
  hasPrivateRoom: false,
  privateRoomTypes: '',
  hasParking: false,
  numberOfSeats: 0,
  canCharter: false,
  charterTypes: '',
  smoking: false,
  smokingTypes: '',
  isFavorite: false
}

export const state = () => ({
  Review: [],
  Image: [],
  TakeoutMenu: [],
  distance: '',
  menuDetail: {},
  Store: cloneDeep(Store)
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
