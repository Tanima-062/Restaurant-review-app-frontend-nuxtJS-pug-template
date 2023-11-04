export namespace SearchResultTypes {
  export interface Baggage {
    small: number
    big: number
  }
  export interface Mileage {
    limited: boolean
    unlimited: boolean
  }
  export interface Price {
    showPrice: number
    showCurrency: string
    realCurrency: string
    realPrice: number
    showDeposit: number
    realDeposit: number
    driveAwayPrice: number
    quoteAllowed: boolean
    prePayable: boolean
  }
  export interface Shop {
    locationId: number
    name: string
    address: string
    instructions: string
  }
  export interface Company {
    logo: string
    name: string
    review: number
    locType: number
  }

  export interface PlaceInfo {
    countryId: number
    cityId: number
    locationId: number
  }

  export interface BookingInfo {
    locationId: number
    date: string //  YYYY/MM/DD
    time: string
  }

  export interface Driver {
    age30: boolean
  }

  export interface Filter {
    companies?: string[]
    carTypes?: number[]
    ratings?: number[]
    locations?: string[]
    fuelPolicies?: string[]
    mileage?: Mileage
    at?: boolean
    mt?: boolean
    aircon?: boolean
    doors4?: boolean
    seats4OrLess?: boolean
    seats5OrMore?: boolean
    fuelType?: string
    isDeposit?: boolean
    isDamageExcess?: boolean
  }

  // 検索条件
  export interface SearchCondition {
    pickUp: BookingInfo
    dropOff: BookingInfo
    driver: Driver
    page: number
    plan?: Filter
  }
  export interface DetailCondition {
    pickUp: BookingInfo
    dropOff: BookingInfo
    driver: Driver
    apiCode: string
  }

  export interface RentalTermItem {
    caption: string
    body: string
  }
  export interface RentalTerm {
    Inclusive: RentalTermItem
    PaymentInfo: RentalTermItem
    PersonalTouch: RentalTermItem
    RentalTerms: RentalTermItem
  }

  // 検索フォーム用
  export interface LocationInfo {
    pickUp: PlaceInfo
    dropOff: PlaceInfo
  }
  // 検索結果
  export interface ResultList {
    id: number
    at: boolean
    mt: boolean
    aircon: boolean
    airbag: boolean
    doors: number
    seats: number
    baggage: Baggage
    freeCancel: boolean
    mileage: Mileage
    fuelPolicy: number
    insurancePkg: string
    fuelType: string
    carTypes: []
    cmaCompliant: boolean
    image: string
    specialOfferText: string
    name: string
    price: Price
    pickUp: Shop
    dropOff: Shop
    company: Company
  }
}
