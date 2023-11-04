<template lang="pug">
.container
  template(
    v-if='stores && stores !== "notStore"',
    v-for='(store, i) in stores'
  )
    .store
      nuxt-link.imgsarea(
        :to='isTakeout ? `/restaurant/detail/takeout/${store.id}/?type=take` : `/restaurant/detail/takeout/${store.id}`'
      )
        img.-img(
          v-if='(store.storeImage.imageUrl && !isTakeout) || (store.storeImage.imageUrl && store.openinghours && storeClosed(store.openinghours))',
          :src='store.storeImage.imageUrl + "?imwidth=123&imdensity=1"',
          :alt='store.name',
          loading='lazy'
        )
        .-overlay(
          v-else-if='isTakeout && store.openinghours && !storeClosed(store.openinghours)'
        )
          img.-img(
            v-if='store.storeImage.imageUrl',
            :src='store.storeImage.imageUrl + "?imwidth=123&imdensity=1"',
            :alt='store.name',
            loading='lazy'
          )
          no-image.-img(v-else, size='xs')
          .-onText
            paragraph(fontSize='tiny', color='white') {{ onImageText(store.openinghours) }}
        no-image.-img(v-else, size='xs')
      .-info
        nuxt-link(
          :to='isTakeout ? `/restaurant/detail/takeout/${store.id}/?type=take` : `/restaurant/detail/takeout/${store.id}`'
        )
          .-name
            paragraph-bold.shrink(fontSize='small', letterSpacing='none') {{ store.name }}
          .-genre
            paragraph(fontSize='tiny', letterSpacing='none') {{ genreText(store.storeGenres) }}
          .-distance
            template(v-if='store.distance')
              paragraph(fontSize='tiny', letterSpacing='none') {{ $distanceFormat(store.distance) }}
          .-bottoms(v-if='isTakeout')
            .-price(v-if='store.priceLevel === 1')
              paragraph(fontSize='tiny', letterSpacing='none') ¥
              paragraph#gray(fontSize='tiny', letterSpacing='none') ¥¥¥
            .-price(v-else-if='store.priceLevel === 2')
              paragraph(fontSize='tiny', letterSpacing='none') ¥¥
              paragraph#gray(fontSize='tiny', letterSpacing='none') ¥¥
            .-price(v-else-if='store.priceLevel === 3')
              paragraph(fontSize='tiny', letterSpacing='none') ¥¥¥
              paragraph#gray(fontSize='tiny', letterSpacing='none') ¥
            .-price(v-else)
              paragraph(fontSize='tiny', letterSpacing='none') ¥¥¥¥
            img.-icons(
              src='~@/assets/gif/cooking.gif',
              alt='スカイチケット注文ステップ',
              v-if='store.lowerOrdersTime'
            )
            .-cooktime(v-if='isTakeout')
              paragraph(
                fontSize='tiny',
                letterSpacing='none',
                v-if='store.lowerOrdersTime'
              ) {{ store.lowerOrdersTime }}分
          template(v-if='isTakeout')
            .-openTime(
              v-for='item in openingHours(store.openinghours)',
              v-if='isOpeningDay(item)'
            )
              clock-icon.-icon
              paragraph.-text(fontSize='tiny', letterSpacing='none') {{ item.openingTime.slice(0, -3) }} ~ {{ item.closeTime.slice(0, -3) }}
            .-closeWeek(
              v-if='store.openinghours && breakweek(store.openinghours).length > 0 && onImageText(store.openinghours) === "休業中"'
            )
              paragraph.-text.-mr(fontSize='tiny', letterSpacing='none') 休業日 :
              paragraph.-text.-mr-2(
                fontSize='tiny',
                letterSpacing='none',
                v-for='num in breakweek(store.openinghours)',
                :key='num'
              ) {{ NumtoWeek(num) }}
          template(v-else)
            .-price
              .-price-wrapper
                day-icon
                div {{ priceFormat(store.daytimeBudgetLowerLimit) }}
              .-price-wrapper
                night-icon
                div {{ priceFormat(store.nightBudgetLowerLimit) }}
        .-restaurantCourse(v-if='!isTakeout && store.recommendMenu')
          button.-course(@click='courseClick(store.id)')
            paragraph.-Cname(fontSize='tiny') {{ store.recommendMenu.name }}
            Span.-Cprice(fontSize='tiny') {{ `${$moneyFormat(Number(store.recommendMenu.price.price))}円` }}
  .notStore(v-if='stores && stores === "notStore"')
    paragraph(fontSize='m') お探しの条件は見つかりませんでした。
    paragraph(fontSize='m') お手数ですが、再検索をお願いいたします。
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import cloneDeep from 'lodash/cloneDeep'
import ClockIcon from '~/assets/icon/clock.svg'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import DayIcon from '~/assets/icon/day.svg'
import NightIcon from '~/assets/icon/night.svg'
import NoImage from '~/components/atoms/noImage/index.vue'
import { StoreTypes } from '~/types/storeTypes'
import { ListStoreTypes } from '~/types/ListStoreTypes'
@Component({
  components: {
    ClockIcon,
    DayIcon,
    NightIcon,
    NoImage,
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold
  }
})
export default class SearchListGrid extends Vue {
  @Prop() stores?: string
  @Prop({ default: 'TO' }) gourmetType?: string
  price = 1
  created() {
    this.$store.dispatch('modules/date/setHoliday', new Date().getFullYear())
  }

  // 営業中か休業中かを判定する.trueなら営業中falseなら休業中
  storeClosed(list: StoreTypes.Openhours[]) {
    // console.log(list)
    let flag = false // 1度でも当てはまれば良いのでflag判定
    let listWeek = false

    for (let i = 0; i < list.length; i++) {
      const listOpeningTime = list[i].openingTime.split(':') // resのopening時間を分解
      const listOpenEva = Number(listOpeningTime[0]) * 60 + Number(listOpeningTime[1]) // 時間を分に
      const listClosingTime = list[i].closeTime.split(':') // resのclosing時間を分解
      const listCloseEva = Number(listClosingTime[0]) * 60 + Number(listClosingTime[1]) // 時間を分に
      const nowTimeEva = new Date().getHours() * 60 + new Date().getMinutes() // 現在時刻(分)
      // 祝日営業確認
      if (this.isHoliday && list[i].week.charAt(7) === '1') {
        listWeek = true
        // 日曜日営業判断
      } else if (!this.isHoliday && new Date().getDay() === 0 && list[i].week.charAt(6) === '1') {
        listWeek = true
        // resのweek内で今日の曜日を見る
      } else if (!this.isHoliday && list[i].week.charAt(new Date().getDay() - 1) === '1') {
        listWeek = true
      }
      if (listOpenEva < nowTimeEva && nowTimeEva < listCloseEva && listWeek) {
        flag = true
      }
    }
    return flag
  }

  getTimeList(data) {
    for (let i = 0; i < data.length; i++) {
      return data[i].openingTime + data[i].closeTime
    }
  }

  openingHours(openingHours) {
    const storeInfo: ListStoreTypes.MapHourTypes[] = cloneDeep(openingHours)
    const isToday = storeInfo.filter((openingHour) => {
      if (this.isHoliday && openingHour.week.charAt(7) === '1') {
        return openingHour.week.charAt(7) === '1'
      } else if (!this.isHoliday && new Date().getDay() === 0 && openingHour.week.charAt(6) === '1') {
        return openingHour.week.charAt(6) === '1'
      } else if (!this.isHoliday && openingHour.week.charAt(new Date().getDay() - 1) === '1') {
        return openingHour.week.charAt(new Date().getDay() - 1) === '1'
      }
    })

    const midNightFormatter: ListStoreTypes.MapHourTypes = {
      id: 0,
      openingTime: '',
      code: '',
      lastOrderTime: '',
      closeTime: '',
      week: ''
    }
    isToday.forEach((openingHour) => {
      if (openingHour.openingTime === '00:00:00') {
        Object.assign(midNightFormatter, {
          id: openingHour.id,
          code: openingHour.code,
          week: openingHour.week,
          lastOrderTime: openingHour.lastOrderTime
        })
        Object.assign(midNightFormatter, { closeTime: openingHour.closeTime })
      }
      if (openingHour.closeTime === '23:59:00') {
        Object.assign(midNightFormatter, {
          id: openingHour.id,
          code: openingHour.code,
          week: openingHour.week,
          lastOrderTime: openingHour.lastOrderTime
        })
        Object.assign(midNightFormatter, {
          openingTime: openingHour.openingTime
        })
      }
    })

    if (midNightFormatter.openingTime && !midNightFormatter.closeTime) {
      isToday.forEach((store) => {
        if (store.id === midNightFormatter.id) {
          midNightFormatter.closeTime = store.closeTime
        }
      })
    } else if (!midNightFormatter.openingTime && midNightFormatter.closeTime) {
      isToday.forEach((store) => {
        if (store.id === midNightFormatter.id) {
          midNightFormatter.openingTime = store.openingTime
        }
      })
    }

    const hasDailyHours = isToday.filter((hours) => {
      return hours.openingTime !== '00:00:00' && hours.closeTime !== '23:59:00'
    })
    const midNightHour: ListStoreTypes.MapHourTypes[] = []

    if (midNightFormatter.id) {
      midNightHour.push(midNightFormatter)
    }
    const result = hasDailyHours.concat(midNightHour)

    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].code === result[j].code) {
          result.splice(i, 1)
        }
      }
    }
    return result
  }

  onImageText(list: StoreTypes.Openhours[]) {
    let flag = false
    for (let i = 0; i < list.length; i++) {
      if (this.isHoliday && list[i].week.charAt(7) === '1') {
        flag = true
      } else if (!this.isHoliday && new Date().getDay() === 0 && list[i].week.charAt(6) === '1') {
        flag = true
      } else if (!this.isHoliday && list[i].week.charAt(new Date().getDay() - 1) === '1') {
        flag = true
      }
    }
    if (flag) {
      return '準備中\n（予約可）'
    } else {
      return '休業中'
    }
  }

  breakweek(list: StoreTypes.Openhours[]) {
    if (list) {
      const breakBox: number[] = []
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < 8; j++) {
          if (list[i].week.charAt(j) === '1') {
            breakBox.push(j)
          }
        }
      }
      // duplicateを弾いて戻す
      const a = Array.from(new Set(breakBox))
      const b = [0, 1, 2, 3, 4, 5, 6, 7]
      const newData = this.getArraysDiff(a, b)
      return newData
    }
  }

  getArraysDiff = (array01, array02) => {
    const arr01 = [...new Set(array01)]
    const arr02 = [...new Set(array02)]
    return [...arr01, ...arr02].filter((value) => !arr01.includes(value) || !arr02.includes(value))
  }

  NumtoWeek(num: number) {
    if (num === 0) {
      return '月'
    } else if (num === 1) {
      return '火'
    } else if (num === 2) {
      return '水'
    } else if (num === 3) {
      return '木'
    } else if (num === 4) {
      return '金'
    } else if (num === 5) {
      return '土'
    } else if (num === 6) {
      return '日'
    } else {
      return '祝'
    }
  }

  genreText(genreBox: StoreTypes.StoreGenres[]) {
    let textdata = ''
    let count = 0
    for (let i = 0; i < genreBox.length; i++) {
      if (genreBox[i].isDelegate === 1) {
        if (count === 0) {
          textdata = textdata + genreBox[i].name
        } else {
          textdata = textdata + '/' + genreBox[i].name
        }
        count++
      }
    }
    return textdata
  }

  priceFormat(price: number | null) {
    if (price === null) {
      return '---'
    }
    return `${this.$moneyFormat(price)}円〜`
  }

  get isTakeout() {
    return this.gourmetType === 'TO'
  }

  // 当日営業確認
  get isOpeningDay() {
    return (item) =>
      (this.isHoliday && item.week.charAt(7) === '1') ||
      (!this.isHoliday && new Date().getDay() === 0 && item.week.charAt(6) === '1') ||
      (!this.isHoliday && item.week.charAt(new Date().getDay() - 1) === '1')
  }

  courseClick(storeId: number): void {
    this.$router.push(`/restaurant/detail/takeout/${storeId}/?type=plan`)
  }

  // 祝日確認
  get isHoliday(): boolean {
    return Object.keys(this.getHolidayList).includes(this.dayFormatter)
  }

  // 年月日xxxx-0x(xx)-0x(xx)のフォーマット
  get dayFormatter(): string {
    const today = new Date()
    return format(today, 'yyyy-MM-dd')
  }

  // 祝日取得
  get getHolidayList() {
    return this.$store.getters['modules/date/getHoliday']
  }
}
</script>
<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 1fr
  grid-auto-rows：1fr
  grid-row-gap: 24px
  min-height: 0
  .notStore
    width: 100%
    text-align: center
  .store
    display: flex
    height: 123px
    width: 100%
    .imgsarea
      height: 123px
      width: 123px
      min-height: 123px
      min-width: 123px
    .-img
      max-width: 100%
      max-height: 100%
      height: 123px
      width: 123px
      object-fit: cover
    .-overlay
      position: relative
      width: 100%
      height: 100%
      &:before
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.6)
      .-onText
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        color: #fff
        width: 100%
        text-align: center
        white-space: pre-line
    .-info
      width: 75%
      display: flex
      flex-direction: column
      justify-content: space-between
      padding: 0 16px 14px 16px
      a
        &:hover
          opacity: 0.6
      .-distance
        line-height: 1.5
      .-genre
        line-height: 1.5
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 1
        overflow: hidden
      .-price
        display: flex
        align-items: center
        #gray
          color: $gray
        .-value
          margin-right: 2px
        .-day
          width: 15px
          height: 15px
          margin-right: 5px
        .-night
          width: 15px
          height: 15px
          margin-right: 5px
      .-bottoms
        display: flex
        .-price
          width: 40px
        .-icons
          width: 20px
          height: 20px
        .-cooktime
          width: 100px
      .-openTime
        position: relative
        .-icon
          position: absolute
          left: 0
          width: 12px
          top: -30%
          fill: $dark_gray
        .-text
          padding-left: 15px
      .-closeWeek
        .-text
          float: left
        .-mr
          padding-right: 1em
        .-mr-2
          padding-right: 2px
      .-course
        display: flex
        width: 100%
        margin: 8px 0 0
        padding: 8px
        outline: none
        cursor: pointer
        background-color: $light_gray
        border: none
        .-Cname
          color: $main_color
          text-align: left
          width: 60%
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          overflow: hidden
        .-Cprice
          width: 40%
          text-align: right
        &:hover
          background-color: $main_color
          .-Cname
            color: white
          .-Cprice
            color: white
      .-price
        display: grid
        grid-template-columns: max-content max-content
        gap: 2px
        .-price-wrapper
          display: grid
          grid-template-columns: max-content max-content
          gap: 5px
          font-size: 12px
          align-items: center
          svg
            width: 12px
            height: 12px
.shrink
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 1
  overflow: hidden
@include pc_view
  .container
    display: grid
    grid-template-columns: 1fr 1fr
    grid-auto-rows：1fr
    grid-row-gap: 16px
    .notStore
      width: 100%
      text-align: left
      margin: 20px 0
    .store
      display: flex
      height: 123px
      .-img
        max-width: 100%
        width: 123px
        &:hover
          opacity: 0.6
      .-info
        display: flex
        flex-direction: column
        justify-content: space-between
        padding: 0 16px 14px 16px
</style>
