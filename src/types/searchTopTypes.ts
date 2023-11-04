export namespace searchTopTypes {
  export interface SearchBoxSituation {
    suggestText: string
    pickUpDate: string
    pickUpTime: string
    cookingGenreCd: string
    menuGenreCd: string
    page: number
  }
  export interface NotificationTypes {
    notification: {
      notices: []
    }
  }
  export interface ResSearchTypes {
    resSearch: {
      genres: [
        {
          id: number
          name: string
          genreCd: string
          appCd: string
          path: string
        }
      ]
      menus: [
        {
          id: number
          name: string
          descriptrion: string
          thumbImage: [
            {
              id: number
              ImageCd: string
              imageUrl: string
            }
          ]
        }
      ]
      page: number
      pageMax: number
      sumCount: number
    }
  }
  export interface RestaurantSearchBox {
    suggestCd: string
    suggestText: string
    visitDate: string
    visitTime: string
    visitPeople: number
    latitude: number
    longitude: number
    cookingGenreCd: string
    menuGenreCd: string
  }
}
