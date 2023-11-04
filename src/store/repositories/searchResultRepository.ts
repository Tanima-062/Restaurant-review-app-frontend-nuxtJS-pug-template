import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { RepositoryClient } from '~/store/modules'
import { SearchResultTypes } from '~/types/searchResultTypes'
import { AuthTypes } from '~/types/authTypes'

/**
 * Repository毎に必要なリクエストをセットする
 * ヘッダーが共通化出来るのであればインスタンス元に入れる
 */
const headers = {
  Authorization: 'auth-keys',
  'Content-Type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': process.env.BASE_URL,
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': true
}
// const headers: RepositoryTypes.Header[] = [
//   { Authorization: 'auth-keys' },
//   { 'Content-Type': 'application/x-www-form-urlencoded' },
//   { 'Accept-Encoding': 'gzip' },
//   { 'Access-Control-Allow-Origin': '*' },
//   { 'Access-Control-Allow-Methods': '*' },
//   { 'Access-Control-Allow-Headers': '*' }
// ]

const baseUrl = 'https://dev-car-rental-api.skyticket.com/v1/'
const searchUrl = (langCd: string): string => langCd + '/searches'

export const searchResultRepository = {
  get: {},
  post: {
    async getList(
      axios: NuxtAxiosInstance,
      searchCondition: SearchResultTypes.SearchCondition,
      headerInfo: AuthTypes.HeaderInfo
    ): Promise<void> {
      headers['x-ir-currency'] = headerInfo.currencyCode
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchUrl(headerInfo.langCode))
      client.setMethod('POST')
      client.setBody(searchCondition)
      await client.exec()
    }
  }
}
