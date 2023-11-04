export namespace gourmetReservationTypes {
  export interface ReservationTypes {
    firstName: string
    lastName: string
    email: string
    tel: string
    request: string
  }
  export interface PaymentTypes {
    sessionToken: string
    paymentUrl: string
    requestId: string
  }
  export interface CardInfoTypes {
    cardNum: string
    name: string
    expireMonth: string
    expireYear: string
    securityCode: string
  }
}
