export namespace AuthTypes {
  // ユーザ情報
  export interface UserData {
    userId: number
    email: string
    tel: string
    lastName: string
    firstName: string
    birthDate: string[] | number[]
    gender: string
    unreadCnt: number
  }
  export interface LoginData {
    loginId: string
    password: string
  }
  // APIに渡す用
  export interface HeaderInfo {
    langCode: string
    currencyCode?: string
    authHeader?: string
  }
}
