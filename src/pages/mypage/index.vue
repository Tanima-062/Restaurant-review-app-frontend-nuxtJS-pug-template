<template lang="pug">
.mypage
  full-loading(
    v-if='!completeStatus.message || isLoading',
    :isLoading='!completeStatus.message || isLoading'
  )
  template(v-else)
    Heading.heads(fontSize='m') ご注文内容の確認
    button.circle_reloadicon(@click='clickReload()')
      reload-mark.-reloadicon
    paragraph-bold.reloadText(fontSize='tiny') 更新
    template(v-if='completeStatus.message')
      .order-status
        .order-status-text
          paragraph-bold.ordernumtext(fontSize='small') ご注文番号
        .order-status-number
          paragraph-bold(fontSize='medium', line-height=1) {{ reservationNumber }}
        .order-status-payment(v-if='paymentStatus !== "UNPAID" && !isCancel')
          paragraph-bold(fontSize='small', color='main') お支払済
          check-mark.order-status-payment-icon
      notification.notification(
        v-if='(isTakeout && completeStatus.reservation.pickUpReceiveDatetime === null) || (!isTakeout && !visitRestaurant && !isCancel)',
        :title='completeStatus.message',
        type='caution',
        icon='info'
      )
      notification(
        title='この予約はキャンセル済です。',
        icon='warning',
        type='error',
        v-if='isCancel'
      )
      .buttonflex(v-if='completeStatus && getStatus && isTakeout')
        #flex1
          paragraph-bold.fs-24(
            fontSize='medium',
            v-if='completeStatus.reservation.pickUpDateTime'
          ) {{ formatALL(completeStatus.reservation.pickUpDateTime) }}
        #flex2
          paragraph-bold.fs-24(fontSize='medium') ¥{{ $moneyFormat(Number(totalPrice(completeStatus.reservation.reservationMenus))) }}
        #flex3
          Next-mark(
            @click='isTriangle = !isTriangle',
            :class='[isTriangle ? "reverse" : "rotateicon"]'
          )
      .orderbox(v-if='isTriangle && getStatus && isTakeout')
        paragraph-bold.-ordertop(fontSize='small') 内訳
        ul(v-if='completeStatus && getStatus')
          li(
            v-for='(item, num) in completeStatus.reservation.reservationMenus'
          )
            .orderflex(v-if='item.count > 0')
              template(v-if='item.name.length > 16')
                #flexitem1-special
                  paragraph(fontSize='tiny') {{ item.name }}
                #flexitem2
                  paragraph-bold(fontSize='small') ¥{{ $moneyFormat(Number(item.unitPrice)) }}
                  paragraph.rightbox(fontSize='tiny') ×{{ item.count }}
              template(v-else)
                #flexitem1
                  paragraph(fontSize='small') {{ item.name }}
                #flexitem2
                  paragraph-bold(fontSize='small') ¥{{ $moneyFormat(Number(item.unitPrice)) }}
                  paragraph.rightbox(fontSize='tiny') ×{{ item.count }}
            .optionflex(
              v-if='item.reservationOptions && item.reservationOptions.length > 0'
            )
              #flexitem1
                paragraph.fs-14(fontSize='tiny') オプション
                paragraph
                  span-bold.fs-14(fontSize='tiny') ¥{{ optionTotalPrice(item.reservationOptions) / item.count }}
                  Span(fontSize='tiny') ×{{ item.count }}
              #flexitem2
                div(v-for='opt in item.reservationOptions')
                  paragraph.leftBorder.fs-14(
                    fontSize='tiny',
                    v-if='Array.isArray(opt)'
                  ) トッピング:
                    div(v-for='topping in opt')
                      Span(fontSize='tiny') {{ topping.contents }} （¥{{ $moneyFormat(Number(topping.price)) }}）
                  //- オプションの時の処理
                  paragraph.leftBorder.fs-14(fontSize='tiny', v-else) {{ opt.keyword }} : {{ opt.contents }}（¥{{ $moneyFormat(Number(opt.price) / item.count) }}）
        .sumflex
          #flexitem1
            paragraph-bold.sum(fontSize='medium') 合計
              Span(fontSize='tiny') （内税）
          #flexitem2
            paragraph-bold.sum(fontSize='small') ¥{{ $moneyFormat(Number(totalPrice(completeStatus.reservation.reservationMenus))) }}
      .restaurant-page(v-else-if='!isTakeout')
        paragraph-bold.storetext.fs-18(fontSize='small') 日時・人数
        .date
          .label
            paragraph.-title 日時
          paragraph-bold.-data {{ visitDate }}({{ dayOfTheWeek }}) {{ visitTime }}〜
        .people
          .label
            paragraph.-title 人数
          paragraph-bold.-data {{ visitPeople }}人
        paragraph-bold.storetext.fs-18(fontSize='small') ご予約のプラン・オプションなど
        .plan
          paragraph.plan-title プラン
          .plan-wrapper
            .plan-name
              paragraph-bold.-data.fs-16.-plan-line(fontSize='base') {{ planName }}
            .price
              paragraph-bold(v-if='!isOnlySeat', fontSize='base') ¥{{ $moneyFormat(planPrice) }}
        .option-wrapper(v-if='options.length > 0')
          paragraph.-title 追加オプション
          .options-wrapper
            .options(v-for='option in options')
              .option
                paragraph-bold.-data.fs-16(fontSize='base') {{ option.keyword }}
                paragraph(font-size='small') x{{ option.count }}
              .price
                paragraph-bold(fontSize='base') ¥{{ $moneyFormat(Number(option.price)) }}
        .price-wrapper
          .label
            paragraph-bold.-title お支払い金額
          .total-price
            .price
              .price-title
                paragraph-bold.-data.fs-16(fontSize='base') 合計
                paragraph.tax.-data.fs-16(fontSize='small') (税込)
              paragraph-bold.total.-data.fs-16(fontSize='medium') ¥{{ $moneyFormat(Number(completeStatus.reservation.total)) }}
      paragraph-bold.storetext.fs-18(fontSize='small') {{ completeStatus.reservation.reservationStore.name }}
      //- getDetail.reservationStores.name
      //- paragraph.fs-14(fontSize='tiny') 洋食/イタリアン
      paragraph.-textspace.fs-14(fontSize='tiny') {{ completeStatus.reservation.reservationStore.address }}
      .storeinfo.-textspace
        phone-mark.-phoneicon
        paragraph.pl(fontSize='tiny') {{ completeStatus.reservation.reservationStore.tel }}
      a.storeLink(:href="'/gourmet/restaurant/detail/takeout/' + completeStatus.reservation.reservationStore.storeId+ '/#infos'" target="_blank" rel="noreferrer noopener") 店舗詳細情報はこちら
      cancel-policy(
        v-if='!isTakeout && this.cancelPolicy.length > 0 && !isOnlySeat',
        :cancelPolicy='cancelPolicy'
      )
      .-center
        .framebody(
          :class='[completeStatus.reservation.pickUpReceiveDatetime !== null ? "framebottom" : ""]'
        )
          iframe.frame(
            :src='"https://www.google.com/maps/embed/v1/place?key=AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw&q=" + completeStatus.reservation.reservationStore.latitude + "," + completeStatus.reservation.reservationStore.longitude',
            width='100%',
            height='100%'
          )
        restaurant-step-bar.bottom(
          :active='orderStatus',
          v-if='isTakeout && completeStatus.reservation.pickUpReceiveDatetime === null'
        )
      .-footer(v-if='isTakeout')
        .btn
          CTA-button(
            text='商品を受け取る',
            type='primary',
            fontSize='large',
            @click='confirmed()',
            :disabled='canReceive === -1 || isCancel',
            v-show='completeStatus.reservation.pickUpReceiveDatetime==null && !completeStatus.reservation.hasReview'
          )
          paragraph.-center(fontSize='tiny', color='error', v-show='isCancel') この予約はキャンセルされました
          paragraph.-center(
            fontSize='tiny',
            v-show='completeStatus.reservation.pickUpReceiveDatetime==null && !completeStatus.reservation.hasReview'
          ) ※必ず店員の前で操作してください
          CTA-button(
            text='アンケートに答える',
            type='secondary',
            fontSize='large',
            @click='goInquiry()',
            :disabled='isCancel',
            v-show='completeStatus.reservation.pickUpReceiveDatetime!=null && !completeStatus.reservation.hasReview'
          )
      .questionnaire(v-else)
        .questionnaire__btn(
          v-if='visitRestaurant && !completeStatus.reservation.hasReview && !isCancel'
        )
          CTA-button(
            text='アンケートに答える',
            type='secondary',
            fontSize='large',
            @click='goInquiry()'
          )
        .modify__btn(
          v-else-if='!visitRestaurant && !isModifyReservation && !isCancel'
        )
          CTA-button(
            text='ご予約内容を変更する',
            type='secondary_sub',
            fontSize='large',
            @click='goModify()'
          )
          .cancel__btn
            CTA-button(
              text='キャンセル手続きをする',
              type='secondary_sub',
              fontSize='large',
              @click='goCancel()'
            )
            .cancel-info
              paragraph-bold(fontSize='base') キャンセルについて
              paragraph(fontSize='small', letterSpacing='none') <b>{{ cancelDate }}</b>まで、上記ページからキャンセル・変更していただけます。
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { format, compareAsc, parseISO, set } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import CheckMark from '~/assets/icon/checkmark.svg'
import ClockMark from '~/assets/icon/clock.svg'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import CancelPolicy from '~/components/organisms/cancel/CancelPolicy.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import NextMark from '~/assets/icon/next.svg'
import Notification from '~/components/molecules/card/Notification.vue'
import PhoneMark from '~/assets/icon/phone-call.svg'
import ReloadMark from '~/assets/icon/reload.svg'
import RestaurantStepBar from '~/components/molecules/flow/RestaurantStepBar.vue'

@Component({
  components: {
    CheckMark,
    ClockMark,
    CTAButton,
    CancelPolicy,
    FullLoading,
    Heading,
    NextMark,
    Notification,
    Paragraph,
    ParagraphBold,
    PhoneMark,
    ReloadMark,
    RestaurantStepBar,
    Span,
    SpanBold
  }
})
export default class RemindIndex extends Vue {
  isTriangle = false
  isLoading = true

  head() {
    return {
      title: 'ご注文内容の確認',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  formatALL(date) {
    const dating = parseISO(date)
    return format(new Date(dating), 'MM/dd(eee) HH:mm', { locale: ja })
  }

  optionTotalPrice(list) {
    let allPrice = 0
    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) {
        for (let j = 0; j < list[i].length; j++) {
          allPrice = allPrice + Number(list[i][j].price)
        }
      } else {
        allPrice = allPrice + Number(list[i].price)
      }
    }
    return allPrice
  }

  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve']
  }

  mounted() {
    setTimeout(() => {
      // テイクアウト・レストランのレイアウト分け
      if (!this.isTakeout) {
        this.$store.dispatch('modules/layout/setHeaderInfo', {
          layoutType: 3,
          headerTitle: 'ご注文内容の確認',
          returnPath: '/restaurant'
        })
      } else {
        this.$store.dispatch('modules/layout/setHeaderInfo', {
          headerTitle: 'ご注文内容の確認',
          returnPath: '/takeout'
        })
      }
      // ログインを叩いてstoreに入れる
      this.$store.dispatch('modules/user/getUserData').then(async () => {
        /* eslint-disable-next-line */
        const reserveNo: any = this.$route.query.reservationNo
        const userInfo = this.$store.getters['modules/user/getUserInfo']
        if (reserveNo !== undefined) {
          // reservationNoがあったらloginFormに入れる
          this.onInput(String(reserveNo))
          if (userInfo) {
            // ログインしてたらtelいれる
            this.onInputTel(String(userInfo.tel))
            // 叩く
            await this.$store.dispatch('modules/reservationGourmet/LoginForm').then(() => {
              if (!this.getStatus) {
                this.$router.push('/mypage/login/')
              }
              if (!this.isTakeout && !this.isOnlySeat && this.completeStatus.status) {
                this.$store.dispatch('modules/cancel/fetchCancelPolicy', {
                  id: this.completeStatus.reservation.reservationStore.storeId,
                  appCd: this.completeStatus.reservation.appCd
                })
              }
              if (this.completeStatus.reservation.paymentStatus === 'WAIT_PAYMENT') {
                return this.$router.push('/rebill/')
              }
            })
          } else {
            this.$router.push('/mypage/login/')
          }
        } else {
          // なかったら叩く
          await this.$store.dispatch('modules/reservationGourmet/LoginForm').then(() => {
            if (!this.isTakeout && !this.isOnlySeat && this.completeStatus.status) {
              this.$store.dispatch('modules/cancel/fetchCancelPolicy', {
                id: this.completeStatus.reservation.reservationStore.storeId,
                appCd: this.completeStatus.reservation.appCd
              })
            }
            if (this.completeStatus.reservation.paymentStatus === 'WAIT_PAYMENT') {
              return this.$router.push('/rebill/')
            }
          })
        }
        this.isLoading = false
      })
    }, 0)
  }

  totalPrice(orderedMenu) {
    let totalPrices = 0
    for (let i = 0; i < orderedMenu.length; i++) {
      if (orderedMenu[i].reservationOptions) {
        totalPrices =
          totalPrices +
          Number(orderedMenu[i].unitPrice) * orderedMenu[i].count +
          Number(this.optionTotalPrice(orderedMenu[i].reservationOptions))
      } else {
        totalPrices = totalPrices + Number(orderedMenu[i].unitPrice) * orderedMenu[i].count
      }
    }
    return totalPrices
  }

  get loginForm() {
    return this.$store.getters['modules/reservationGourmet/getloginForm']
  }

  get getStatus() {
    return this.$store.getters['modules/reservationGourmet/getStatus']
  }

  onInput(val: string) {
    if (val !== 'undefined') {
      this.$store.dispatch('modules/reservationGourmet/setReservationLogin', val)
    }
  }

  onInputTel(val: string) {
    if (val !== 'undefined') {
      this.$store.dispatch('modules/reservationGourmet/setReservationTell', val)
    }
  }

  get canReceive() {
    const pickUp = this.completeStatus.reservation.pickUpDateTime
    const dating = parseISO(pickUp)
    // 現在時刻に５分加算して、５分前でも注文を受け取れる様にする
    const current = new Date()
    const plusFive = current.setMinutes(current.getMinutes() + 5)
    const timeStampChange = new Date(plusFive)
    const result = compareAsc(timeStampChange, dating)
    // もし左が新しければtrue(1)古ければ-1
    return result
  }

  // キャンセル済み判断
  get isCancel() {
    if (this.completeStatus.reservation.reservationStatus === 'CANCEL') {
      return true
    } else {
      return false
    }
  }

  async confirmed() {
    const databox = {
      reservationNo: this.reservationNumber,
      tel: this.completeStatus.reservation.tel
    }
    this.$store.dispatch('modules/reservationGourmet/SendConfirmed', databox)

    await this.$router.push('/takeout/inquiry')
  }

  goInquiry() {
    this.$router.push('/takeout/inquiry')
  }

  get orderStatus() {
    // gifで動くステータス
    if (this.canReceive === 1) {
      return 3.5
    } else {
      let number = 1
      if (this.completeStatus.reservation.reservationStatus === 'RESERVE') {
        number = 1.5
      } else {
        number = 2.5
      }
      return number
    }
  }

  get reservationNumber() {
    if (this.$store.getters['modules/reservationGourmet/getReservationNum']) {
      return this.$store.getters['modules/reservationGourmet/getReservationNum']
    }
  }

  get isTakeout() {
    if (this.completeStatus.reservation.appCd === 'RS') {
      return false
    }
    return true
  }

  // 決済状態取得
  get paymentStatus() {
    return this.completeStatus.reservation.paymentStatus
  }

  // 来店時間、現在時間比較（ボタンー分け用）
  get visitRestaurant() {
    const visitTime = parseISO(this.completeStatus.reservation.pickUpDateTime)
    const nowTime = new Date()
    return nowTime.getTime() > visitTime.getTime()
  }

  clickReload() {
    location.reload()
  }

  get sumPrice() {
    let allPrice = 0
    const menus = this.completeStatus.reservation.reservationMenus
    if (menus && menus.length > 0) {
      for (let i = 0; i < menus.length; i++) {
        allPrice = allPrice + menus[i].price
      }
      return allPrice
    } else {
      return 0
    }
  }

  // 予約プラン名
  get planName() {
    return this.completeStatus.reservation.reservationMenus[0].name
  } // 予約プランオプション

  // プラン価格
  get planPrice() {
    return Number(this.completeStatus.reservation.reservationMenus[0].price)
  }

  get options() {
    if (
      this.$feature('option') &&
      this.completeStatus.reservation.reservationMenus[0].reservationOptions &&
      this.completeStatus.reservation.reservationMenus[0].reservationOptions.length > 0
    ) {
      return this.completeStatus.reservation.reservationMenus[0].reservationOptions.filter((option) => {
        // return option.keyword !== null
        return option.keyword !== null && option.count > 0
      })
    }
    return []
  }

  // 席のみフラグ
  get isOnlySeat() {
    return this.completeStatus.reservation.reservationMenus[0].onlySeat
  }

  get reservationTime() {
    return parseISO(this.completeStatus.reservation.pickUpDateTime)
  }

  // 予約時間取得
  get visitTime() {
    const time = this.reservationTime
    const newFormat = format(time, 'HH:mm')
    return newFormat
  }

  // 予約キャンセル、予約内容変更可能期間
  get isModifyReservation() {
    const date = set(this.reservationTime, {
      date: this.reservationTime.getDate() - 1,
      hours: 23,
      minutes: 59,
      seconds: 59
    })
    const today = new Date()
    // 予約日前日の23:59:59を過ぎたらdisabled
    return date.getTime() < today.getTime()
  }

  // 予約日付取得
  get visitDate() {
    const date = this.reservationTime
    const newFormat = format(date, 'yyyy/MM/dd')
    return newFormat
  }

  // 予約人数取得
  get visitPeople() {
    return this.completeStatus.reservation.persons
  }

  // 予約曜日取得
  get dayOfTheWeek() {
    const date = this.reservationTime
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
    return dayOfWeekStr
  }

  // キャンセル可能時間
  get cancelDate() {
    const date = set(this.reservationTime, {
      date: this.reservationTime.getDate() - 1,
      hours: 23,
      minutes: 59
    })
    const newFormat = format(date, 'yyyy/MM/dd HH:mm')
    return newFormat
  }

  // キャンセルポリシー取得
  get cancelPolicy() {
    return this.$store.getters['modules/cancel/getCancelPolicy']
      ? this.$store.getters['modules/cancel/getCancelPolicy']
      : []
  }

  // キャンセルページ遷移
  goCancel() {
    this.$router.push('/cancel/')
  }

  // 内容変更ページ遷移
  goModify() {
    this.$router.push('/reservation/update/')
  }
}
</script>
<style lang="sass" scoped>
.mypage
  .heads
    margin-top: 15px
  .notification
    margin-top: 32px
    margin-bottom: 10px
  .circle_reloadicon
    position: absolute
    border-radius: 50%
    background-color: white
    border: solid 1px #e4e4e4
    width: 40px
    height: 40px
    outline: none
    margin: 10px
    top: 0%
    margin-top: 60px
    right: 0%
    cursor: pointer
    &:hover
      background-color: #1BA1FF
    .-reloadicon
      width: 26px
      height: 24px
      fill: $dark_gray
      margin-top: 3px
      z-index: 2
      &:hover
        fill: white
  .reloadText
    display: none
  .order-status
    display: flex
    justify-content: center
    align-items: center
    margin-top: 32px
    &-text
      white-space: nowrap
    &-number
      display: flex
      justify-content: center
      align-items: center
      margin-left: 10px
      width: 100%
      max-width: 195px
      height: 35px
      border-radius: 17.5px
      background-color: #ffc11c
      p
        font-size: 16px
    &-payment
      position: relative
      align-self: flex-end
      white-space: nowrap
      margin-left: 10px
      &-icon
        position: absolute
        top: -24px
        left: 20px
        fill: #1ba1ff
        width: 20px
  .buttonflex
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    position: relative
    #flex1
      width: 50%
      margin: 10px 0
    #flex2
      width: 40%
      margin: 10px 0
      text-align: right
    #flex3
      width: 10%
      margin: 10px 0
      text-align: right
      .rotateicon
        transform: rotate(90deg)
        fill: #a6a6a6
        width: 20px
      .reverse
        transform: rotate(270deg)
        width: 20px
        fill: #a6a6a6
  .storeinfo
    position: relative
    .-clockicon
      position: absolute
      top: 35%
      left: 0%
      fill: #4d4d4d
      width: 14px
    .-phoneicon
      position: absolute
      top: -15%
      left: 0%
      fill: #4d4d4d
      width: 14px
    .pl
      padding-left: 22px
  .storeLink
    text-decoration: underline
    color: $link_color
    transition: .3s
    &:hover
      transition: .3s
      opacity: .7
  .button
    margin: 30px
  .-textspace
    margin: 15px 0
    line-height: 1.33
  .storetext
    margin-top: 30px
    font-size: 16px
    line-height: 1.25
  .-user
    margin-left: 10px
  .stepbar
    margin: 20px 0
  .sum
    margin-top: 10px
    padding-bottom: 10px
  .-center
    text-align: center
    .framebody
      height: 150px
      margin-top: 32px
      .frame
        border: none
  .sumleft
    margin-top: 10px
    margin-left: 10px
    padding-bottom: 10px
  .orderbox
    width: 100%
    height: auto
    padding: 0 16px
    border-radius: 2px
    background-color: #f4f4f4
    margin: 0 auto
    .-ordertop
      padding: 10px
  .orderflex
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    margin-right: 15px
    #flexitem1
      margin: 5px 10px 0px 20px
    #flexitem2
      display: flex
      align-items: flex-end
      margin: 0px 0
      margin-left: auto
      .rightbox
        text-align: right
  .optionflex
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    margin-left: 20px
    margin-bottom: 30px
    #flexitem1
      margin: 0px 10px 5px 20px
      width: 30%
    #flexitem2
      margin: 0px 0
      border-left: 2px solid $gray
      .leftBorder
        padding: 0 10px
  .sumflex
    border-top: 1px solid $gray
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    #flexitem1
      padding-left: 20px
    #flexitem2
      margin-left: auto
      margin-right: 15px
  .-footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.24)
    background-color: white
    .btn
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      text-align: center
      width: 80%
      margin: 10px auto
  .framebottom
    margin-bottom: 100px
  .bottom
    padding-top: 30px
    padding-bottom: 130px
  .restaurant-page
    .label
      display: flex
      justify-content: center
      align-items: center
      min-width: 120px
    .date
      display: flex
      align-items: center
      min-height: 66px
      margin-top: 20px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .people
      display: flex
      align-items: center
      min-height: 66px
      background-color: #f4f4f4
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .plan
      align-items: center
      margin-top: 20px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .plan-title
        padding-left: 16px
        padding-top: 16px
      .plan-wrapper
        display: flex
        justify-content: flex-end
        flex: 1
        padding-right: 24px
        padding-bottom: 16px
        .plan-name
          padding: 0 16px
          .-plan-line
            line-height: 1.25
        .price
          p
            white-space: pre
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .-RTseat
      display: flex
      align-items: center
      min-height: 66px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .option-wrapper
      display: flex
      align-items: center
      min-height: 66px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .options-wrapper
        flex: 1
        padding-left: 8px
        padding-right: 24px
        .options
          display: flex
          justify-content: space-between
          .option
            display: flex
            align-items: center
            p:nth-child(2)
              margin-left: 8px
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .price-wrapper
      display: flex
      align-items: center
      min-height: 66px
      background-color: #f4f4f4
    .total-price
      display: flex
      justify-content: flex-end
      flex: 1
      padding-right: 24px
      .price
        display: flex
        justify-content: space-between
        align-items: baseline
        .price-title
          display: flex
          align-items: flex-end
          flex: 1
          margin-right: 16px
          .tax
            font-size: 12px
        .total
          font-size: 16px
    .-title
      padding: 0 16px
      text-align: center
  .questionnaire
    display: flex
    justify-content: center
    margin: 24px 0
    .questionnaire__btn
      display: flex
      justify-content: center
      width: 80%
    .modify__btn
      width: 100%
      .cancel__btn
        margin-top: 16px
        .cancel-info
          margin-top: 34px
#flexitem1-special
  margin-left: 20px
  width: 60%
@include pc_view
  .mypage
    position: relative
    .heads
      font-size: 32px
      margin: 30px 0
    .ordernumtext
      font-size: 24px
    .circle_reloadicon
      position: absolute
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 40px
      height: 40px
      outline: none
      margin: 10px
      top: 0%
      right: 0%
      .-reloadicon
        width: 26px
        height: 24px
    .reloadText
      display: block
      position: absolute
      top: 0%
      right: 0%
      margin-top: 50px
      margin-right: 15.5px
    .order-status
      display: flex
      justify-content: center
      align-items: center
      margin-top: 48px
      &-text
        white-space: nowrap
      &-number
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        min-width: 195px
        max-width: 323px
        margin-left: 30px
        p
          font-size: 24px
      &-payment
        position: relative
        align-self: flex-end
        white-space: nowrap
        margin-left: 30px
        &-icon
          position: absolute
          top: -24px
          left: 20px
          fill: #1ba1ff
          width: 24px
    .fs-24
      font-size: 24px
    .fs-18
      font-size: 18px
    .fs-14
      font-size: 14px
    .-center
      text-align: center
      .framebody
        height: 300px
        .frame
          border: none
    .orderbox
      width: 100%
      padding: 0 80px
      height: auto
      border-radius: 2px
      background-color: #f4f4f4
      margin: 0 auto
    .optionflex
      display: flex
      margin-left: 50px
      margin-bottom: 30px
      #flexitem1
        margin: 5px 10px 5px 20px
        width: 15%
      #flexitem2
        margin: 5px 0
        border-left: 2px solid $gray
        .leftBorder
          padding: 0 20px
    .restaurant-page
      .label
        min-width: 150px
      .date
        display: flex
        align-items: center
        min-height: 66px
        margin-top: 20px
        background-color: #f4f4f4
        border-bottom: solid 1px #e4e4e4
        .-title
          text-align: center
        .-data
          padding-left: 0
      .people
        display: flex
        align-items: center
        min-height: 66px
        background-color: #f4f4f4
        .-title
          text-align: center
        .-data
      .plan
        display: flex
        align-items: center
        min-height: 66px
        margin-top: 20px
        background-color: #f4f4f4
        border-bottom: solid 1px #e4e4e4
        .plan-title
          padding: 0
          text-align: center
          @include pc_view
            display: flex
            justify-content: center
            align-items: center
            min-width: 150px
        .plan-wrapper
          padding-bottom: 0
          justify-content: space-between
          @include pc_view
            padding: 16px 24px 16px 0
        .-data
          padding-left: 0
      .-RTseat
        display: flex
        align-items: center
        min-height: 66px
        background-color: #f4f4f4
        border-bottom: solid 1px #e4e4e4
        .-title
          text-align: center
        .-data
          padding-left: 0
      .option-wrapper
        display: flex
        align-items: center
        min-height: 66px
        background-color: #f4f4f4
        .options-wrapper
          flex: 1
          padding-left: 8px
          padding-right: 24px
          .options
            display: flex
            justify-content: space-between
            .option
              display: flex
              align-items: center
              p:nth-child(2)
                margin-left: 8px
        .-title
          text-align: center
        .-data
          padding-left: 0
      .price-wrapper
        display: flex
        align-items: center
        min-height: 66px
        background-color: #f4f4f4
        .total-price
          display: flex
          justify-content: flex-end
          flex: 1
          padding-right: 24px
          .price
            display: flex
            justify-content: space-between
            align-items: baseline
            .price-title
              display: flex
              align-items: flex-end
              margin-right: 16px
              .tax
                font-size: 14px
          .total
            font-size: 18px
        .-title
          text-align: center
    .questionnaire
      display: flex
      justify-content: center
      margin: 24px 0
      .questionnaire__btn
        display: flex
        justify-content: center
        width: 80%
      .modify__btn
        display: flex
        justify-content: center
        width: 100%
        height: 52px
        margin-bottom: 125px
        .cancel__btn
          position: relative
          width: 325px
          margin-top: 0
          margin-left: 16px
          margin-bottom: 125px
          button
          .cancel-info
            position: absolute
            top: 78px
            width: 41.02vw
            margin-top: 0
</style>
