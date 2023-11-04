export namespace RepositoryTypes {
  export type BaseUrl = string
  export type RootUrl = string
  export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'
  export type Header = { [key: string]: string }
  export type Body = string
  export type Params = { [key: string]: string }
}
