import { UpdateTypes } from '~/types/updateTypes'
export default {
  setChangeInfo(state, reservationInfo) {
    state.changeInfo = { ...reservationInfo }
  },
  setChangedResult(state, reservationInfo: UpdateTypes.ReservationChange) {
    state.changedResult = { ...reservationInfo }
  },
  setVacancyInfo(state, reservationInfo: UpdateTypes.VacancyInfo[]) {
    state.vacancyInfo = reservationInfo
  },
  resetChangeInfo(state) {
    state.changeInfo = {
      date: '',
      time: '',
      persons: 0,
      request: '',
      reservationOptions: []
    }
  }
}
