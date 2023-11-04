import { SearchResultTypes } from '~/types/searchResultTypes'

export namespace ReservationTypes {
  export interface Options {
    id: number
    realPrice: number
    amount: number
    showPrice?: number
  }
  export interface PriceInfo {
    showPrice: number
    showCurrency: string
    realPrice: number
    realCurrency: string
  }

  export interface DriverInfo {
    firstName: string
    lastName: string
    email: string
    tel: string
    age30: boolean
  }
  export interface PlanInfo {
    id: number
    price: PriceInfo
    options: Options[]
    insurance?: Options
  }
  export interface PaymentInfo {
    returnUrl: string
  }

  export interface Booking {
    apiCode: string
    driver: DriverInfo
    plan: PlanInfo
    pickUp: SearchResultTypes.BookingInfo
    dropOff: SearchResultTypes.BookingInfo
    flightNo: string
    payment: PaymentInfo
  }

  export interface LoginData {
    reservationId: number | null
    tel: string
  }
  // 確定した予約情報
  export interface Reservation {
    administrativeFee: number
    apiCode: string
    cancelDatetime: string | null
    driver: DriverInfo
    externalReservationId: string
    flightNo: string | null
    id: number
    price: PriceInfo
    reservationHash: string
    status: string
  }
}
