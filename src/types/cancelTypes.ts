export namespace CancelTypes {
  export interface CancelPrice {
    status: boolean
    message: string
    cancelPrice: number
    refundPrice: number
  }
  export interface CancelStatus {
    status: boolean
    message: string
  }
  export interface CancelPolicy {
    beforeDay: number
    beforeTime: number
    isAfter: boolean
    cancelFee: string
    cancelFeeUnit: string
  }
}
