import Vue from 'vue'
import isNull from 'lodash/isNull'
import { set, format } from 'date-fns'
import { searchBoxRS } from '~/store/modules/search_store'

const checksEnv = () => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    return false
  } else {
    return true
  }
}
/**
 * リリースを分ける用の関数
 * リリース直前にパラメータをtrueにすることで関連機能をリリースできるようにする
 * phase1をもっと細かく分けなくいけなくなったらその時分ける
 *
 * ・phase1:レストランをリリースするときに使うフラグ
 *
 * ・areaList：エリア一覧表示時１つ目の項目をオープンにする機能用のフラグ
 * （現状エリアが東京だけなのでオープンにする。増えてきたら閉じるようにする）
 *
 * ・review：クチコミ情報をリリースするときに使用するフラグ
 *
 * ・option:プランオプションリリース用のフラグ
 * これに関しては開発環境でも出したくないので別処理にする
 * 機能追加の時に処理外してください
 */
const feature = (id) => {
  const params = {
    phase1: true,
    areaList: false,
    review: false,
    option: false
  }
  if (id === 'option') {
    return false
  }
  return checksEnv() || params[id]
}

/**
 * 距離が1000以上の場合は小数第二位を四捨五入しkm表記で小数第一位まで表示
 * それ以外はm表記
 * 引数がNaNだった場合は0mで返す
 * @param val 距離
 * @returns km表記かm表記
 */
const distanceFormat = (val: string | number) => {
  const distance = Number(val)
  if (distance >= 1000) {
    return `${(Math.round(distance / 100) / 10).toFixed(1)}km`
  } else {
    return `${distance || 0}m`
  }
}

const moneyFormat = (val: number) => {
  return val === 0 || isNaN(val) ? '0' : val.toLocaleString()
}

// originalに存在しないプロパティがreplicaにある場合無視する
// また、originalの型を見てキャストしてから返す
// nullはnumberとして扱い、replica側もnullだった場合はnullにする
export const propertyFormat = (original, replica): { [key: string]: string | number | null } => {
  const ret = {}
  Object.keys(replica).forEach((key) => {
    /* eslint-disable-next-line */
    if (original.hasOwnProperty(key)) {
      let conversion
      if (replica[key] === undefined) {
        conversion = undefined
      } else if (typeof original[key] === 'string') {
        conversion = String(replica[key])
      } else if (typeof original[key] === 'number' || isNull(original[key])) {
        conversion = isNull(replica[key]) || isNaN(replica[key]) ? null : Number(replica[key])
      } else {
        conversion = replica[key]
      }
      Object.assign(ret, { [key]: conversion })
    }
  })
  return ret
}

// '',null,undefinedのものはクエリパラメーターから除外しreplaceする
export const setUrlQuery = (params): { [key: string]: string } => {
  const query = {}
  Object.keys(params).forEach((key) => {
    if (!['', null, undefined].includes(params[key])) {
      Object.assign(query, { [key]: String(params[key]) })
    }
  })
  return query
}

// '',null,undefined are excluded from query parameters and replaced as query string
export const urlQueryFormat = (params: { [key: string]: any }): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return query ? '?' + query : ''
}

// 現在の運用では24時間前までで予約を締め切るため当日の予約ができない仕様となっているため
// 検索日に店舗を検索しても予約できる店舗が少ないのでデフォルトの日付は翌日にする。
export const getVisitDate = () => {
  const day = new Date()
  day.setDate(day.getDate() + 1)
  return format(day, 'yyyy-MM-dd')
}

// 引数がfalsyだったら初期値を設定し返す
export const initVisitProperty = ({ visitDate, visitTime, visitPeople }) => {
  const date = visitDate || getVisitDate()
  const time = visitTime || '19:00'
  const people = visitPeople || 2
  return { visitDate: date, visitTime: time, visitPeople: people }
}

// HH:mm書式で00:00〜23:59までの範囲が有効になるように正規表現でチェック
export const isTime = (str: string): boolean => {
  return str.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/) !== null
}
// データをチェックし有効な値であればその日付を使用（一日前の日付の場合は今日の日付にする）
// 無効な値or未入力であれば本日の日付か19時を超えていた場合は次の日付を返す
export const formatDateTime = ({
  date,
  time
}: {
  date: string
  time: string
}): { visitDate: string; visitTime: string } => {
  const ret = { visitDate: '', visitTime: '' }
  const currentDateTime = new Date()
  const inputDateTime = new Date(`${date.replace(/-/g, '/')} ${time}`)

  if (!(currentDateTime < inputDateTime)) {
    const { visitDate, visitTime } = initVisitProperty(searchBoxRS)
    const baseDate = visitDate
    const baseTime = visitTime

    const retTime = isTime(time) ? time : baseTime
    let retDate
    const today = set(currentDateTime, { hours: 0, minutes: 0, seconds: 0 })
    // 未指定の場合や前日が指定されていた場合
    if (!(today < new Date(`${date} 00:00:00`))) {
      retDate = baseDate
    } else {
      retDate = date
    }
    Object.assign(ret, { visitDate: retDate, visitTime: retTime })
  } else {
    Object.assign(ret, { visitDate: date, visitTime: time })
  }
  return ret
}

/**
 * 文字列を郵便番号形式に変換
 * @param val 郵便番号(ハイフン無)
 * @returns 郵便番号(ハイフン有)
 */
export const zipCodeFormat = (val: string) => {
  const isNumeric = /^-?\d+$/.test(val)
  if (isNumeric && val.trim().length === 7) {
    const originalValue = val.trim()
    const head = originalValue.substr(0, 3)
    const tail = originalValue.substr(3)
    val = `〒${head}-${tail}`
    return val
  }
  return ''
}

// 現状管理画面で電話番号登録時ハイフン込みで入力いただくフリーテキストとしているので未使用
export const telNumberFormat = (val: string) => {
  const isNumeric = /^-?\d+$/.test(val)

  if (isNumeric && val.trim().length === 10) {
    const originalValue = val.trim()
    const head = originalValue.substr(0, 2)
    const body = originalValue.substr(2, 4)
    const tail = originalValue.substr(6)
    val = `${head}-${body}-${tail}`
    return val
  } else if (isNumeric && val.trim().length === 11) {
    const originalValue = val.trim()
    const head = originalValue.substr(0, 3)
    const body = originalValue.substr(3, 4)
    const tail = originalValue.substr(7)
    val = `${head}-${body}-${tail}`
    return val
  }
  return ''
}

// 現状管理画面で電話番号登録時ハイフン込みで入力いただくフリーテキストとしているので未使用
export const internationalTelFormat = (val: string) => {
  const isNumeric = /^-?\d+$/.test(val)
  if (isNumeric && val.trim().length === 11) {
    const internationalCode = '+81' // 日本
    const originalValue = val.trim()
    const head = originalValue.substr(1, 2)
    const body = originalValue.substr(3, 4)
    const tail = originalValue.substr(7)
    val = `tel:${internationalCode}-${head}-${body}-${tail}`
    return val
  } else if (isNumeric && val.trim().length === 10) {
    const originalValue = val.trim()
    const head = originalValue.substr(0, 2)
    const body = originalValue.substr(2, 4)
    const tail = originalValue.substr(6)
    val = `tel:${head}-${body}-${tail}`
    return val
  }
  return ''
}

declare module 'vue/types/vue' {
  interface Vue {
    $isTime: (str: string) => boolean
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $isTime: (str: string) => boolean
  }
  interface Context {
    $isTime: (str: string) => boolean
  }
}

// eslint-disable-next-line
export default ({ }, inject) => {
  inject('checksEnv', checksEnv)
  inject('distanceFormat', distanceFormat)
  inject('feature', feature)
  inject('isTime', isTime)
  inject('moneyFormat', moneyFormat)
  inject('telNumberFormat', telNumberFormat)
  inject('internationalTelFormat', internationalTelFormat)
  inject('zipCodeFormat', zipCodeFormat)
}
Vue.prototype.$checksEnv = checksEnv
Vue.prototype.$distanceFormat = distanceFormat
Vue.prototype.$feature = feature
Vue.prototype.$isTime = isTime
Vue.prototype.$moneyFormat = moneyFormat
Vue.prototype.$zipCodeFormat = zipCodeFormat
Vue.prototype.$telNumberFormat = telNumberFormat
Vue.prototype.$internationalTelFormat = internationalTelFormat
