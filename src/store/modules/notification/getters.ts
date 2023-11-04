import { NotificationTypes } from '~/types/notificationType'

export default {
  // Take out
  getNotificationTO: (state): NotificationTypes.NotificationTO => state.NotificationTO.notices,
  getDetailTO: (state) => (id: number) => state.NotificationTO.notices.find((v) => v.id === id),
  // Restaurant
  getNotificationRS: (state): NotificationTypes.NotificationRS => state.NotificationRS.notices,
  getDetailRS: (state) => (id: number) => state.NotificationRS.notices.find((v) => v.id === id)
}
