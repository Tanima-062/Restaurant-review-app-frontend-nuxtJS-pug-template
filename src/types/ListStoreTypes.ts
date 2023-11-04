export namespace ListStoreTypes {
  export interface MenuTypes {
    image: {
      id: number
      imageCd: string
      imageUrl: string
    }
    isPost: boolean
    menu: {
      id: number
      name: string
      appCd: string
      price: {
        id: number
        priceCd: string
        price: number
      }
    }
  }
  export interface MapHourTypes {
    id: number
    openingTime: string
    code: string
    lastOrderTime: string
    closeTime: string
    week: string
  }
  export interface OpeningHourTypes {
    id: number
    name?: string
    openTime: string
    openingHourCd: string
    lastOrderTime: string
    closeTime: string
    week: string
  }
  export interface NewOpeningHourTypes {
    id: number
    name?: string
    openTime: string[]
    openingHourCd: string[]
    lastOrderTime: string[]
    closeTime: string[]
    week: string[]
  }
}
