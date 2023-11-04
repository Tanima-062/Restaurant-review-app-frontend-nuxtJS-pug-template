import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async CancelPrice({ commit }, reservationId) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/restaurant/reservation/calcCancelFee',
      params: { reservationId }
    })
      .then((res) => {
        commit('setCancelPrice', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async CancelReservation({ commit }, reservationId) {
    await axios({
      method: 'post',
      url: '/gourmet/v1/ja/restaurant/reservation/cancel',
      data: { reservationId }
    })
      .then((res) => {
        commit('setCancelStatus', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchCancelPolicy({ commit }, data) {
    await axios({
      method: 'get',
      url: `/gourmet/v1/ja/store/${data.id}/cancelPolicy`,
      params: { appCd: data.appCd }
    })
      .then((res) => {
        commit('setCancelPolicy', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
