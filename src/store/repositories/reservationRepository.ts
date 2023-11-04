import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { RepositoryClient } from '~/store/modules'
import { ReservationTypes } from '~/types/reservationTypes'
import { AuthTypes } from '~/types/authTypes'

/**
 * Repository毎に必要なリクエストをセットする
 * ヘッダーが共通化出来るのであればインスタンス元に入れる
 */
const headers = {
  Authorization: 'auth-keys',
  'Content-Type': 'application/json',
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
const reservationUrl = (langCd: string): string => langCd + '/reservation'

export const reservationRepository = {
  get: {
    async getReservation(
      axios: NuxtAxiosInstance,
      headerInfo: AuthTypes.HeaderInfo,
      data: {
        reservationId: string
        reservationHash: string
      }
    ) {
      headers['x-ir-reserve'] = data.reservationId
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(reservationUrl(headerInfo.langCode) + '/' + data.reservationHash)
      client.setMethod('GET')
      await client.exec()
    }
  },
  post: {
    async save(axios: NuxtAxiosInstance, bookingInfo: ReservationTypes.Booking, headerInfo: AuthTypes.HeaderInfo) {
      if ('authHeader' in headerInfo) {
        headers['x-ir-auth'] = headerInfo.authHeader
      }
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(reservationUrl(headerInfo.langCode) + '/save')
      client.setMethod('POST')
      client.setBody(bookingInfo)
      await client.exec()
    },
    async complete(axios: NuxtAxiosInstance, token: string, headerInfo: AuthTypes.HeaderInfo) {
      const data = {
        payment: {
          sessionToken: token
        }
      }
      if ('authHeader' in headerInfo) {
        headers['x-ir-auth'] = headerInfo.authHeader
      }
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(reservationUrl(headerInfo.langCode) + '/complete')
      client.setMethod('POST')
      client.setBody(data)
      await client.exec()
    },
    async login(
      axios: NuxtAxiosInstance,
      loginData: ReservationTypes.LoginData,
      headerInfo: AuthTypes.HeaderInfo
    ): Promise<void> {
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(reservationUrl(headerInfo.langCode) + '/login')
      client.setMethod('POST')
      client.setBody(loginData)
      await client.exec()
    },
    async logout(axios: NuxtAxiosInstance, reservationid: string, headerInfo: AuthTypes.HeaderInfo): Promise<void> {
      headers['X-IR-Reserve'] = reservationid
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(reservationUrl(headerInfo.langCode) + '/logout')
      client.setMethod('POST')
      await client.exec()
    },
    async cancel(
      axios: NuxtAxiosInstance,
      headerInfo: AuthTypes.HeaderInfo,
      reservationId: string,
      reservationHash: string,
      data: {
        apiCode: string
        cancelRemark: string
      }
    ): Promise<void> {
      headers['x-ir-reserve'] = reservationId
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(reservationUrl(headerInfo.langCode) + '/' + reservationHash + '/cancel')
      client.setBody(data)
      client.setMethod('POST')
      await client.exec()
    }
  }
}
