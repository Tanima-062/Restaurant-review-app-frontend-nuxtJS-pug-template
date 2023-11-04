import { apiGet } from '~/utils/axios'

export const emailSuggest = (params: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    apiGet<string[]>('https://skyticket.jp/hotel/api/v3/mail/domain/suggest?domain=@' + params)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
