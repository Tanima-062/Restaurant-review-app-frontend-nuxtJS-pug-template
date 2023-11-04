import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async InitRecommendTO({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/recommend'
    })
      .then((res) => {
        commit('setRecommendTO', res.data)
      })
      .catch(async (err) => {
        if (!process.browser) {
          await axios({
            method: 'post',
            url: 'http://0.0.0.0:3000/api/error',
            data: {
              message: `[code]: ${err.response && err.response.status} [path]: ${
                process.env.BASE_URL + (err.response && err.response.request.path)
              } [message]: ${err.response && err.response.data && err.response.data.message}`
            }
          })
        }
      })
  },
  async InitRecommendRS({ commit }, { areaCd = null, stationCd = null } = {}) {
    if (areaCd || stationCd) {
      const param = areaCd ? { areaCd } : { stationCd }
      await axios({
        method: 'get',
        url: '/gourmet/v1/ja/restaurant/recommend',
        params: param
      })
        .then((res) => {
          commit('setRecommendRS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await axios({
        method: 'get',
        url: '/gourmet/v1/ja/restaurant/recommend'
      })
        .then((res) => {
          commit('setRecommendRS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
