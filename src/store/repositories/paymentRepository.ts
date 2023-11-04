import { NuxtAxiosInstance } from '@nuxtjs/axios'
// import { RepositoryClient } from '~/store/modules'
// import { ModelRentacarTypes } from '~/types/modelRentacar'
// import { RepositoryTypes } from '~/types'

/**
 * Repository毎に必要なリクエストをセットする
 * ヘッダーが共通化出来るのであればインスタンス元に入れる
 */
// const headers = {
//   Authorization: 'auth-keys',
//   'Content-Type': 'application/json'
//   // 'Access-Control-Allow-Origin': '*',
//   // 'Access-Control-Allow-Methods': '*',
//   // 'Access-Control-Allow-Headers': '*'
// }
// const headers: RepositoryTypes.Header[] = [
//   { Authorization: 'auth-keys' },
//   { 'Content-Type': 'application/x-www-form-urlencoded' },
//   { 'Accept-Encoding': 'gzip' },
//   { 'Access-Control-Allow-Origin': '*' },
//   { 'Access-Control-Allow-Methods': '*' },
//   { 'Access-Control-Allow-Headers': '*' }
// ]

// const baseUrl = 'https://dev-car-rental-api.skyticket.com/v1/'
// const searchesUrl = 'searches'

export const paymentRepository = {
  get: {},
  post: {
    // awaitがないのでlintがerrorになる
    // async postPayment(axios: NuxtAxiosInstance, data) {
    postPayment(axios: NuxtAxiosInstance, data) {
      // TODO 削除
      console.log(axios)
      console.log(data)
    }
  }
}
