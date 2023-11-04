type NotificationType = {
  id: number
  title: string
  message: string
  datetimeFrom: string
  datetimeTo: string
  publishedAt: string
  updateAt: string
}

export namespace NotificationTypes {
  export type NotificationTO = NotificationType
  export type NotificationRS = NotificationType
}
