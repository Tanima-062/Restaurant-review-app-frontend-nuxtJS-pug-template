export namespace FavoriteTypes {
  export type Station = {
    id: number
    latitude: number
    longitude: number
    name: string
  }

  export type TakeoutMenuPrice = {
    id: number
    price: string
    priceCd: string
  }

  export type TakeoutStore = {
    id: number
    latitude: number
    longitude: number
    name: string
    station: Station
  }

  export type ThumbImage = {
    id: number
    imageCd: string
    imageUrl: string
  }

  export type StoreGenre = {
    id: number
    name: string
    genreCd: string
    appCd: string
    path: string
    isDelegate: string
  }

  export type RestaurantStoreImage = {
    id: number
    imageCd: string
    imageUrl: string
  }

  export interface TakeoutTypes {
    description: string
    id: number
    name: string
    price: TakeoutMenuPrice
    store: TakeoutStore
    thumbImage: ThumbImage
  }

  export type RestaurantMenuPrice = {
    id: number
    priceCd: string
    price: number
  }

  export type RestaurantMenuThumb = {
    id: number
    name: string
    price: RestaurantMenuPrice
  }

  export type OpeningHour = {
    id: number
    openTime: string
    closeTime: string
    code: string
    lastOrderTime: string
    week: string
  }
  export interface RestaurantTypes {
    id: number
    name: string
    access: string
    daytimeBudgetLowerLimit: number
    nightBudgetLowerLimit: number
    storeGenres: Array<StoreGenre>
    storeImage: RestaurantStoreImage
    recommendMenu: RestaurantMenuThumb
    distance: number
    openinghours: Array<OpeningHour>
    latitude: number
    longitude: number
    appCd: string
    lowerOrdersTime: number
    priceLevel: number
  }
}
