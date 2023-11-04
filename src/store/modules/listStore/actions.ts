import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async InitReview({ commit }, id) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/store/' + id + '/review'
    })
      .then((res) => {
        commit('setReview', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async InitImage({ commit }, id) {
    commit('resetImage')
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/store/' + id + '/image'
    })
      .then((res) => {
        commit('setImage', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async InitTakeoutMenu({ commit }, databox) {
    commit('resetTakeout')
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/store/' + databox.id + '/takeoutMenu',
      params: { pickUpDate: databox.pickUpDate, pickUpTime: databox.pickUpTime }
    })
      .then((res) => {
        commit('setTakeout', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async InitStore({ commit }, id) {
    commit('resetStore')
    await axios({
      method: 'get',
      withCredentials: true,
      url: '/gourmet/v1/ja/store/' + id
    })
      .then((res) => {
        commit('setStore', res.data)
      })
      .catch((err) => {
        location.href = '/gourmet/takeout'
        console.log(err)
      })
  },
  async saveDistance({ commit }, distances) {
    await commit('setDistance', distances)
  },
  async ImageDetail({ commit }, data) {
    await commit('setImageDetail', data)
  },
  setIsFavorite({ commit }) {
    commit('setIsFavorite')
  },
  setIsNotFavorite({ commit }) {
    commit('setIsNotFavorite')
  }
}
