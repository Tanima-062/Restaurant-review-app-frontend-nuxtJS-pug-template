export namespace gourmetClientTypes {
  export interface ClientTypes {
    userName: string
    password: string
    inRemember: boolean
  }
  export interface ClientLoginTypes {
    id: number
    name: string
    userName: string
    staffAuthorityId: number
    staffAythorityName: string
    lastLoginAt: string
    rememberToken: string
  }
}
