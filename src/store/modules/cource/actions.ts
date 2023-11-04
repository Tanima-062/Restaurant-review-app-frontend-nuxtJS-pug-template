import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL

export default {
  async GetCource({ commit }, { planId, ...sendData }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/restaurant/menu/' + planId,
      params: sendData
    })
      .then((res) => {
        commit('setCource', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
