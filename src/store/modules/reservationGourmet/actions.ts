import axios from 'axios'
import { gourmetReservationTypes } from '~/types/gourmetReservationTypes'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  InReservationInfo(
    { commit },
    {
      key,
      value
    }: {
      key: keyof gourmetReservationTypes.ReservationTypes
      value: gourmetReservationTypes.ReservationTypes[keyof gourmetReservationTypes.ReservationTypes]
    }
  ) {
    commit('setReservationInfo', { key, value })
  },
  setAllUserInfo({ commit }, loginData: gourmetReservationTypes.ReservationTypes) {
    commit('setAllUserInfo', loginData)
  },
  // レストラン情報初期化
  resetReservation({ commit }) {
    commit('resetReservation')
  },
  // Take Out reservation
  async reservationSaveTO({ commit, state }) {
    await commit('removePayments')
    const datas = {
      customer: state.ReservationInfo,
      application: state.applicationTO,
      payment: state.payment
    }
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/takeout/reservation/save',
      data: datas,
      withCredentials: true
    })
      .then((res) => {
        if (res.data.result.status) {
          commit('setPaymentStatus', res.data)
        } else {
          if (res.data.result.message) {
            alert(res.data.result.message)
          } else {
            alert('時間を置いて再度ご予約ください。')
          }
          return Promise.reject(res)
        }
      })
      .catch((err) => {
        const errorMessage = Object.values(err.response.data.errors).flat().join('\n')
        alert(errorMessage + '\n注文に失敗しました。再度ご予約ください。')
        return Promise.reject(err)
      })
  },
  // Restaurant reservation
  async reservationSaveRS({ commit, state }) {
    await commit('removePayments')
    const datas = {
      customer: state.ReservationInfo,
      application: state.applicationRS,
      adCd: ''
    }
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/restaurant/reservation/save',
      data: datas,
      withCredentials: true
    })
      .then((res) => {
        if (res.data.result.status) {
          commit('setPaymentStatus', res.data)
        } else {
          if (res.data.result.message) {
            alert(res.data.result.message)
          } else {
            alert('時間を置いて再度ご予約ください。')
          }
          return Promise.reject(res)
        }
      })
      .catch((err) => {
        const errorMessage = Object.values(err.response.data.errors).flat().join('\n')
        alert(errorMessage + '\n注文に失敗しました。再度ご予約ください。')
        return Promise.reject(err)
      })
  },
  async confirmSessionTO({ commit, state }) {
    const senddata = {
      sessionToken: state.paymentStatus.sessionToken,
      cd3secResFlg: state.cd3secFlg
    }
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/takeout/reservation/complete',
      data: senddata,
      withCredentials: true
    })
      .then((res) => {
        commit('setCompleteStatus', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async confirmSessionRS({ commit, state }) {
    const senddata = {
      sessionToken: state.paymentStatus.sessionToken
    }
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/restaurant/reservation/complete',
      data: senddata,
      withCredentials: true
    })
      .then((res) => {
        commit('setCompleteStatus', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async LoginForm({ commit, state }) {
    commit('resetReservationStatus')
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/reservation',
      data: state.completeStatus.loginForm,
      withCredentials: true
    })
      .then((res) => {
        commit('setReservationStatus', res.data)
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 500') {
          commit('setReservationStatus', false)
        } else {
          location.href = process.env.PATH + '/mypage/login/'
        }
      })
  },
  async SendConfirmed({ commit }, databox) {
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/takeout/reservation/close',
      data: databox
    })
      .then((res) => {
        commit('setConfirmedStatus', res.data.status)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async SendInquiry({ commit }, databox) {
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/reservation/review',
      data: databox
    })
      .then((res) => {
        commit('setInquieryStatus', res.data.status)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async reservationChange({ commit }, prams) {
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/restaurant/reservation/change',
      data: prams
    })
      .then((res) => {
        commit('setChangeInfo', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async directPayment({ commit }, reservationId) {
    commit('resetDirectPaymentInfo')
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/reservation/directPayment',
      data: { reservationId },
      withCredentials: true
    })
      .then((res) => {
        if (res.data.status) {
          if (!res.data.paymentUrl) {
            // paymentUrlが返ってこなかった場合も一応エラーにする
            return Promise.reject(res)
          }
          commit('setDirectPaymentInfo', res.data)
        } else if (res.data.message) {
          alert(res.data.message)
        } else {
          return Promise.reject(res)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  InCardInfo(
    { commit },
    {
      key,
      value
    }: {
      key: keyof gourmetReservationTypes.CardInfoTypes
      value: gourmetReservationTypes.CardInfoTypes[keyof gourmetReservationTypes.CardInfoTypes]
    }
  ) {
    commit('setCardInfo', { key, value })
  },
  resetCardInfo({ commit }) {
    commit('resetCardInfo')
  },
  setOption({ commit }, data) {
    commit('setOption', data)
  },
  resetOption({ commit }) {
    commit('resetOption')
  },
  changeOption({ commit }, data) {
    commit('setOption', data)
  },
  changeToping({ commit }, data) {
    commit('setToping', data)
  },
  orderAdd({ commit }, data) {
    commit('orderAdd', data)
  },
  setTimeData({ commit }, data) {
    commit('setTime', data)
  },
  setcd3secFlg({ commit }, data) {
    commit('setcd3', data)
  },
  setCount({ commit }, data) {
    commit('setCount', data)
  },
  resetAllMenus({ commit }) {
    commit('resetAllMenus')
  },
  setReservationLogins({ commit }, { key, value }) {
    commit('setReservationLogins', { key, value })
  },
  async setReservationLogin({ commit }, value) {
    await commit('setReservationLogin', value)
  },
  async setReservationTell({ commit }, value) {
    await commit('setReservationTell', value)
  },
  setReservationisLogin({ commit }, val) {
    commit('setReservationisLogin', val)
  },
  resetCS({ commit }) {
    commit('resetCompleteStates')
  },
  setReservation({ commit }, data) {
    commit('setReservation', data)
  }
}
