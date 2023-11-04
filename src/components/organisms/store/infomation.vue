<template lang="pug">
.infomationComponent
  .coupon
    paragraph.description(fontSize='tiny') {{ restaurantInfo.description }}
  hr.sectionLast
  template(v-if='$feature("phase1")')
    paragraph-bold.-head.title(fontSize='small') 住所
    paragraph.description(fontSize='tiny') {{ $zipCodeFormat(restaurantInfo.postalCode) }} {{ restaurantInfo.address }}
    .maps
      iframe.frame(
        :src='"https://www.google.com/maps/embed/v1/place?key=AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw&q=" + restaurantInfo.latitude + "," + restaurantInfo.longitude',
        frameborder='0'
      )
    hr.sectionLast
    div(v-if='restaurantInfo.telOrder')
      paragraph-bold.-head.title(fontSize='small') 予約専用電話番号
      .-head.reservation-tel(v-if='isPC()')
        phone-icon.reservation-tel_icon
        span-bold(fontSize='medium', color='spare_gray') {{ restaurantInfo.telOrder }}
      a(v-else, :href='restaurantInfo.telOrder')
        .-head.reservation-tel
          phone-icon.reservation-tel_icon
          span-bold(fontSize='medium', color='spare_gray') {{ restaurantInfo.telOrder }}
      hr.sectionLast
  paragraph-bold.-head.title(fontSize='small') 営業時間
  div(v-for='(item, index) in openingHours', :key='item')
    paragraph.description(fontSize='tiny', whiteSpace='break-spaces') {{ item }}
  notification-small.info(
    title='新型コロナウイルスの影響により、営業時間・定休日等が記載と異なる場合がございます。改めてご来店前に店舗へご確認をお願いします。',
    type='error',
    icon='warning'
  )
  hr.sectionLast
  paragraph-bold.-head.title(fontSize='small') 定休日

  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(0) == 0'
  ) 月
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(1)==0||restaurantInfo.regularHoliday.charAt(2)==0||restaurantInfo.regularHoliday.charAt(3)==0||restaurantInfo.regularHoliday.charAt(4)==0||restaurantInfo.regularHoliday.charAt(5)==0||restaurantInfo.regularHoliday.charAt(6)==0||restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(1) == 0'
  ) 火
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(2)==0||restaurantInfo.regularHoliday.charAt(3)==0||restaurantInfo.regularHoliday.charAt(4)==0||restaurantInfo.regularHoliday.charAt(5)==0||restaurantInfo.regularHoliday.charAt(6)==0||restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(2) == 0'
  ) 水
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(3)==0||restaurantInfo.regularHoliday.charAt(4)==0||restaurantInfo.regularHoliday.charAt(5)==0||restaurantInfo.regularHoliday.charAt(6)==0||restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(3) == 0'
  ) 木
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(4)==0||restaurantInfo.regularHoliday.charAt(5)==0||restaurantInfo.regularHoliday.charAt(6)==0||restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(4) == 0'
  ) 金
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(5)==0||restaurantInfo.regularHoliday.charAt(6)==0||restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(5) == 0'
  ) 土
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(6)==0||restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(6) == 0'
  ) 日
    Span.description(
      fontSize='tiny',
      v-show='restaurantInfo.regularHoliday.charAt(7)==0'
    ) 、
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday.charAt(7) == 0'
  ) 祝日
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday == "111111110"'
  ) 無し
  Span.description(
    fontSize='tiny',
    v-show='restaurantInfo.regularHoliday == "1111111110"'
  ) 不定休
  hr.sectionLast
  div(v-if='restaurantInfo.numberOfSeats')
    paragraph-bold.-headr.title(fontSize='small') 座席数
    paragraph.-head.description(
      fontSize='tiny',
      v-if='restaurantInfo.numberOfSeats'
    ) {{ restaurantInfo.numberOfSeats }}席
    hr.sectionLast
  paragraph-bold.-head.title(fontSize='small') ご利用が可能なカード
  paragraph.-head.description(fontSize='small', v-if='!restaurantInfo.canCard') 対応しておりません
  ul.description(v-else, v-for='item in CardType')
    li
      Span.-head.description(fontSize='tiny', v-if='item === "VISA"') VISA
      Span.-head.description(fontSize='tiny', v-else-if='item === "MASTER"') Master
      Span.-head.description(fontSize='tiny', v-else-if='item === "JCB"') JCB
      Span.-head.description(fontSize='tiny', v-else-if='item === "AMEX"') Amex
      Span.-head.description(fontSize='tiny', v-else-if='item==="DINERS"') ダイナース
      Span.-head.description(fontSize='tiny', v-else-if='item==="OTHER"') その他
  hr.sectionLast
  paragraph-bold.-head.title(fontSize='small') ご利用可能な電子マネー
  paragraph.-head.description(
    fontSize='tiny',
    v-if='!restaurantInfo.canDigitalMoney'
  ) 対応しておりません
  ul.description(v-else, v-for='item in DigitalMoney')
    li
      Span.-head.description(fontSize='tiny', v-if='item === "SUICA"') 交通費電子マネー(suicaなど)
      Span.-head.description(fontSize='tiny', v-else-if='item === "NANACO"') nanaco
      Span.-head.description(fontSize='tiny', v-else-if='item === "WAON"') WAON
      Span.-head.description(fontSize='tiny', v-else-if='item === "ID"') ID
      Span.-head.description(fontSize='tiny', v-else-if='item === "QUICPAY"') QUICPay
      Span.-head.description(fontSize='tiny', v-else-if='item === "PAYPAY"') PayPay
      Span.-head.description(fontSize='tiny', v-else-if='item === "MERPAY"') メルペイ
      Span.-head.description(fontSize='tiny', v-else-if='item === "EDY"') 楽天Edy
      Span.-head.description(fontSize='tiny', v-else-if='item === "OTHER"') その他
      Span.-head.description(fontSize='tiny', v-else)
  hr.sectionLast
  div(v-if='restaurantInfo.smoking')
    paragraph-bold.-head.title(fontSize='small') 喫煙可否
    div(v-if='restaurantInfo.smokingTypes')
      paragraph.-head.description(
        fontSize='small',
        v-if='restaurantInfo.smokingTypes === "SEPARATE"'
      ) 分煙
      paragraph.-head.description(
        fontSize='small',
        v-else-if='restaurantInfo.smokingTypes === "ALL_OK"'
      ) 全面喫煙可
      paragraph.-head.description(fontSize='tiny', v-else) 完全禁煙
      hr.sectionLast
  paragraph-bold.-head.title(fontSize='small') 貸切（有/無）
  paragraph.-head.description(
    fontSize='tiny',
    v-if='!restaurantInfo.canCharter'
  ) 貸切は行っておりません。
  paragraph(fontSize='small', v-else)
    Span.-head.description(
      fontSize='tiny',
      v-if='restaurantInfo.charterTypes === "20_UNDER_PEOPLE_C"'
    ) 20人以下可能
    Span.-head.description(
      fontSize='tiny',
      v-if='restaurantInfo.charterTypes === "20-50_PEOPLE_C"'
    ) 20~50人可能
    Span.-head.description(
      fontSize='tiny',
      v-if='restaurantInfo.charterTypes === "50_PEOPLE_C"'
    ) 50人以上可能
  hr.sectionLast
  paragraph-bold.-head.title(fontSize='small') 個室（有/無）
  paragraph.-head.description(
    fontSize='tiny',
    v-if='restaurantInfo.privateRoomTypes == null'
  ) 個室はございません
  ul.description(v-else, v-for='item in BoxSeats')
    li
      Span.-head.description(fontSize='tiny', v-if='item === "2_PEOPLE"') 2人席有り
      Span.-head.description(fontSize='tiny', v-else-if='item === "4_PEOPLE"') 4人席有り
      Span.-head.description(fontSize='tiny', v-else-if='item === "6_PEOPLE"') 6人席有り
      Span.-head.description(fontSize='tiny', v-else-if='item === "8_PEOPLE"') 8人席有り
      Span.-head.description(
        fontSize='tiny',
        v-else-if='item === "10-20_PEOPLE"'
      ) 10-20人席有り
      Span.-head.description(
        fontSize='tiny',
        v-else-if='item === "20-30_PEOPLE"'
      ) 20-30人席有り
      Span.-head.description(fontSize='tiny', v-else='item==="30_OVER_PEOPLE"') 30人以上席有り
  hr.sectionLast
  paragraph-bold.-headr.title(fontSize='small') 駐車場（有/無）
  paragraph.-head.description(
    fontSize='tiny',
    v-if='!restaurantInfo.hasParking'
  ) 無し
  paragraph.-head.description(fontSize='tiny', v-else) 有り
  hr.sectionLast
  paragraph-bold.-headr.title(fontSize='small') 近隣にコインパーキング（有/無）
  paragraph.-head.description(
    fontSize='tiny',
    v-if='!restaurantInfo.hasCoinParking'
  ) 無し
  paragraph.-head.description(fontSize='tiny', v-else) 有り
  hr.sectionLast
  div(v-if='restaurantInfo.tel')
    paragraph-bold.-headr.title(fontSize='small') お問合せ用電話番号
    paragraph.-head.description(fontSize='tiny') {{ restaurantInfo.tel }}
  hr.sectionLast
  div(v-if='restaurantInfo.account')
    paragraph-bold.-headr.title(fontSize='small') 公式SNSアカウント
    paragraph.-head.description(fontSize='tiny') {{ restaurantInfo.account }}
    hr.sectionLast
  paragraph-bold.-headr.title(fontSize='small') その他情報
  paragraph.-head.-etc.description(
    fontSize='tiny',
    v-if='restaurantInfo.remarks'
  ) {{ restaurantInfo.remarks }}
  paragraph.-head.description(fontSize='tiny', v-else) 無し
  hr.sectionLast
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import NotificationSmall from '~/components/molecules/card/NotificationSmall.vue'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import PhoneIcon from '~/assets/icon/phone-call.svg'
import { ListStoreTypes } from '~/types/ListStoreTypes'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    NotificationSmall,
    PhoneIcon
  }
})
export default class Infomation extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $ua: any
  @Prop({ default: '鴨胸肉のロースト' }) title?: string

  get restaurantInfo() {
    return this.$store.getters['modules/listStore/getStore']
  }

  get BoxSeats() {
    const stringData = this.restaurantInfo.privateRoomTypes
    if (stringData != null) {
      const arrayData = stringData.split(',')
      return arrayData
    }
  }

  get DigitalMoney() {
    const stringData = this.restaurantInfo.digitalMoneyTypes
    if (stringData != null) {
      const arrayData = stringData.split(',')
      return arrayData
    }
  }

  get CardType() {
    const stringData = this.restaurantInfo.cardTypes
    if (stringData != null) {
      const arrayData = stringData.split(',')
      return arrayData
    }
  }

  genreText(): string {
    const genreBox = this.restaurantInfo.storeGenres
    let textdata = ''
    let count = 0
    for (let i = 0; i < genreBox.length; i++) {
      if (genreBox[i].path.startsWith('/b-cooking')) {
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

  get openingHours(): string[] {
    // eslint-disable-next-line prettier/prettier
    const openingHours: ListStoreTypes.OpeningHourTypes[] = this.restaurantInfo.openingHours
    const openingInfoStr: string[] = []
    const bundle = {}
    // 曜日表示が重複されないように架空
    openingHours.forEach((openingHour) => {
      if (bundle[openingHour.week]) {
        bundle[openingHour.week].openingHourCd.push(this.convertOpeningHourCd(openingHour.openingHourCd))
        bundle[openingHour.week].openTime.push(openingHour.openTime.slice(0, -3))
        bundle[openingHour.week].closeTime.push(openingHour.closeTime.slice(0, -3))
        if (openingHour.lastOrderTime) {
          bundle[openingHour.week].lastOrderTime.push(openingHour.lastOrderTime.slice(0, -3))
        }
      } else if (openingHour.lastOrderTime) {
        bundle[openingHour.week] = {
          openingHourCd: [this.convertOpeningHourCd(openingHour.openingHourCd)],
          openTime: [openingHour.openTime.slice(0, -3)],
          closeTime: [openingHour.closeTime.slice(0, -3)],
          lastOrderTime: [openingHour.lastOrderTime.slice(0, -3)]
        }
      } else {
        bundle[openingHour.week] = {
          openingHourCd: [this.convertOpeningHourCd(openingHour.openingHourCd)],
          openTime: [openingHour.openTime.slice(0, -3)],
          closeTime: [openingHour.closeTime.slice(0, -3)]
        }
      }
    })
    // openingコードを日本語化
    const openWeek = Object.keys(bundle).map((week) => {
      return this.dayOfWeek(week)
    })
    // eslint-disable-next-line prettier/prettier
    const storeInfo: ListStoreTypes.NewOpeningHourTypes[] = Object.values(bundle)

    openWeek.forEach((week) => {
      openingInfoStr.push(`[${week.join('、')}]`)
    })

    // 深夜のデータ一つに結合
    const midNightArray: Array<ListStoreTypes.OpeningHourTypes> = []
    let midNightFormatter
    const beforeStoreInfo = cloneDeep(storeInfo)
    storeInfo.forEach((info) => {
      midNightFormatter = {}
      info.openTime.forEach((openTime, index) => {
        if (openTime === '00:00') {
          Object.assign(midNightFormatter, { closeTime: info.closeTime[index] })
          Object.assign(midNightFormatter, {
            lastOrderTime: info.lastOrderTime[index]
          })
          Object.assign(midNightFormatter, {
            openingHourCd: info.openingHourCd[index]
          })
          info.openTime.splice(index, 1)
          info.lastOrderTime.splice(index, 1)
          info.openingHourCd.splice(index, 1)
          info.closeTime.splice(index, 1)
        }
      })
      info.closeTime.forEach((closeTime, index) => {
        if (closeTime === '23:59') {
          Object.assign(midNightFormatter, { openTime: info.openTime[index] })
          info.openTime.splice(index, 1)
          info.lastOrderTime.splice(index, 1)
          info.openingHourCd.splice(index, 1)
          info.closeTime.splice(index, 1)
        }
      })
      if (Object.keys(midNightFormatter).length) {
        midNightArray.push(midNightFormatter)
      }
    })

    midNightArray.forEach((midNightInfo, index) => {
      storeInfo[index].openTime.push(midNightInfo.openTime)
      storeInfo[index].openingHourCd.push(midNightInfo.openingHourCd)
      storeInfo[index].closeTime.push(midNightInfo.closeTime)
      storeInfo[index].lastOrderTime.push(midNightInfo.lastOrderTime)
    })

    storeInfo.forEach((info, index) => {
      // 24:00が閉店の場合対応
      info.closeTime.forEach((closeTime) => {
        if (!closeTime) {
          storeInfo[index] = beforeStoreInfo[index]
        }
      })
      // 00:00が開店の場合対応
      info.openTime.forEach((openTime) => {
        if (!openTime) {
          storeInfo[index] = beforeStoreInfo[index]
        }
      })
    })

    storeInfo.forEach((info) => {
      for (let i = 0; i < info.openingHourCd.length; i++) {
        for (let j = i + 1; j < info.openingHourCd.length; j++) {
          if (info.openingHourCd[i] === info.openingHourCd[j]) {
            info.openTime.splice(i, 1)
            info.closeTime.splice(i, 1)
            info.lastOrderTime.splice(i, 1)
            info.openingHourCd.splice(i, 1)
          }
        }
      }
    })

    storeInfo.forEach((info, index) => {
      for (let i = 0; i < info.openingHourCd.length; i++) {
        openingInfoStr[index] = openingInfoStr[index].concat(
          `\n${info.openingHourCd[i]}  ${info.openTime[i]}~${info.closeTime[i]}  ${
            info.lastOrderTime ? `(LO${info.lastOrderTime[i]})` : ''
          }`
        )
      }
    })

    return openingInfoStr
  }

  convertOpeningHourCd(hourCd: string): string {
    let convertHourCd = ''
    switch (hourCd) {
      case 'MORNING':
        convertHourCd = 'モーニング'
        break
      case 'DAYTIME':
        convertHourCd = 'ランチ'
        break
      case 'NIGHT':
        convertHourCd = 'ディナー'
        break
      case 'ALL_DAY':
        convertHourCd = '通し営業(1日中)'
    }

    return convertHourCd
  }

  dayOfWeek(week: string): string[] {
    const weeksDay = week.substring(0, 5).split('')
    const weekend = week.substring(5).split('')
    let displayWeek: string[] = []
    const weeksDayStr = ['月', '火', '水', '木', '金']
    const weekendStr = ['土', '日', '祝日']

    weeksDay.forEach((day, index) => {
      if (day === '1') {
        displayWeek.push(weeksDayStr[index])
      }
    })
    const allWeeksDay = weeksDay.every((day) => {
      return day === '1'
    })

    if (allWeeksDay) {
      displayWeek = ['平日']
    }

    weekend.forEach((day, index) => {
      if (day === '1') {
        displayWeek.push(weekendStr[index])
      }
    })
    return displayWeek
  }

  isPC() {
    const deviceType = this.$ua.deviceType()
    if (deviceType === 'pc') {
      return true
    }
    return false
  }
}
</script>
<style lang="sass">
.infomationComponent.-content
  margin-left: 16px
  margin-right: 16px
.info
  margin-top: 16px
.infomationComponent
  line-height: 1.5
  .sectionLast
    margin: 20px auto
    height: 1px
    background-color: $gray
  .coupon
    padding: 16px
    background-color: rgba(221, 241, 255, 1)
    .text
      color: $sub_color
  .maps
    margin-top: 16px
    .frame
      width: 100%
  .reservation-tel
    display: flex
    justify-content: center
    align-items: center
    height: 52px
    border: solid 1px $dark_gray
    border-radius: 4px
    &_icon
      width: 19px
      height: 19px
      margin-right: 8px
      fill: $spare_gray
  .ml-20
    margin-left: 20px
  .-head
    margin-top: 16px
  .description
    white-space: pre-wrap
    margin-top: 8px
    line-height: 1.33
  .-etc
    white-space: pre-line
  @include pc_view
    .infomationComponent.-content
      margin: 0 16px
    .infomationComponent
      .sectionLast
        margin: 20px 0
        margin-right: auto
        width: 100%
        height: 1px
        background-color: $gray
    .maps
      margin-top: 16px
      height: 300px
      .frame
        width: 100%
        height: 100%
    .reservation-tel
      display: flex
      justify-content: flex-start
      border: none
      height: auto
    .-head
      margin-top: 8px
    .title
      font-size: 16px
    .description
      margin: 0
      font-size: 14px
      line-height: 1.29
</style>
