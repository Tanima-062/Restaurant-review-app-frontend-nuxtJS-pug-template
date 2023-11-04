export namespace RestaurantType {
  export type SearchCondition = {
    cookingGenreCd: string
    menuGenreCd: string
    suggestCd: string
    suggestText: string
    visitDate: string
    visitTime: string
    visitPeople: number
    page: number | null
    latitude: number | null
    longitude: number | null
    appCd: string
    lowerPrice: number | null
    upperPrice: number | null
  }
  export type RestaurantMenu = {
    id: number
    name: string
    description: string
    providedTime: string // ex) "providedTime":"120"
    thumbImage: {
      id: number
      imageCd: string
      imageUrl: string
    }
    price: {
      id: number
      priceCd: string
      price: string // ex) "price":"0"
    }
    numberOfCourse: string
    availableNumberOfLowerLimit: number | null
    availableNumberOfUpperLimit: number | null
    freeDrinks: boolean
    onlySeat: boolean
  }

  export type RestaurantStock = {
    vacancyTime: string
    people: number
    sets: number
  }

  export type RestaurantPlanStatus = {
    restaurantMenu: RestaurantMenu[]
    stocks: RestaurantStock[]
  }
}
