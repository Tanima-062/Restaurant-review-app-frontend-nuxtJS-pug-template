<template lang="pug">
.payment
  <full-loading v-if="isLoading" :isLoading='isLoading' />
  template(v-else)
    notification-pop(
      :isShown='isAlertPopShown',
      type='error',
      icon='warning',
      position='right',
      @closePop='closePop'
    )
      template
        | {{ errMessage }}
    payment-step-bar.stepbar(active=3.5)
    no-ssr
      Heading.heads(fontSize='m', v-if='$window.width > 767') お支払い
    .amountsMoney
      Heading.heads(fontSize='m') お支払い金額
      .paymentAmount(@click='detailModalFlag = true')
        paragraph.text(fontSize='small') お支払い合計
        paragraph-bold.amount(fontSize='tiny') ¥
          span-bold(fontSize='medium') {{ $moneyFormat(Number(amount)) }}
        next-mark.icon
    hr.sectionLast
    .detailmain
      //- Heading.heads.methods(fontSize='m') お支払い方法
      //- paragraph(fontSize='tiny') お選びください
      //- color-radio(
      //-     :initValue='radiolist[0].text'
      //-     :radioContents='radiolist'
      //-     :isEither='true'
      //-     smallText='事務手数料（¥1000）'
      //-     @changeOption='paymentMethodGet'
      //-   )
      //- .debidCard(v-if='cardFlag')
      //-   Heading.heads(fontSize='m') デビットクレジットカード決済
      //-   notification.mt-l.notices(
      //-   title='注意事項'
      //-   :text='notice'
      //-   type='caution'
      //-   icon='warning'
      //-  )
      Heading.heads(fontSize='m', v-if='cardFlag') カード情報
      Heading.heads(fontSize='m', v-else) クレジットカード決済
      color-radio.mt-l(
        :initValue='radiolist2[0].text',
        :radioContents='radiolist2',
        :isEither='true',
        @changeOption='creditGet'
      )
      .cardInfo(v-if='newDataFlag')
        paragraph(font-size='small') 以下のクレジットカード決済がご利用いただけます。
        .cardtypes
          Visa.icons
          Master.icons
          Jcb.icons
          Amex.icons
          Diners.icons
        payment-form(
          @push-new-pay='PushPayment',
          :isSystemError='isSystemError'
        )
      //- Heading.heads.methods(fontSize='m') ポイント利用
      //- paragraph(fontSize='small') 1ポイントは ¥1 としてご利用いただけます。
      //- notification.mt-l(
      //-   title='ご利用可能なポイント残高はありません'
      //-   type='caution'
      //-   icon='info'
      //- )
      //- .pointBalance
      //-   paragraph-bold(fontSize='small').text 利用可能ポイント残高
      //-   paragraph-bold(fontSize='small').num 0
      //- .pointBalance
      //-   paragraph-bold(fontSize='small').text 利用可能ポイント
      //-   paragraph-bold(fontSize='medium').num 0
      //- .btn
      //-   CTA-button(text="利用ポイントを入力" type="secondary_sub" fontSize="medium" @click='inputPointFlag=true')
      //- paragraph-bold(fontSize='medium') 獲得予定ポイント
      //- paragraph(fontSize='tiny') 獲得予定のポイントの利用についてお選びください。<br> 利用せずに貯めるとポイントがアップします!
      //- color-radio(
      //-   :initValue='radiolist3[0].text'
      //-   :radioContents='radiolist3'
      //-   :isEither='true'
      //-   points='ポイントアップ!'
      //-   @changeOption='pointGet'
      //- ).mt-l
    .btn.last
      CTA-button(
        text='支払いを完了する',
        type='primary',
        fontSize='medium',
        @click='PushPayment',
        v-if='!newDataFlag && !isSystemError'
      )
      CTA-button(
        text='トップへ戻る',
        type='primary',
        fontSize='medium',
        @click='goTop',
        v-if='isSystemError'
      )
    no-ssr
      .-footer(v-if='$window.width < 767')
        .paymentAmountLast(@click='detailModalFlag = true')
          paragraph.text(fontSize='tiny') お支払い合計
          paragraph-bold.amount(fontSize='tiny') ¥
          span-bold(fontSize='medium') {{ amount }}
          next-mark.icon
    payment-modal(
      :isActive='detailModalFlag',
      @close='detailModalFlag = false'
    )
    input-point(:isActive='inputPointFlag', @close='inputPointFlag = false')
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'

import Amex from '~/assets/creditCard/amex.svg'
import CheckMark from '~/assets/icon/checkmark.svg'
import ClockMark from '~/assets/icon/clock.svg'
import ColorRadio from '~/components/molecules/radio/ColorRadio.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import Diners from '~/assets/creditCard/diners.svg'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import Econ from '~/assets/econ.js'
import InputPoint from '~/components/organisms/input/inputPoint.vue'
import Jcb from '~/assets/creditCard/jcb.svg'
import Master from '~/assets/creditCard/master.svg'
import NextMark from '~/assets/icon/next.svg'
import Notification from '~/components/molecules/card/Notification.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import PaymentForm from '~/components/organisms/reservation/PaymentForm.vue'
import PaymentModal from '~/components/organisms/menu/PaymentModal.vue'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import PhoneMark from '~/assets/icon/phone-call.svg'
import RestaurantStepBar from '~/components/molecules/flow/RestaurantStepBar.vue'
import Visa from '~/assets/creditCard/visa.svg'

@Component({
  components: {
    Amex,
    CheckMark,
    ClockMark,
    ColorRadio,
    CTAButton,
    Diners,
    FullLoading,
    Heading,
    InputPoint,
    Jcb,
    Master,
    NextMark,
    Notification,
    NotificationPop,
    Paragraph,
    ParagraphBold,
    PaymentForm,
    PaymentModal,
    PaymentStepBar,
    PhoneMark,
    RestaurantStepBar,
    Span,
    SpanBold,
    Visa
  }
})
export default class PaymentIndex extends Vue {
  mounted() {
    this.isLoading = true
    setTimeout(() => {
      if (this.paymentStatus.sessionToken && this.paymentStatus.requestId) {
        this.paymentChanges(this.paymentStatus)
      } else {
        this.goTop()
      }
    }, 0)
  }

  head() {
    return {
      title: 'お支払い',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      script: [
        {
          src: process.env.ECON_CDN,
          type: 'text/javascript'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      headerTitle: 'お支払い'
    })
  }

  replaceHistory() {
    window.history.replaceState(null, '', this.topUrl)
  }

  cardFlag = false
  newDataFlag = false
  amount = ''
  detailModalFlag = false
  inputPointFlag = false
  validFlags = false
  cardSessionText = 'カード情報はありません'
  errMessage = ''
  isAlertPopShown = false
  isLoading = true
  isSystemError = false // GoPaymentが失敗した際データが初期化され復元できないのでその時にカード情報を入力できないようにする
  topUrl = '/gourmet/'
  notice = `
カードの性質上、お申し込み完了時点で口座から引き落としとなるため、申込完了後に航空会社都合で満席や料金変更が発生した場合は返金扱いとなります。
キャンセルなどによるご返金に関しては、キャンセルの理由（お客様都合、天候不良による欠航など）にかかわらず、非常にお時間がかかる場合がございます。
ご返金までの期間はご利用のクレジットカード会社の規定により異なります。詳しくはクレジットカード会社にお問い合わせください。
`
  radiolist = [
    {
      label: 'クレジットカード決済',
      text: 'クレジットカード決済'
    },
    {
      label: 'デビットクレジットカード決済',
      text: 'デビットクレジットカード決済'
    }
  ]

  radiolist2 = [
    {
      label: this.cardSessionText,
      text: this.cardSessionText
    },
    {
      label: '新しいクレジットカードを使う',
      text: '新しいクレジットカードを使う'
    }
  ]

  radiolist3 = [
    {
      label: '貯める',
      text: '貯める'
    },
    {
      label: '今すぐ利用',
      text: '今すぐ利用'
    }
  ]

  get paymentStatus() {
    const st = this.$store.getters['modules/reservationGourmet/getPaymentST']
    return st
  }

  get creditInfo() {
    return this.$store.getters['modules/reservationGourmet/getCardInfo']
  }

  async paymentChanges({ sessionToken, requestId }) {
    this.isLoading = true
    await Econ.Pay(sessionToken, requestId).then(
      (result) => {
        this.amount = result.Amount
      },
      () => {
        this.$store.dispatch('modules/reservationGourmet/resetAllMenus')
        this.goTop()
      }
    )
    await Econ.GetInfo(sessionToken, requestId).then(
      () => {
        // console.log(reject)
      },
      () => {
        this.cardSessionText = 'カード情報がありません'
        this.radiolist2.shift()
        this.newDataFlag = true
      }
    )
    this.isLoading = false
  }

  paymentMethodGet(data: string): void {
    if (data === 'デビットクレジットカード決済') {
      this.cardFlag = true
    } else {
      this.cardFlag = false
    }
  }

  closePop(): void {
    this.isAlertPopShown = false
  }

  creditGet(data: string): void {
    if (data === '新しいクレジットカードを使う') {
      this.newDataFlag = true
    } else {
      this.newDataFlag = false
    }
  }
  // pointGet(data: string): void {
  //   console.log('Radio:' + data)
  // }

  async PushPayment() {
    this.isLoading = true
    let userUsedFlag = 0
    if (this.newDataFlag) {
      userUsedFlag = 1
    }
    await Econ.SaveEntry(
      this.paymentStatus.sessionToken,
      this.paymentStatus.requestId,
      this.creditInfo.cardNum,
      this.creditInfo.name,
      this.creditInfo.expireYear + this.creditInfo.expireMonth,
      this.creditInfo.securityCode,
      userUsedFlag
    ).then(
      (result) => {
        this.successSaveEntry(result)
      },
      (reject) => {
        this.isAlertPopShown = true
        this.errMessage = reject.info
        this.isLoading = false
      }
    )
    await this.$store.dispatch['modules/reservationGourmet/resetCardInfo']
  }

  successSaveEntry(result) {
    this.$store.dispatch('modules/reservationGourmet/setcd3secFlg', result.cd3secFlg)
    this.$store.dispatch('modules/reservationGourmet/resetCS')
    this.$store.dispatch('modules/reservationGourmet/resetAllMenus')
    this.replaceHistory()
    Econ.GoPayment(this.paymentStatus.sessionToken, this.paymentStatus.requestId).then(
      () => {
        // console.log(result)
      },
      (reject) => {
        // console.log(reject)
        this.isAlertPopShown = true
        this.errMessage = reject
        this.isLoading = false
        this.isSystemError = true
      }
    )
  }

  goTop() {
    location.replace(this.topUrl)
  }
}
</script>
<style lang="sass" scoped>
.payment
  .heads
    margin: 15px 0
  .methods
    margin-top: 50px
  .mt-l
    margin-bottom: 40px
  .notices
    white-space: pre-line
  .stepbar
    margin-top: 20px
  .paymentAmount
    display: flex
    align-items: center
    .text
      width: 60%
    .amount
      width: 30%
      text-align: right
    .icon
      width: 10%
      margin-left: auto
      margin-right: 0px
      width: 20px
      transform: rotate(90deg)
      fill: #e4e4e4
  .sectionLast
    margin: 0px calc(50% - 46vw)
    height: 1px
    background-color: #e4e4e4
  .-footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.24)
    background-color: white
    .btn
      text-align: center
      width: 80%
      margin: 10px auto
  .bottom
    margin-bottom: 130px
  .pointBalance
    display: flex
    .text
      width: 70%
    .num
      width: 30%
      text-align: right
  .btn
    text-align: left
    margin: 20px 0
  .last
    margin-bottom: 80px
  .paymentAmountLast
    display: flex
    align-items: center
    .text
      width: 30%
      padding: 20px 0
      padding-left: 10px
    .amount
      width: 40%
      text-align: right
    .icon
      margin-left: auto
      margin-right: auto
      width: 20px
      transform: rotate(90deg)
      fill: #e4e4e4
  .cardtypes
    display: flex
    .icons
      height: 25px
      width: 50px
@include pc_view
  .payment
    .detailmain
      width: 50%
      .btn
        text-align: right
    .amountsMoney
      position: fixed
      left: 60%
      .paymentAmount
        display: flex
        align-items: center
        border-bottom: solid 1px #e4e4e4
        .text
          width: 100px
        .amount
          width: 100px
          text-align: right
        .icon
          width: 50px
          margin-left: 20px
          margin-right: 0px
          width: 20px
          transform: rotate(90deg)
          fill: #e4e4e4
</style>
