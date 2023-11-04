export namespace SuggestSearchTypes {
  export interface MenuDetailTypes {
    id: number
    name: string
    description: string
    thumbImage: [
      {
        id: number
        imageCd: string
        imageUrl: string
      }
    ]
    price: {
      id: number
      priceCd: string
      price: number
    }
    store: {
      id: number
      name: string
      latitude: number
      logitude: number
      station: {
        id: number
        name: string
        latitude: number
        logitude: number
        distance: number
      }
      distance: number
    }
  }
  export interface FoodGenreTypes {
    bigName: string
    bigGenre: string
    smallGenre: string
    smallName: string
  }
  export interface AreaGenreTypes {
    areaCd: string
    id: number
    level: number
    name: string
    path: string
  }
}
