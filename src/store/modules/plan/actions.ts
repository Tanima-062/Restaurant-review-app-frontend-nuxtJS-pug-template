import axios from 'axios'
import pick from 'lodash/pick'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async InitPlan({ commit }, { id, ...dataBox }) {
    const sendData = dataBox.dateUndecided ? pick(dataBox, ['visitDate', 'dateUndecided']) : dataBox
    await axios({
      method: 'get',
      url: `gourmet/v1/ja/store/${id}/restaurantMenu`,
      params: sendData
    })
      .then((res) => {
        commit('setPlan', res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  ResetPlan({ commit }) {
    commit('resetPlan')
  }
}
