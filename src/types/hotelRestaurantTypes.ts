export type Prefecture = {
  code: 'tokyo' | 'osaka' | 'chiba' | 'kanagawa' | 'hukuoka' | 'kyouto' | 'hyogo' | 'okinawa'
  name: '東京' | '大阪' | '千葉' | '神奈川' | '福岡' | '京都' | '兵庫' | '沖縄'
}
export type HotelsInfo = {
  prefectureCode: Prefecture['code']
  prefectureName: Prefecture['name']
  hotels: {
    id: number | null
    name: string
    storeInfo: {
      id: number
      name: string
    }
  }[]
}

export type Image = {
  id: number
  imageCd: string
  imageUrl: string
}
export type Area = {
  bigAreaId: number
  bigAreaName: string
  bigAreaAreaCd: string
  middleAreaId: number
  middleAreaName: string
  middleAreaAreaCd: string
}
export type BuffetStore = {
  id: number
  name: string
  images: Image[]
  area: Area
}
export type BuffetMenu = {
  id: number
  appCd: string
  name: string
  description: string
  plan: string
  salesLunchStartTime: string // hh:mm:ss
  salesDinnerStartTime: string // hh:mm:ss
  provideDayOfWeek: string // 01010110の場合、[月火水木金土日祝]の中[火木土日]の日が営業日
  image: Image
  price: {
    id: number
    priceCd: string
    price: number
    startDate: string
    endDate: string
  }
  shortestAvailableDate: {
    date: string
    time: string
    headcount: number
  }
}
export type BuffetRecommend = {
  id: number
  name: string
  images: Image[]
}

export type HotelRestaurant = {
  store: BuffetStore
  menus: BuffetMenu[]
  recommend: BuffetRecommend[]
}

export type RecommendHotelRestaurantMetaInfo = {
  prefectureName: string
  hotelId: number | null
  // prefectureCode: number | null
  hotelName: string
  storeId: number
  storeName: string
}

export type RecommendHotelRestaurant = {
  id: number
  name: string
  description: string
  thumbImage: {
    id: number
    imageCd: string
    imageUrl: string
  }
}
export type RecommendHotelRestaurantList = {
  [key: string]: RecommendHotelRestaurant
}

export type HotelRestaurantList = {
  [storeId: string]: HotelRestaurant
}
export type HotelRestaurantState = {
  hotelRestaurantList: HotelRestaurantList
  recommendHotelRestaurantList: RecommendHotelRestaurantList
}

export interface CampaignInfo {
  id: number
  name: string
  description: string
  pageUrl: string
  thumbImage: {
    id: number
    imageCd: string
    imageUrl: string
  }
}
