import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async LoginForm({ commit }, val) {
    let flag = false
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/auth/login',
      withCredentials: true,
      data: val
    })
      .then((res) => {
        flag = true
        commit('setUserInfo', res.data)
        sessionStorage.setItem('apiToken', res.data.apiToken)
      })
      .catch(() => {
        flag = false
      })
    return flag
  },
  async getUserData({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/auth/login',
      withCredentials: true
    })
      .then((res) => {
        commit('setUserInfo', res.data)
      })
      .catch(() => {
        commit('resetUserData')
      })
  },
  resetUserData({ commit }) {
    commit('resetUserData')
  },
  async logoutUser({ commit }) {
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/auth/logout',
      withCredentials: true
    }).then(() => {
      commit('resetUserData')
    })
  },
  setLocation({ commit }, data) {
    commit('setLocation', data)
  },
  resetLocation({ commit }) {
    commit('resetLocation')
  }
}
