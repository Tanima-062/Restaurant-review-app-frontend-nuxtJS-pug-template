import { AreaTypes } from '~/types/areaTypes'
export default {
  setSelectAreas(state, data: AreaTypes.SelectAreaTypes[]) {
    state.SelectArea = { ...data }
  },
  setSelectAreasSmall(state, data: AreaTypes.SelectAreaTypes[]) {
    state.SelectAreaSmall = { ...data }
  },
  setAreaInfo(state, areaInfo: AreaTypes.SelectAreaTypes) {
    state.AreaInfo = areaInfo
  },
  ResetArea(state) {
    state.SelectArea = {}
  },
  setSearchBoxTO(state, data: AreaTypes.SelectAreaTypes) {
    state.SearchboxTO = data
  },
  setSearchBoxRS(state, data: AreaTypes.SelectAreaTypes) {
    state.SearchboxRS = data
  },
  resetAreaInfo(state) {
    state.AreaInfo = ''
  }
}
