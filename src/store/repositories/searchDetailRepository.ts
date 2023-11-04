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

export const searchDetailRepository = {
  get: {
    async getDetail(
      axios: NuxtAxiosInstance,
      planId: number,
      detailCondition: SearchResultTypes.DetailCondition,
      headerInfo: AuthTypes.HeaderInfo
    ) {
      headers['x-ir-currency'] = headerInfo.currencyCode
      const planUrl = `${headerInfo.langCode}/plans/${planId}?pickUp[locationId]=${detailCondition.pickUp.locationId}&pickUp[date]=${detailCondition.pickUp.date}&pickUp[time]=${detailCondition.pickUp.time}&dropOff[locationId]=${detailCondition.dropOff.locationId}&dropOff[date]=${detailCondition.dropOff.date}&dropOff[time]=${detailCondition.dropOff.time}&driver[age30]=${detailCondition.driver.age30}&apiCode=${detailCondition.apiCode}`
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(planUrl)
      client.setMethod('GET')
      await client.exec()
    },
    async getRentalTerm(
      axios: NuxtAxiosInstance,
      planId: number,
      detailCondition: SearchResultTypes.DetailCondition,
      headerInfo: AuthTypes.HeaderInfo
    ) {
      const rentalTermUrl = `${headerInfo.langCode}/rentalTerms/${planId}?pickUp[locationId]=${detailCondition.pickUp.locationId}&pickUp[date]=${detailCondition.pickUp.date}&pickUp[time]=${detailCondition.pickUp.time}&dropOff[locationId]=${detailCondition.dropOff.locationId}&dropOff[date]=${detailCondition.dropOff.date}&dropOff[time]=${detailCondition.dropOff.time}&apiCode=${detailCondition.apiCode}`
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(rentalTermUrl)
      client.setMethod('GET')
      await client.exec()
    }
  }
}
