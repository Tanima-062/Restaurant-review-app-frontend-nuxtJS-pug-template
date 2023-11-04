export default {
  getStoreId: (state): number => state.storeId,
  getStoreList: (state) => state.storeResult.searchResult,
  getSearchBoxTO: (state) => state.searchBoxTO,
  getSearchBoxRS: (state) => state.searchBoxRS,
  getPreference: (state) => state.preferences,
  getWhenever: (state) => state.whenever
}
