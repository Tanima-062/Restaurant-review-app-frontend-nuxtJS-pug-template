import axios, { AxiosResponse } from 'axios'
import { ActionTree } from 'vuex/types/index'
import { HotelRestaurant, HotelRestaurantList, HotelRestaurantState } from '~/types/hotelRestaurantTypes'
import { StoreTypes } from '~/types/storeTypes'
axios.defaults.baseURL = process.env.BASE_URL

const actions: ActionTree<HotelRestaurantState, HotelRestaurantState> = {
  async fetchBuffetStore({ commit }, data: { id: string; genreId: string }) {
    const res = await axios({
      method: 'get',
      url: `/gourmet/v1/ja/store/${data.id}/buffet`,
      params: { genreId: data.genreId }
    })
    commit('setHotelRestaurant', res.data)
  },
  async fetchBuffetStoreList({ commit }, data: { ids: string[]; genreId: string }) {
    try {
      const buffetStoreList: HotelRestaurantList = {}
      const parallel = data.ids.map(async (id) => {
        const result: AxiosResponse<HotelRestaurant> = await axios({
          method: 'get',
          url: `/gourmet/v1/ja/store/${id}/buffet`,
          params: { genreId: data.genreId }
        })
        buffetStoreList[id] = result.data
      })
      await Promise.all(parallel)
      commit('setHotelRestaurantList', buffetStoreList)
    } catch (err: any) {
      // SSRの場合、エラーログ追跡するため
      if (!process.browser) {
        await axios({
          method: 'post',
          url: 'http://0.0.0.0:3000/api/error',
          data: {
            message: `[code]: ${err.response && err.response.status} [path]: ${
              process.env.BASE_URL + (err.response && err.response.request.path)
            } [message]: ${err.response && err.response.data && err.response.data.message}`
          }
        })
      }
    }
  },
  async fetchRecommendHotelRestaurantList({ commit }, data: { ids: string[] }) {
    try {
      const parallel = data.ids.map(async (id, idx) => {
        const result: AxiosResponse<StoreTypes.StoreDetail> = await axios({
          method: 'get',
          withCredentials: true,
          url: `/gourmet/v1/ja/store/${id}`
        })
        if (result.data) {
          commit('setRecommendHotelRestaurant', {
            id: idx,
            recommendHotelRestaurantInfo: {
              id: result.data.id,
              name: result.data.name,
              description: result.data.description,
              thumbImage: {
                id: result.data.topImages[0].id,
                imageCd: result.data.topImages[0].imageCd,
                imageUrl: result.data.topImages[0].imageUrl
              }
            }
          })
        }
      })
      await Promise.all(parallel)
    } catch (err) {
      console.log(err)
    }
  }
}
export default actions
