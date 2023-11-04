import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  SetChangeInfo({ commit }, reservationInfo) {
    commit('setChangeInfo', reservationInfo)
  },
  async ReservationChange({ commit }, reservationInfo) {
    await axios({
      method: 'post',
      url: 'gourmet/v1/ja/restaurant/reservation/change',
      withCredentials: true,
      data: reservationInfo
    })
      .then((res) => {
        commit('setChangedResult', res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async FetchMenuVacancy({ commit }, reservationInfo) {
    await axios({
      method: 'get',
      url: 'gourmet/v1/ja/restaurant/menuVacancy',
      withCredentials: true,
      params: {
        visitDate: reservationInfo.visitDate,
        menuId: reservationInfo.menuId,
        reservationId: reservationInfo.reservationId
      }
    })
      .then((res) => {
        commit('setVacancyInfo', res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  resetChangeInfo({ commit }) {
    commit('resetChangeInfo')
  }
}
