export default {
  InBeforeURL({ commit }, url) {
    commit('setbeforeURL', url)
  }
}
