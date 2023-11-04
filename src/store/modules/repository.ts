import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { RepositoryTypes } from '~/types'

export class RepositoryClient {
  protected baseUrl: RepositoryTypes.BaseUrl = process.env.BASE_URL || ''
  protected url: RepositoryTypes.RootUrl = ''
  protected params?: RepositoryTypes.Params = {}
  protected method: RepositoryTypes.Methods = 'GET'
  protected header: RepositoryTypes.Header = {}
  protected headers = {}
  protected body: RepositoryTypes.Body = ''
  protected axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance, headers) {
    this.axios = axios
    this.headers = headers
  }

  setBaseUrl(baseUrl: RepositoryTypes.BaseUrl): this {
    this.baseUrl = baseUrl
    return this
  }

  setUrl(url: RepositoryTypes.RootUrl): this {
    this.url = url
    return this
  }

  setMethod(method: RepositoryTypes.Methods): this {
    this.method = method
    return this
  }

  addHeaders(headers: RepositoryTypes.Header[]): this {
    headers.forEach((header) => {
      const key = Object.keys[0][header]
      this.header[key] = header[key]
    })
    return this
  }
  // eslint-disable-next-line
  setBody(body: any): this {
    this.body = body
    return this
  }

  addParameter(params: RepositoryTypes.Params): this {
    this.params = params
    return this
  }
  // eslint-disable-next-line
  async exec(): Promise<any> {
    let options = {
      baseURL: this.baseUrl,
      url: this.url,
      method: this.method,
      headers: this.headers,
      withCredentials: true
    }
    if (this.body) {
      options = { ...options, ...{ data: JSON.stringify(this.body) } }
    }
    if (this.params) {
      options = { ...options, ...{ params: this.params } }
    }
    await this.axios.request(options)
  }
}
