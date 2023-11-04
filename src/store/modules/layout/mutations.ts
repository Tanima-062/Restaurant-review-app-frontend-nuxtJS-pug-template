export default {
  setHeaderInfo(state, data) {
    state.headerInfo.layoutType = data.layoutType
    state.headerInfo.returnPath = data.returnPath
    state.headerInfo.headerTitle = data.headerTitle
  }
}
