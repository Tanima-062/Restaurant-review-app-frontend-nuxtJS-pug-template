export namespace MenuTypes {
  export interface TakeoutMenuTypes {
    id: number
    name: string
    description: string
    appCd: string
    salesDinnerEndTime: string
    salesDinnerStartTime: string
    salesLunchEndTime: string
    salesLunchStartTime: string
    stockNumber: string
    isFavorite: boolean
    menuImage: {
      id: number
      imageCd: string
      imageUrl: string
    }
    menuPrice: {
      id: number
      priceCd: string
      proce: number
    }
    store: {
      id: number
      name: string
      latitude: number
      longitude: number
      distanceStation: number
    }
    status: {
      canSale: boolean
      message: string
    }
    storeGenres: []
    evaluations: []
    station: {
      id: number
      name: string
      latitude: number
      longitude: number
    }
    options: {
      optionCd: string
      required: boolean
      keywordId: number
      keyword: string
      contentsId: number
      contents: string
      price: number
    }
  }
  export interface OptionTypes {
    id: number
    contentsId: number
    keywordId: number
  }
}
