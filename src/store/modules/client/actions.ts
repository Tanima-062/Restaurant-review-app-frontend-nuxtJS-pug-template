import axios from 'axios'
import { gourmetClientTypes } from '~/types/gourmetClientTypes'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  InClientInfo(
    { commit },
    {
      key,
      value
    }: {
      key: keyof gourmetClientTypes.ClientTypes
      value: gourmetClientTypes.ClientTypes[keyof gourmetClientTypes.ClientTypes]
    }
  ) {
    commit('setClientInfo', { key, value })
  },
  InClientChecked({ commit }, flag) {
    commit('setClientChecked', flag)
  },
  async LoginClientForm({ state, commit }) {
    let flag = false
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/dish-up/login',
      data: state.ClientInfo,
      withCredentials: true
    })
      .then((res) => {
        flag = true
        commit('setClientLoginedInfo', res.data)
        sessionStorage.setItem('rememberToken', res.data.rememberToken)
      })
      .catch((err) => {
        console.log(err)
        commit('resetClientLoginList')
      })
    return flag
  },
  async getClientData({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/dish-up/login',
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rememberToken')
      }
    })
      .then((res) => {
        commit('setClientLoginedInfo', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  removeClientData({ commit }) {
    commit('resetClientData')
  },
  async logoutClient({ state, commit }) {
    const datas = { userName: state.ClientLoginInfo.userName }
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/dish-up/logout',
      withCredentials: true,
      data: datas,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rememberToken')
      }
    })
      .then((res) => {
        commit('setLogoutStatus', res.data)
        commit('resetClientLoginList')
        commit('resetClientData')
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getListTodayData({ commit }, date) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/dish-up/list',
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rememberToken')
      },
      params: { reservationDate: date }
    })
      .then((res) => {
        commit('setListTodayData', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getListTomorrowData({ commit }, date) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/dish-up/list',
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rememberToken')
      },
      params: { reservationDate: date }
    })
      .then((res) => {
        commit('setListTomorrowData', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  removeList({ commit }) {
    commit('resetList')
  },
  async startCooking({ commit }, data) {
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/dish-up/startCooking',
      withCredentials: true,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('rememberToken')
      },
      data: { reservationId: data }
    })
      .then((res) => {
        const databox = {
          id: data,
          status: res.data.status
        }
        commit('setCookingTodayStatus', databox)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async setTime({ commit }, databox) {
    await commit('setTimes', databox)
  }
}
