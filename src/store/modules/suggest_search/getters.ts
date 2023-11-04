export default {
  getSearchboxSituation: (state) => state.searchboxSituation,
  getMenus: (state) => state.allmenus,
  getSuggestList: (state) => state.suggestList,
  getResearchGenre: (state) => state.genreList.genres,
  getResearchGenreChild: (state) => state.genreListChild.genres,
  getGenreFromList: (state) => state.genreFromList,
  getAreaFromList: (state) => state.areaFromList,
  getLatitude: (state) => state.searchboxSituation.latitude,
  getLongitude: (state) => state.searchboxSituation.longitude,
  getpopular: (state) => state.popularcommit,
  gettime: (state) => state.searchboxSituation.pickUpTime
}
