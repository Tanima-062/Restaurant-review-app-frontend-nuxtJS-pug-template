import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
export default {
  async InitSearch({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/search'
    })
      .then((res) => {
        commit('setResSearch', res.data.searchResult)
        commit('setAllMenus', res.data.searchResult.menus)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async CookingSearch({ state, commit }, context) {
    commit('modules/suggest_search/setCookingCategoryCd', context, {
      root: true
    })
    commit('resetPage')
    commit('removeMenuGenreCd')
    const datas = state.searchboxSituation
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/search',
      params: datas
    }).then((res) => {
      commit('setResSearch2', res.data.searchResult)
      commit('setAllMenus', res.data.searchResult.menus)
    })
  },
  async MenuSearch({ state, commit }, context) {
    commit('modules/suggest_search/setMenuCategoryCd', context, {
      root: true
    })
    commit('resetPage')
    const datas = state.searchboxSituation
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/search',
      params: datas
    }).then((res) => {
      commit('setResSearch3', res.data.searchResult)
      if (res.data.searchResult.menus === undefined) {
        commit('setAllMenus', null)
      }
      commit('setAllMenus', res.data.searchResult.menus)
    })
  },
  async ReSearch({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/genre/b-COOKING'
    }).then((res) => {
      commit('InitGenreList', res.data)
    })
  },
  async CommitmentSearch({ commit }) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/genre/b-detailed'
    }).then((res) => {
      commit('InitGenreList', res.data)
    })
  },
  async ReSearchChild({ commit }, val) {
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/genre/' + val
    }).then((res) => {
      commit('InitGenreListChild', res.data)
    })
  },
  ResetChild({ commit }) {
    commit('ResetGenreListChild')
  },
  setText({ commit }, context) {
    commit('setSuggetsList', context)
  },
  setGenres({ commit }, genre) {
    commit('setgenres', genre)
  },
  resetGenres({ commit }) {
    commit('resetgenres')
  },
  async elasticSearch({ commit }, context) {
    await axios({
      method: 'post',
      url: process.env.PATH + '/elasticSearch', // nodeへリクエスト
      data: { queryText: context }
    }).then((res) => {
      commit('setSuggetsList', res.data.hits.hits)
    })
  },
  async Addpage({ commit, state }) {
    await commit('addPage')
    const datas = state.searchboxSituation
    await axios({
      method: 'get',
      url: '/gourmet/v1/ja/takeout/search',
      params: datas
    }).then((res) => {
      commit('setResSearch', res.data.searchResult)
      commit('setAddMenus', res.data.searchResult.menus)
    })
  },
  async setSuggestText({ commit }, data: string) {
    await commit('setSuggestText', data)
  },
  async setSuggestTextData({ commit }, data: string) {
    await commit('setSuggestTextData', data)
  },
  async setAreas({ commit }, data: string) {
    await commit('setAreas', data)
  },
  resetAreas({ commit }) {
    commit('resetAreas')
  },
  async setPopular({ commit }, data: number) {
    await commit('setPopular', data)
  },
  setSearchBoxSituation({ commit }, data) {
    commit('setSearchBoxSituation', data)
  }
  // フロントから叩くES
  // async ElasticSearch({ commit }, context) {
  //   await axios({
  //     method: 'post',
  //     url: process.env.ELASTIC_URL,
  //     data: {
  //       collapse: {
  //         field: 'name.keyword'
  //       },
  //       query: {
  //         bool: {
  //           should: [
  //             {
  //               match: {
  //                 'name.suggest': {
  //                   query: context
  //                 }
  //               }
  //             },
  //             {
  //               match: {
  //                 'name.readingform': {
  //                   query: context,
  //                   fuzziness: 'AUTO',
  //                   operator: 'and'
  //                 }
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     }
  //   })
  //     .then((res) => {
  //       commit('setSuggetsList', res.data.hits.hits)
  //     })
  //     .catch((err) => {
  //       console.log('elastic search')
  //       console.log(err)
  //     })
  // }
}
