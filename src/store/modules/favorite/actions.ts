import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async RegistFavorite({ commit }, sendData) {
    if (sendData.judge === true) {
      // ログイン時
      await axios({
        method: 'post',
        url: '/gourmet/v1/ja/favorite/register',
        withCredentials: true,
        data: { id: sendData.id, appCd: sendData.appCd }
      })
        .then((res) => {
          commit('setRegistResult', res.data)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
      // 非ログイン時
    } else if (sendData.appCd === 'RS') {
      await commit('setLocalRestaurantFavorite', sendData.id)
    } else {
      await commit('setLocalFavorite', sendData.id)
    }
  },
  async DeleteFavorite({ commit }, sendData) {
    if (sendData.judge === true) {
      // ログイン時
      await axios({
        method: 'post',
        url: '/gourmet/v1/ja/favorite/delete',
        withCredentials: true,
        data: { id: sendData.id, appCd: sendData.appCd }
      })
        .then(() => {
          // console.log('お気に入りを削除しました')
        })
        .catch((err) => {
          return Promise.reject(err)
        })
      // 非ログイン時
    } else if (sendData.appCd === 'RS') {
      await commit('removeLocalRestaurantFavorite', sendData.id)
    } else {
      await commit('removeLocalFavorite', sendData.id)
    }
  },
  async IndexFavorite({ commit }, databox) {
    // 参照
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/favorite/',
      withCredentials: true,
      params: databox
    })
      .then((res) => {
        commit('setTakeoutMenus', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async IndexRestaurantFavorite({ commit }, databox) {
    // 参照
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/favorite/',
      withCredentials: true,
      params: databox
    })
      .then((res) => {
        commit('setRestaurant', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  removeMenus({ commit }, id) {
    commit('removeFavorite', id)
  },
  removeRestaurant({ commit }, id) {
    commit('removeRestaurant', id)
  }
}
