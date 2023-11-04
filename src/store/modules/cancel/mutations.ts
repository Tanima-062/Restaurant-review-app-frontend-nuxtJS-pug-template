import { CancelTypes } from '~/types/cancelTypes'
export default {
  setCancelPrice(state, data: CancelTypes.CancelPrice) {
    state.cancelPrice = { ...data }
  },
  setCancelStatus(state, data: CancelTypes.CancelStatus) {
    state.cancelStatus = { ...data }
  },
  setCancelPolicy(state, data: CancelTypes.CancelPolicy[]) {
    state.cancelPolicy = data
  }
}
