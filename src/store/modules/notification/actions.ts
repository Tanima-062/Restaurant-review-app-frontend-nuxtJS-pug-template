import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  // Take out
  async InitNotificationTO({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/notice'
    })
      .then((res) => {
        commit('setNotificationTO', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // Restaurant
  async InitNotificationRS({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/restaurant/notice'
    })
      .then((res) => {
        commit('setNotificationRS', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
