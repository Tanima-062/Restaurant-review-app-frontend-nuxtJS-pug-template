export default {
  dateSet(state, date) {
    state.date = date
  },
  hourSet(state, date) {
    state.hour = date
  },
  minSet(state, date) {
    state.min = date
  },
  timeSet(state, date) {
    state.time = date
  },
  setHoliday(state, data) {
    state.holiday = data
  }
}
