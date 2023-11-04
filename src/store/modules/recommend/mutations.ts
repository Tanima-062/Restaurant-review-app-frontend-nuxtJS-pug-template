import { RecommendTypes } from '~/types/recommendTypes'
export default {
  setRecommendTO(state, data: RecommendTypes.ListTypesTO) {
    state.recommendTO = data
  },
  setRecommendRS(state, data: RecommendTypes.ListTypesRS) {
    state.recommendRS = data
  }
}
