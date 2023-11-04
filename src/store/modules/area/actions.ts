import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async AreaSearch({ commit }, code) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/area/' + code
    })
      .then((res) => {
        commit('setSelectAreas', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async AreaSearchSmall({ commit }, code) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/area/' + code
    })
      .then((res) => {
        commit('setSelectAreasSmall', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async ResetArea({ commit }) {
    await commit('ResetArea')
  },
  async AreaResearch({ commit }, areaInfo) {
    await commit('setAreaInfo', areaInfo)
  },
  resetAreaInfo({ commit }) {
    commit('resetAreaInfo')
  },
  async SearchBoxTO({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/searchBox'
    })
      .then((res) => {
        commit('setSearchBoxTO', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async SearchBoxRS({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/restaurant/searchBox'
    })
      .then((res) => {
        commit('setSearchBoxRS', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
