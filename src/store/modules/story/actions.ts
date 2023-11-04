import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async InitAmpsTO({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/story'
    })
      .then((res) => {
        commit('setAmpsTO', res.data)
      })
      .catch(async (err) => {
        console.log(process.browser)
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
  async InitAmpsRS({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/restaurant/story'
    })
      .then((res) => {
        commit('setAmpsRS', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
