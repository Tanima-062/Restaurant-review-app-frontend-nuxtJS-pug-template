import { NotificationTypes } from '~/types/notificationType'

export default {
  setNotificationTO(state, data: NotificationTypes.NotificationTO) {
    state.NotificationTO = data
  },
  resetNotificationTO(state) {
    state.NotificationTO = {}
  },
  setNotificationRS(state, data: NotificationTypes.NotificationTO) {
    state.NotificationRS = data
  },
  resetNotificationRS(state) {
    state.NotificationRS = {}
  }
}
