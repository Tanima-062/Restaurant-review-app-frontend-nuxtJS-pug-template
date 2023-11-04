export namespace RecommendTypes {
  export interface ListTypesTO {
    id: number
    name: string
    description: string
    thumbImage: {
      id: number
      imageCd: string
      imageUrl: string
    }
    price: {
      id: number
      priceCd: string
      price: number
    }
    store: {
      id: number
      name: string
      genres: {
        id: number
        name: string
        genreCd: string
        appCd: string
        path: string
        level: number
      }[]
      access: string
    }
  }
  export interface ListTypesRS {
    id: number
    name: string
    description: string
    thumbImage: {
      id: number
      imageCd: string
      imageUrl: string
    }
  }
}
