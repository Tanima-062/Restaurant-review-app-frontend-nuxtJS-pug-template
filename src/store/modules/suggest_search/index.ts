import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  searchboxSituation: {
    suggestText: '',
    pickUpDate: '',
    pickUpTime: '',
    cookingCategoryCd: '',
    menuGenreCd: '',
    page: 0,
    suggestCd: ''
  },
  searchCondition: {
    cookingGenreCd: '',
    menuGenreCd: '',
    suggestCd: '',
    suggestText: '',
    visitDate: '',
    visitTime: '',
    visitPeople: null,
    page: null,
    latitude: null,
    longitude: null,
    appCd: '',
    lowerPrice: null,
    upperPrice: null
  },
  resSearch: {
    genres: [],
    menus: [],
    page: 1,
    pageMax: 15,
    sumCount: 0
  },
  resSearchLevel2: {
    genres: [],
    menus: [],
    page: 1,
    pageMax: 15,
    sumCount: 0
  },
  resSearchLevel3: {
    genres: [],
    menus: [],
    page: 1,
    pageMax: 15,
    sumCount: 0
  },
  allmenus: [
    {
      id: 0,
      name: '',
      description: '',
      thumbImage: [
        {
          id: 0,
          imageCd: '',
          imageUrl: ''
        }
      ],
      price: {
        id: 0,
        priceCd: '',
        price: 0
      },
      store: {
        id: 0,
        name: '',
        latitude: 0,
        logitude: 0,
        station: {
          id: 0,
          name: '',
          latitude: 0,
          logitude: 0,
          distance: 0
        },
        distance: 0
      }
    }
  ],
  suggestCd: '',
  page: '',
  suggestList: '',
  genreList: [],
  genreListChild: [],
  genreFromList: {
    bigName: '',
    bigGenre: '',
    smallGenre: '',
    smallName: ''
  },
  areaFromList: {
    areaCd: '',
    id: 0,
    level: 0,
    name: '',
    path: ''
  },
  selected: '',
  suggestText: '',
  suggestTextData: '',
  popularcommit: []
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
