<template lang="pug">
.adminPage
  template(v-for='dayItem in todayList')
    .menulist
      .sidetab.typeA(v-if='timeJudge(dayItem.pickUpDateTime) === "typeA"')
        paragraph-bold.sidelabel(font-size='tiny') 30分以内
      .sidetab.typeB(v-else-if='timeJudge(dayItem.pickUpDateTime) === "typeB"')
        paragraph-bold.sidelabel.typeB(font-size='tiny') 1時間以内
      .sidetab.typeC(v-else-if='timeJudge(dayItem.pickUpDateTime) === "typeC"')
        paragraph-bold.sidelabel.typeC(font-size='tiny') 1時間以上
      .sidetab.typeD(v-else)
        paragraph-bold.sidelabel.typeD(font-size='tiny') 超過
      .main
        .day_num(:class='timeJudge(dayItem.pickUpDateTime)')
          #day
            paragraph(fontSize='tiny') お客様ご来店日時
            paragraph-bold(fontSize='medium') {{ formats(dayItem.pickUpDateTime) }}
              Span.comeTime(color='error', fontSize='medium') {{ formatsTime(dayItem.pickUpDateTime) }}
          #num
            paragraph(fontSize='tiny') ご予約番号
            paragraph-bold(fontSize='medium') {{ dayItem.reservationNo }}
        paragraph.orderContents(fontSize='tiny') お客様ご注文内容
        .foodlist_count(
          v-for='(item, num) in dayItem.reservationMenus',
          :key='dayItem.reservationMenus.id'
        )
          #foodlist
            paragraph.-listmenu ・{{ item.name }}
            .optionflex(v-if='item.reservationOptions&&item.reservationOptions.length>0')
              #flexitem1
                paragraph(fontSize='tiny').fs-14 オプション
                paragraph
                  Span(fontSize='tiny') ×{{ item.count }}
              #flexitem2
                .div(v-for="opt in item.reservationOptions" )
                  //- トッピングの時の処理
                  paragraph(fontSize='tiny' v-if='Array.isArray(opt)').leftBorder.fs-14 トッピング:
                    div(v-for='topping in opt')
                      Span(fontSize='tiny') {{topping.contents}}
                  //- オプションの時の処理
                  paragraph(fontSize='tiny' v-else).leftBorder.fs-14 {{opt.keyword}} : {{opt.contents}}
            hr.sectionLast
          #count
            paragraph-bold(fontSize='medium', color='error') {{ item.count }}
              Span(fontSize='tiny') コ
        .others
          paragraph.space(fontSize='tiny') お店への連絡事項
          paragraph.leftspace(fontSize='small', color='error') {{ dayItem.request }}
          paragraph.spacetop(fontSize='tiny') 注文予約時間
          paragraph.leftspace(fontSize='small') {{ formatALL(dayItem.createdAt) }}
        .order(v-if='dayItem.reservationStatus === "RESERVE"')
          #button1
            CTA-button.-btn(
              fontSize='medium',
              type='secondary',
              text='注文を受ける',
              @click='confirmed(dayItem.id)',
              :disabled='CurrentContents === 2'
            )
        .confirmed(v-if='dayItem.reservationStatus === "ENSURE"')
          .add-check-button
            button.maps
              check-mark.mark
            paragraph-bold(fontSize='huge', color='main') 受注確定
          paragraph(fontSize='small') お店側受付時間
            span-bold.taketime(fontSize='medium', color='error') {{ formatsTime(dayItem.storeReceptionDateTime) }}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'nuxt-property-decorator'
import { format, differenceInMinutes, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import CheckMark from '~/assets/icon/checkmark.svg'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'

@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    CTAButton,
    CheckMark
  }
})
export default class AdminMenuList extends Vue {
  @Prop({ default: 1 }) CurrentContents?: number
  orderList = [
    {
      menu: '包み焼きハンバーグ',
      count: 1
    },
    {
      menu: 'モッツァレラチーズのトマト包み焼きハンバーグ',
      count: 2
    },
    {
      menu: '低アレルゲンおこさまカレー',
      count: 1
    }
  ]

  @Emit()
  confirmed(selectedId) {
    this.$store.dispatch('modules/client/startCooking', selectedId)
    // IDを探してフォーマットした現在時刻をつっこむ
    const databox = {
      id: selectedId,
      nowTime: format(new Date(), 'yyyy-MM-dd hh:mm:ss', { locale: ja })
    }
    this.$store.dispatch('modules/client/setTime', databox)
  }

  get todayList() {
    if (this.CurrentContents === 1) {
      return this.$store.getters['modules/client/getListTodayData']
    } else {
      return this.$store.getters['modules/client/getListTomorrowData']
    }
  }

  get tomorrowList() {
    return this.$store.getters['modules/client/getListTomorrowData']
  }

  formats(date) {
    const dating = parseISO(date)
    return format(new Date(dating), 'MM/dd (eee)', { locale: ja })
  }

  formatsTime(date) {
    const dating = parseISO(date)
    return format(new Date(dating), 'HH:mm', { locale: ja })
  }

  formatALL(date) {
    const dating = parseISO(date)
    return format(new Date(dating), 'MM/dd(eee) HH:mm', { locale: ja })
  }

  cancel() {
    // console.log('注文をキャンセルします')
  }

  timeJudge(time) {
    const dating = parseISO(time)
    const result = differenceInMinutes(dating, new Date())
    if (result > 1 && result <= 30) {
      return 'typeA'
    } else if (result > 30 && result < 60) {
      return 'typeB'
    } else if (result >= 60) {
      return 'typeC'
    } else {
      return 'typeD'
    }
  }
}
</script>
<style lang="sass" scoped>
.menulist
  display: flex
  padding: 5px 0
  .sidetab
    width: 5%
    background-color: #f8daa9
    writing-mode: vertical-rl
    text-orientation: upright
    display: flex
    justify-content: center
    align-items: center
  .typeA
    background-color: #ffc11c
  .typeB
    background-color: #66c0ff
  .typeC
    background-color: #6eca75
  .typeD
    background-color: #ff1d1c
    color: white
  .main
    width: 95%
    background-color: $white
    .orderContents
      padding: 10px 20px
    .day_num.typeA
      background-color: #fffae8
    .day_num.typeB
      background-color: #e8faff
    .day_num.typeC
      background-color: #efffe8
    .day_num.typeD
      background-color: #fff4f4
    .day_num
      display: flex
      padding: 5px 0
      #day
        width: 50%
        padding-left: 20px
        padding-top: 5px
        .comeTime
          padding-left: 5px
      #num
        width: 50%
        padding-top: 10px
    .foodlist_count
      display: flex
      #foodlist
        width: 80%
        .-listmenu
          font-size: 12px
          padding-left: 20px
        .optionflex
          display: flex
          margin-left: 20px
          margin-bottom: 30px
        #flexitem1
          margin: 10px 10px 5px 20px
          width: 50%
        #flexitem2
          margin: 0px 0
          .leftBorder
            border-left: solid 2px $gray
            padding: 0 10px
        .sectionLast
          margin: 10px calc(50% - 50vw)
          margin-left: 5%
          height: 2px
          background-color: #e4e4e4
      #count
        width: 20%
        text-align: right
        padding-right: 20px
    .others
      padding: 5px 0
      .space
        padding-left: 20px
      .spacetop
        padding-left: 20px
        padding-top: 10px
      .leftspace
        padding-left: 20px
    .order
      display: flex
      margin-bottom: 10px
      #button1
        width: 80%
        margin: 0 auto
        text-align: center
      .-btn
        padding: 8px
    .confirmed
      text-align: center
      margin-bottom: 10px
      .taketime
        padding-left: 5px
      .maps
        border-radius: 50%
        background-color: white
        border: none
        width: 35px
      .add-check-button
        display: flex
        justify-content: center
    .mark
      fill: #1ba1ff
      width: 30px
@include pc_view
  .adminPage
    width: 70%
    margin: 0 auto
    .sectionLast
      width: 120%
      margin: 0 auto
</style>
