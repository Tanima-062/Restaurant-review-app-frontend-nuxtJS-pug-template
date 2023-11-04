import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ({
  cource: {
    id: 0,
    name: '',
    description: '',
    image: {
      id: 0,
      imageCd: '',
      imageUrl: ''
    },
    price: {
      id: 0,
      priceCd: 'NORMAL',
      price: 0
    },
    numberOfCourse: 0,
    availableNumberOfLowerLimit: 0,
    availableNumberOfUpperLimit: 0,
    freeDrinks: true,
    options: [
      {
        id: 0,
        optionCd: '',
        required: true,
        keywordId: 0,
        keyword: '',
        contentsId: 0,
        contents: '',
        price: 0
      }
    ],
    plan: '',
    reviews: [
      {
        id: 0,
        userId: 0,
        username: '',
        body: '',
        evaluationCd: '',
        image: {
          id: 0,
          imageCd: '',
          imageUrl: ''
        }
      }
    ],
    result: {},
    providedTime: 0,
    onlySeat: false,
    notes: ''
  }
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
