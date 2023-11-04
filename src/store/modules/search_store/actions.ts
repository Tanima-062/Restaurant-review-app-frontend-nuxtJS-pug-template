import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL

export default {
  setStoreId({ commit }, id) {
    commit('setStoreId', id)
  },
  // 検索用のaction
  storeSearch({ commit }, searchData) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/gourmet/v1/ja/store/search',
        params: searchData
      })
        .then((res) => {
          commit('setSearchResult', res.data)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  async fetchPreference({ commit }) {
    commit('resetPreference')
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/genre/b-detailed',
      params: { lowerLevel: 2 }
    }).then((res) => {
      commit('setPreference', res.data)
    })
  },
  setSearchBoxTO({ commit }, box) {
    commit('setSearchTO', box)
  },
  setSearchBoxRS({ commit }, box) {
    commit('setSearchRS', box)
  },
  resetStoreSearch({ commit }) {
    commit('resetSearchResult')
  },
  resetSearchBoxTO({ commit }) {
    commit('resetSearchTO')
  },
  resetSearchBoxRS({ commit }) {
    commit('resetSearchRS')
  },
  setWhenever({ commit }, val) {
    commit('setWhenever', val)
  }
}
