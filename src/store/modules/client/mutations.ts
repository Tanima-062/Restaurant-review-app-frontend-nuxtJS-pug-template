import { gourmetClientTypes } from '~/types/gourmetClientTypes'
export default {
  setClientInfo(state, { key, value }) {
    state.ClientInfo[key] = value
  },
  setClientChecked(state, flag) {
    state.ClientInfo.isRemember = flag
  },
  setClientLoginedInfo(state, data: gourmetClientTypes.ClientLoginTypes) {
    state.ClientLoginInfo = { ...data }
  },
  resetClientData(state) {
    state.ClientInfo = {}
  },
  setListTodayData(state, data) {
    state.ClientTodayList = data
  },
  setListTomorrowData(state, data) {
    state.ClientTomorrowList = data
  },
  resetList(state) {
    state.ClientList = []
  },
  resetClientLoginList(state) {
    state.ClientLoginInfo = {}
  },
  setLogoutStatus(state, data) {
    state.ClientLogoutStatus = { data }
  },
  setCookingTodayStatus(state, data) {
    for (let i = 0; i < state.ClientTodayList.length; i++) {
      if (state.ClientTodayList[i].id === data.id) {
        state.ClientTodayList[i].reservationStatus = 'ENSURE'
      }
    }
  },
  setCookingTomorrowStatus(state, data) {
    for (let i = 0; i < state.ClientTomorrowList.length; i++) {
      if (state.ClientTomorrowList[i].reservationNum === data.id) {
        state.ClientTomorrowList[i].reservationStatus = data.status
      }
    }
  },
  setTimes(state, databox) {
    for (let i = 0; i < state.ClientTodayList.length; i++) {
      if (state.ClientTodayList[i].id === databox.id) {
        state.ClientTodayList[i].storeReceptionDateTime = databox.nowTime
      }
    }
  }
}
