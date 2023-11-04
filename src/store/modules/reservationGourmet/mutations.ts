export default {
  setReservationInfo(state, { key, value }) {
    state.ReservationInfo[key] = value
  },
  setAllUserInfo(state, data) {
    state.ReservationInfo = { ...data }
  },
  setPaymentStatus(state, data) {
    state.paymentStatus = data
  },
  setCompleteStatus(state, data) {
    state.completeStatus = { ...data }
  },
  removePayments(state) {
    for (let i = 0; i < state.applicationTO.menus.length; i++) {
      if (state.applicationTO.menus[i].menu.count === 0) {
        state.applicationTO.menus[i] = 1
      }
    }
    const newMenus = state.applicationTO.menus
    const outOne = newMenus.filter((x) => x !== 1)
    state.applicationTO.menus = outOne
    state.paymentStatus = ''
  },
  removeURL(state) {
    state.paymentStatus.paymentUrl = ''
  },
  removeSession(state) {
    state.paymentStatus.sessionToken = ''
  },
  setReservationStatus(state, data) {
    state.reservationStatus = { ...data }
  },
  resetReservationStatus(state) {
    state.reservationStatus = {}
  },
  setConfirmedStatus(state, data: boolean) {
    state.completeStatus.status = data
  },
  setCardInfo(state, { key, value }) {
    state.CardInfo[key] = value
  },
  resetCardInfo(state) {
    state.CardInfo = {}
  },
  setOption(state, data) {
    state.options = state.options.filter((n) => n.keyword !== data.keyword)
    state.options.push(data)
  },
  setToping(state, data) {
    state.options.push(data)
  },
  resetOption(state) {
    state.options = []
  },
  orderAdd(state, data) {
    if (data.menu.count === 0) {
      state.applicationTO.menus = state.applicationTO.menus.filter((n) => n.menu.id !== data.menu.id)
    } else {
      state.applicationTO.menus.push(data)
    }
  },
  setInquieryStatus(state, data: boolean) {
    state.inquiryStatus = data
  },
  setChangeInfo(state, res) {
    state.changeInfo = res
  },
  setTime(state, data) {
    state.applicationTO.pickUpDate = data.pickUpDate
    state.applicationTO.pickUpTime = data.pickUpTime
  },
  setcd3(state, data) {
    state.cd3secFlg = data
  },
  setCount(state, data) {
    state.applicationTO.menus[data.num].menu.count = data.count
  },
  resetAllMenus(state) {
    state.applicationTO.menus = []
  },
  setReservationLogins(state, { key, value }) {
    state.completeStatus.loginForm[key] = value
  },
  setReservationLogin(state, value) {
    state.completeStatus.loginForm.reservationNo = value
  },
  setReservationTell(state, value) {
    state.completeStatus.loginForm.tel = value
  },
  setReservationisLogin(state, val) {
    state.completeStatus.loginForm.isLogin = val
  },
  resetCompleteStates(state) {
    state.completeStatus = {
      status: false,
      message: '',
      loginForm: {
        reservationNo: '',
        tel: '',
        isMemberUser: false,
        isLogin: false
      }
    }
  },
  setReservation(state, data) {
    state.applicationRS = data
  },
  resetReservation(state) {
    state.applicationRS = {
      menus: [],
      visitDate: '',
      visitTime: '',
      persons: 0
    }
  },
  setDirectPaymentInfo(state, data) {
    state.directPaymentInfo = data
  },
  resetDirectPaymentInfo(state) {
    state.directPaymentInfo = {
      status: false,
      message: '',
      paymentUrl: ''
    }
  }
}
