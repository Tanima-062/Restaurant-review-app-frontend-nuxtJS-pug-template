import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { RepositoryClient } from '~/store/modules'
import { AuthTypes } from '~/types/authTypes'

/**
 * Repository毎に必要なリクエストをセットする
 * ヘッダーが共通化出来るのであればインスタンス元に入れる
 */
const headers = {
  Authorization: 'auth-keys',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
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
const searchesUrl = (langCd: string): string => langCd + '/searchPlace'

export const searchPlaceRepository = {
  get: {
    async getPickUpCountryList(axios: NuxtAxiosInstance, headerInfo: AuthTypes.HeaderInfo) {
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchesUrl(headerInfo.langCode) + '/countries')
      client.setMethod('GET')
      await client.exec()
    },
    async getPickUpCityList(axios: NuxtAxiosInstance, pickUpCountryId: number, headerInfo: AuthTypes.HeaderInfo) {
      const param = '/countries/' + pickUpCountryId + '/cities'
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchesUrl(headerInfo.langCode) + param)
      client.setMethod('GET')
      await client.exec()
    },
    async getPickUpAreaList(axios: NuxtAxiosInstance, pickUpCityId: number, headerInfo: AuthTypes.HeaderInfo) {
      const param = '/cities/' + pickUpCityId + '/areas'
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchesUrl(headerInfo.langCode) + param)
      client.setMethod('GET')
      await client.exec()
    },
    async getDropOffCountryList(axios: NuxtAxiosInstance, pickUpLocationId: number, headerInfo: AuthTypes.HeaderInfo) {
      const param = '/countries?locationId=' + pickUpLocationId
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchesUrl(headerInfo.langCode) + param)
      client.setMethod('GET')
      await client.exec()
    },
    async getDropOffCityList(
      axios: NuxtAxiosInstance,
      headerInfo: AuthTypes.HeaderInfo,
      data: {
        dropOffCountryId: number
        pickUpLocationId: number
      }
    ) {
      const param = '/countries/' + data.dropOffCountryId + '/cities?locationId=' + data.pickUpLocationId
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchesUrl(headerInfo.langCode) + param)
      client.setMethod('GET')
      await client.exec()
    },
    async getDropOffAreaList(axios: NuxtAxiosInstance, dropOffCityId: number, headerInfo: AuthTypes.HeaderInfo) {
      const param = '/cities/' + dropOffCityId + '/areas'
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(searchesUrl(headerInfo.langCode) + param)
      client.setMethod('GET')
      await client.exec()
    }
  },
  post: {}
}
