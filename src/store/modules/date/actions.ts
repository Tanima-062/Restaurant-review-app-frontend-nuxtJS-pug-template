import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  dateSetAction({ commit }, data) {
    commit('dateSet', data)
  },
  hourSetAction({ commit }, data) {
    commit('hourSet', data)
  },
  minSetAction({ commit }, data) {
    commit('minSet', data)
  },
  timeSetAction({ commit }, data) {
    commit('timeSet', data)
  },
  async setHoliday({ commit }, year) {
    await axios({
      method: 'get',
      url: `https://holidays-jp.github.io/api/v1/${year}/date.json`
    })
      .then((res) => {
        commit('setHoliday', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
