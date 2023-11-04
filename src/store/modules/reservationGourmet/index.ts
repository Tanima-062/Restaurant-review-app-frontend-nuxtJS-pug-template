import { format, add } from 'date-fns'
import ja from 'date-fns/locale/ja'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const today = add(new Date(), { hours: 2 })
const date = format(today, 'yyyy-MM-dd', { locale: ja })
const time = format(today, 'HH', { locale: ja }) + ':00'

export const state = () => ({
  ReservationInfo: {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    request: ''
  },
  allCartPrice: 0,
  cd3secFlg: 0,
  applicationTO: {
    menus: [],
    pickUpDate: date,
    pickUpTime: time
  },
  applicationRS: {
    menus: [],
    visitDate: '',
    visitTime: '',
    persons: 0
  },
  payment: {
    returnUrl: process.env.PATH + '/reservation/complete'
  },
  paymentStatus: {
    sessionToken: '',
    paymentUrl: '',
    requestId: ''
  },
  completeStatus: {
    status: false,
    message: '',
    loginForm: {
      reservationNo: '',
      tel: '',
      isMemberUser: false,
      isLogin: false
    }
  },
  changeInfo: {
    status: false,
    message: '',
    returnUrl: '',
    isRefund: false,
    isOnlySeat: false
  },
  reservationStatus: {
    status: false,
    message: '',
    reservation: {
      id: 0,
      appCd: '',
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      reservationStatus: '',
      paymentStatus: '',
      cancelDatetime: '',
      pickUpDateTime: '',
      request: '',
      hasReview: false,
      reservationMenus: [
        {
          id: 0,
          reservationId: 0,
          name: '',
          count: 0,
          persions: 0,
          unitPrice: 0,
          price: 0,
          menuTypeCd: '',
          reservationOptions: []
        }
      ],
      reservationStore: {
        id: 0,
        reservationId: 0,
        name: '',
        address: '',
        email: '',
        tel: '',
        latitude: 0,
        longitude: 0
      }
    }
  },
  CardInfo: {
    cardNum: '',
    name: '',
    expireMonth: '',
    expireYear: '',
    securityCode: ''
  },
  directPaymentInfo: {
    status: false,
    message: '',
    paymentUrl: ''
  },
  options: [],
  inquiryStatus: false
})

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
