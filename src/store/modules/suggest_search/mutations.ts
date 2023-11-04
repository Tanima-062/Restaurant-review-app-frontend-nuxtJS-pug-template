import { searchTopTypes } from '~/types/searchTopTypes'
import { SuggestSearchTypes } from '~/types/suggestSearchTypes'
export default {
  setSearchBoxSituation(state, data: searchTopTypes.SearchBoxSituation) {
    state.searchboxSituation = { ...data }
  },
  setResSearch(state, data: searchTopTypes.ResSearchTypes) {
    state.resSearch = { ...data }
  },
  setResSearch2(state, data: searchTopTypes.ResSearchTypes) {
    state.resSearchLevel2 = { ...data }
  },
  setResSearch3(state, data: searchTopTypes.ResSearchTypes) {
    state.resSearchLevel3 = { ...data }
  },
  setCookingCategoryCd(state, data: string) {
    state.searchboxSituation.cookingGenreCd = data
  },
  setMenuCategoryCd(state, data: string) {
    state.searchboxSituation.menuGenreCd = data
  },
  setPage(state, data: number) {
    state.searchboxSituation.page = data
  },
  setAllMenus(state, data) {
    state.allmenus = data
  },
  setAddMenus(state, data) {
    for (let i = 0; i < data.length; i++) {
      state.allmenus.push(data[i])
    }
  },
  setSuggetsList(state, data) {
    state.suggestList = data
  },
  InitGenreList(state, data: []) {
    state.genreList = data
  },
  InitGenreListChild(state, data: []) {
    state.genreListChild = data
  },
  ResetGenreListChild(state) {
    state.genreListChild = []
  },
  setgenres(state, data: SuggestSearchTypes.FoodGenreTypes) {
    state.genreFromList = data
  },
  resetgenres(state) {
    state.genreFromList = []
  },
  setAreas(state, data: SuggestSearchTypes.AreaGenreTypes) {
    state.areaFromList = data
  },
  resetAreas(state) {
    state.areaFromList = []
  },
  removeMenuGenreCd(state) {
    state.searchboxSituation.menuGenreCd = ''
  },
  addPage(state) {
    state.searchboxSituation.page = state.searchboxSituation.page + 1
  },
  resetPage(state) {
    state.searchboxSituation.page = 0
  },
  setSuggestText(state, data) {
    state.suggestText = data
  },
  setSuggestTextData(state, data) {
    state.suggestTextData = data
  },
  setPopular(state, data: number) {
    state.popularcommit.push(data)
  }
}
