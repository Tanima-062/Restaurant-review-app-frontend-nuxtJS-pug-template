import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = process.env.BASE_URL

export default {
  async getTakeoutMenu({ commit }, param: { id: number; query: { pickUpDate: string; pickUpTime: string } }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/menu/' + param.id + '?' + qs.stringify(param.query),
      withCredentials: true
    })
      .then((res) => {
        commit('setTakeoutMenu', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  resetTakeoutMenu({ commit }) {
    commit('resetTakeoutMenu')
  },
  setIsFavorite({ commit }) {
    commit('setIsFavorite')
  },
  setIsNotFavorite({ commit }) {
    commit('setIsNotFavorite')
  }
}
