import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const commonHeader: {
  [key: string]: string
} = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const api = (): AxiosInstance => {
  const apiHost = `https://${location.host}`

  return axios.create({
    baseURL: apiHost,
    headers: commonHeader
  })
}

export const apiGet = <T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api().get<T>(url, options)
}

export const apiPost = <T, P = any>(url: string, data?: P, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return api().post<T>(url, data, options)
}
