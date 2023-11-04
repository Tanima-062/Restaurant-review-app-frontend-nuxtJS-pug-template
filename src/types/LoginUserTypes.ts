export namespace LoginUserTypes {
  export interface UserTypes {
    userId: number
    email: string
    tel: string
    lastName: string
    firstName: string
    birthDate: string[]
    gender: string
    unreadCnt: number
  }
  export interface LocationTypes {
    latitude: string
    longitude: string
  }
}
