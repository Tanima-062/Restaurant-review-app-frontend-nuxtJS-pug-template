export namespace UpdateTypes {
  export type ReservationChange = {
    status: boolean
    message: string
    returnUrl: string
    isOnlySeat: boolean
  }
  export type VacancyInfo = {
    vacancyTime: string
    people: number
    sets: number
  }
}
