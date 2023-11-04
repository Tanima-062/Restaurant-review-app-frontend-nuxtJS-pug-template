export namespace StoreTypes {
  export type StoreDetail = {
    storeGenres: {
      id: number
      name: string
      genreCd: string
      appCd: string
      path: string
    }[]
    topImages: {
      id: number
      imageCd: string
      imageUrl: string
    }
    openingHours: {
      id: number
      name: string
      openTime: string
      closeTime: string
    }
    station: {
      id: number
      name: string
      latitude: number
      longitude: number
    }
    evaluation: {
      evaluationCd: string
      percentage: string
    }
    id: number
    name: string
    address: string
    postalCode: string
    tel: string
    latitude: number
    longitude: number
    email_1: string
    daytimeBudgetLowerLimit: number
    daytimeBudgetLimit: number
    access: string
    account: string
    remarks: string
    description: string
    fax: string
    userFax: string
    reservationNecessity: string
    regularHoliday: string
    nightBudgetLowerLimit: string
    nightBudgetLimit: string
    canCardL: boolean
    cardTypes: string
    canDigitalMoney: string
    digitalMoneyTypes: string
    hasPrivateRoom: boolean
    privateRoomTypes: string
    hasParking: boolean
    numberOfSeats: number
    canCharter: boolean
    charterTypes: string
    smoking: boolean
    smokingTypes: string
    isFavorite: boolean
  }
  export interface StoreResult {
    stores: {
      id: number
      name: string
      access: string
      daytimeBudgetLowerLimit: number
      nightBudgetLowerLimit: number
      latitude: number
      longitude: number
      storeGenres: {
        id: number
        name: string
        genreCd: string
        appCd: string
        path: string
      }[]
      storeImage: {
        id: number
        imageCd: string
        imageUrl: string
      }[]
      recommendMenu: {
        id: number
        name: string
        price: {
          id: number
          priceCd: string
          price: number
        }
      }
      distance: number
      openinghours: {
        id: number
        name: string
        openTime: string
        closeTime: string
        code: string
        lastOrderTime: string
        week: string
      }[]
      appCd?: string
      lowerOrdersTime?: number
      priceLevel?: number
    }
    sumCount: number
    page: number
    pageMax: number
  }
  export interface Openhours {
    id: number
    name: string
    openingTime: string
    closeTime: string
    code: string
    lastOrderTime: string
    week: string
  }
  export interface StoreGenres {
    id: number
    name: string
    genreCd: string
    appCd: string
    path: string
    isDelegate: number
  }
  export interface SearchBox {
    suggestCd: string
    suggestText: string
    suggestTextName: string
    latitude: number | null
    longitude: number | null
    cookingGenreCd: string
    cookingGenreCdName: string
    menuGenreCd: string
    menuGenreCdName: string
    page: number | null
    appCd: string
  }
  export type SearchBoxRS = {
    visitDate: string
    visitTime: string
    visitPeople: number
    lowerPrice: number | null
    upperPrice: number | null
    details: string
    zone: number
  } & SearchBox
  export interface Preference {
    genres: {
      id: number
      name: string
      genreCd: string
      appCd: string
      path: string
      level: number
    }[]
  }
  export type Review = {
    id: number
    userId: number
    username: string
    body: string
    evaluationCd: string
    image: {
      id: number
      imageCd: string
      imageUrl: string
    }
    createdAt: string
  }
}
