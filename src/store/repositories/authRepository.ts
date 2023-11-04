import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AuthTypes } from '~/types/authTypes'
import { RepositoryClient } from '~/store/modules'
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
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Expose-Headers': 'X-IR-Auth, X-IR-Reserve'
}

const baseUrl = 'https://dev-car-rental-api.skyticket.com/v1/'
const authUrl = (langCd: string): string => langCd + '/auth'

export const authRepository = {
  get: {
    async getUserData(axios: NuxtAxiosInstance, langCode: string) {
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(authUrl(langCode) + '/login')
      client.setMethod('GET')
      await client.exec()
    }
  },
  post: {
    async login(axios: NuxtAxiosInstance, loginData: AuthTypes.LoginData, langCode: string): Promise<void> {
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(authUrl(langCode) + '/login')
      client.setMethod('POST')
      client.setBody(loginData)
      await client.exec()
    },
    async logout(axios: NuxtAxiosInstance, langCode: string): Promise<void> {
      const client = new RepositoryClient(axios, headers)
      client.setBaseUrl(baseUrl)
      client.setUrl(authUrl(langCode) + '/logout')
      client.setMethod('POST')
      await client.exec()
    }
  }
}
