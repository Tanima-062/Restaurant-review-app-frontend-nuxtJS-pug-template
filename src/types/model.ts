export namespace ModelTypes {
  export interface DateInfo {
    date: string // YYYY/MM/DD
    day: number // 0.Sun 1.Mon 2.Tue 3.Wed 4.Thu 5.Fri 6.Sat
    displayValue: string // D
  }
  export interface DateRTNInfo {
    date: string // YYYY/MM/DD
    dates: string
    day: number // 0.Sun 1.Mon 2.Tue 3.Wed 4.Thu 5.Fri 6.Sat
    displayValue: string // D
  }
}
