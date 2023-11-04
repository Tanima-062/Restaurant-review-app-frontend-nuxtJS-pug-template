<template lang="pug">
.confirmpage
  full-loading(v-if='isFirstLoading', :isLoading='isFirstLoading')
  template(v-else)
    .takeout(v-if='appCd === "TO"')
      payment-loading(
        :isLoading='isLoading',
        text='お支払い画面に移動しています。',
        text2='画面を操作せず、しばらくお待ちください。'
      )
      payment-step-bar.stepbar(active=2.5)
      paragraph-bold#top.-text(fontSize='big') ご注文内容の確認・変更
      paragraph-bold#catch-time.-text(fontSize='medium') 商品の受け取り日時
      .datebox(v-if='receiveDate && receiveTime')
        paragraph-bold.datefont(fontSize='medium') {{ receiveDate }} {{ receiveTime }}
      paragraph-bold.-text(fontSize='big') ご注文内容
      .orderbox
        ul(
          v-if='orderedMenu',
          v-for='(item, num) in orderedMenu',
          :key='orderedMenu.menu'
        )
          li
            .orderflex
              #flexitem1
                paragraph.name-line(fontSize='medium', v-if='orderedMenu') {{ item.menu.name }} <br>
                paragraph-bold(fontSize='medium') ¥{{ $moneyFormat(item.menu.price) }}
                  Span(fontSize='tiny') ×{{ item.menu.count }}
              #flexitem2
                plus-minus-circle(
                  minCount=0,
                  :maxCount='item.menu.maxCount',
                  :currentCount='item.menu.count',
                  @change-count='countnum($event, num)',
                  width='80px'
                )
            .optionflex(v-if='item.options.length > 0')
              #flexitem1
                paragraph.fs-14(fontSize='tiny') オプション
                paragraph
                  span-bold.fs-14(fontSize='tiny') ¥{{ $moneyFormat(optionTotalPrice(item.options)) }}
                  Span(fontSize='tiny') ×{{ item.menu.count }}
              #flexitem2
                div(v-for='opt in item.options')
                  //- トッピングの時の処理
                  paragraph.leftBorder.fs-14(
                    fontSize='tiny',
                    v-if='Array.isArray(opt)'
                  ) トッピング:
                    div(v-for='topping in opt')
                      Span(fontSize='tiny') {{ topping.contents }} （¥{{ $moneyFormat(Number(topping.price)) }}）
                  //- オプションの時の処理
                  paragraph.leftBorder.fs-14(fontSize='tiny', v-else) {{ opt.keyword }} : {{ opt.contents }}（¥{{ $moneyFormat(Number(opt.price)) }}）
        .sumflex
          #flexitem1
            paragraph-bold.sumleft(fontSize='medium') お支払い金額
          #flexitem2
            paragraph-bold.sum(fontSize='medium') 合計
              Span(fontSize='tiny') （税込）
          #flexitem3
            paragraph-bold.sum(fontSize='medium') ¥{{ $moneyFormat(totalPrice) }}
      .error-message(v-if='dirty')
        div
          p.error-color(v-for='error in disables.menus') {{ error }}
      paragraph-bold.-text.store(fontSize='big') 商品のお受け取り店舗
      paragraph-bold.-text-detail(fontSize='large') {{ storeInfo.name }}
      //- paragraph.-text-detail(fontSize='small') {{ storeInfo.storeGenres[0] ? storeInfo.storeGenres[0].name : "" }}
      paragraph.-text-detail(fontSize='small') {{ storeInfo.address }}
      .-center
        iframe.frames(
          :src='"https://www.google.com/maps/embed/v1/place?key=AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw&q=" + storeInfo.latitude + "," + storeInfo.longitude',
          width='100%',
          height='auto',
          frameborder='0'
        )
      paragraph-bold.-text(fontSize='medium') お客様情報
      paragraph.infoTitle(fontSize='tiny') 氏名
      paragraph.infoText(fontSize='small') {{ userData.firstName }}{{ userData.lastName }}
      paragraph.infoTitle(fontSize='tiny') メールアドレス
      paragraph.infoText(fontSize='small') {{ userData.email }}
      paragraph.infoTitle(fontSize='tiny') 電話番号
      paragraph.infoText(fontSize='small') {{ userData.tel }}
      paragraph.infoTitle(fontSize='tiny') お店への連絡事項
      paragraph.infoText(fontSize='small', v-if='userData.request != null') {{ userData.request }}
      paragraph.infoText(fontSize='small', v-else) 特にありません
      .button
        CTA-button(
          fontSize='large',
          type='primary',
          text='お支払いへ進む',
          @click='confirmed()',
          :disabled='dirty'
        )
    .restaurant(v-else)
      payment-loading(
        v-if='isOnlySeat',
        :isLoading='isLoading',
        text='loading'
      )
      payment-loading(
        v-else,
        :isLoading='isLoading',
        text='お支払い画面に移動しています。',
        text2='画面を操作せず、しばらくお待ちください。'
      )
      payment-step-bar.stepbar(active=2.5, :isOnlySeat='isOnlySeat')
      paragraph-bold#top.-restaurant-text(fontSize='big') ご注文内容の確認
      .restaurantMypage
        paragraph-bold.storetext.fs-24.mt-40(fontSize='big') 日時・人数
        .-RTcell.mt-20
          paragraph.-title.fs-16(fontSize='small') 日時
          paragraph-bold.-data.fs-16(fontSize='small') {{ visitDate }}({{ dayOfTheWeek }}) {{ visitTime }}〜
        .-RTcell
          paragraph.-title.fs-16(fontSize='small') 人数
          paragraph-bold.-data.fs-16(fontSize='small') {{ visitPeople }}人
        paragraph-bold.storetext.fs-18.mt-54(fontSize='big') ご予約のプラン・オプションなど
        .plan.mt-20
          paragraph.-title-second.fs-16(fontSize='small') プラン
          .plan-wrapper
            .plan-name
              paragraph-bold.-data.fs-16(fontSize='small') {{ planName }}
            .price
              paragraph-bold(v-if='planPrice > 0', fontSize='base') ¥{{ $moneyFormat(planPrice) }}
        .-RTcell(v-if='options.length > 0')
          paragraph.-title.fs-16(fontSize='small') 追加オプション
          .options-wrapper
            .options(v-for='option in options')
              .option
                paragraph-bold.-data.fs-16(fontSize='base') {{ option.keyword }}
                paragraph(font-size='small') x{{ option.count }}
              .price
                paragraph-bold(fontSize='base') ¥{{ $moneyFormat(Number(option.price) * Number(option.count)) }}
        .-RTcell
          paragraph-bold.payment.-title-second.fs-16(fontSize='small') お支払い金額
          .total-price
            .price
              .price-title
                paragraph-bold.-data.fs-16(fontSize='small') 合計
                paragraph.-data.fs-16(fontSize='tiny') (税込)
              paragraph-bold.-data.fs-16(fontSize='base') ¥{{ $moneyFormat(totalPlanPrice) }}
      .error-message(v-if='dirty')
        div
          p.error-color(v-for='error in disables.menus') {{ error }}
      paragraph-bold.store.storetext(fontSize='big') ご予約の店舗
      paragraph-bold.store-label.title(fontSize='small') {{ restaurantInfo.name }}
      .genre(v-if='restaurantInfo.storeGenres')
        .genre-loop(v-for='(genre, index) in restaurantInfo.storeGenres')
          paragraph.store-label(fontSize='small') {{ diagonalPlus(index) + genre.name }}
      paragraph.store-label(fontSize='small') {{ $zipCodeFormat(restaurantInfo.postalCode) + " " + restaurantInfo.address }}
      .seals-time(v-if='restaurantInfo.openingHours')
        clock-icon.-icon
        .time-loop(v-for='(timeData, index) in restaurantInfo.openingHours')
          paragraph.store-label.sp-size(fontSize='small') {{ diagonalPlus(index) + secondsDelect(timeData.openTime) + "〜" + secondsDelect(timeData.closeTime) }}
      .-center
        iframe.frames(
          :src='"https://www.google.com/maps/embed/v1/place?key=AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw&q=" + restaurantInfo.latitude + "," + restaurantInfo.longitude',
          width='100%',
          height='auto',
          frameborder='0'
        )
      paragraph-bold.storetext(fontSize='medium') お客様情報
      paragraph.customer-label(fontSize='tiny') 氏名
      paragraph.customer-info(fontSize='small') {{ userData.firstName }}{{ userData.lastName }}
      paragraph.customer-label(fontSize='tiny') メールアドレス
      paragraph.customer-info(fontSize='small') {{ userData.email }}
      paragraph.customer-label(fontSize='tiny') 電話番号
      paragraph.customer-info(fontSize='small') {{ userData.tel }}
      paragraph.customer-label(fontSize='tiny') お店への連絡事項
      paragraph.customer-info(
        fontSize='small',
        v-if='userData.request != null'
      ) {{ userData.request }}
      paragraph.customer-label(fontSize='small', v-else) 特にありません
      cancel-policy(
        v-if='this.cancelPolicy.length > 0 && !isOnlySeat',
        :cancelPolicy='cancelPolicy'
      )
      .button
        CTA-button(
          v-if='isOnlySeat',
          fontSize='large',
          type='primary',
          text='席のみ予約をする',
          @click='confirmed()'
        )
        CTA-button(
          v-else='isOnlySeat',
          fontSize='large',
          type='primary',
          text='お支払いへ進む',
          @click='confirmed()'
        )
        paragraph.button-info(v-if='!isOnlySeat', fontSize='tiny') ※決済ページへ飛びます
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import keyBy from 'lodash/keyBy'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import ArrowIcon from '~/assets/icon/arrow.svg'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import CancelPolicy from '~/components/organisms/cancel/CancelPolicy.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import PaymentLoading from '~/components/molecules/loading/PaymentLoading.vue'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import PlusMinusCircle from '~/components/molecules/counter/PlusMinusCircle.vue'
import ClockIcon from '~/assets/icon/clock.svg'
@Component({
  components: {
    ArrowIcon,
    CTAButton,
    CancelPolicy,
    FullLoading,
    Heading,
    Paragraph,
    ParagraphBold,
    PaymentLoading,
    PaymentStepBar,
    PlusMinusCircle,
    Span,
    SpanBold,
    ClockIcon
  }
})
export default class ConfirmIndex extends Vue {
  mounted() {
    setTimeout(() => {
      if (this.orderedMenu.length > 0 || this.reservationDetail.menus.length > 0) {
        this.isFirstLoading = false
      } else {
        this.$router.replace({ name: 'index' })
      }

      if (this.appCd === 'RS') {
        this.$store.dispatch('modules/cancel/fetchCancelPolicy', {
          id: this.restaurantInfo.id,
          appCd: this.appCd
        })
      }
    }, 0)
  }

  head() {
    return {
      title: '予約確認画面',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '予約確認画面｜レストラン・テイクアウトの検索・予約ならスカイチケットグルメ！近くのお店、人気の東京・大阪エリアの、焼肉・寿司・中華・イタリアンなど様々なジャンルの飲食店が選べる。テイクアウトなら事前予約でお店ですぐに持ち帰りが可能！'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '予約確認画面｜レストラン・テイクアウトの検索・予約ならスカイチケットグルメ！近くのお店、人気の東京・大阪エリアの、焼肉・寿司・中華・イタリアンなど様々なジャンルの飲食店が選べる。テイクアウトなら事前予約でお店ですぐに持ち帰りが可能！'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 5,
      returnPath: '/reservation/input_form',
      headerTitle: 'ご注文内容の確認'
    })
  }

  isFirstLoading = true
  isLoading = false
  date = '8/31（月）13 : 30'
  orderList = [
    { daimei: '鴨胸肉のロースト', price: 1296, count: 2 },
    { daimei: 'イカのマリネサラダ', price: 432, count: 2 },
    { daimei: 'スパイシーパリパリサモサ', price: 1296, count: 1 }
  ]

  private countnum(newCount: number, menuNum: number) {
    const setData = { count: newCount, num: menuNum }
    this.$store.dispatch('modules/reservationGourmet/setCount', setData)
    // this.orderList[num].count = newCount
  }

  get userData() {
    return this.$store.getters['modules/reservationGourmet/getReservationInfo']
  }

  get storeInfo() {
    return this.$store.getters['modules/menu/getTakeoutMenu'].store
  }

  get calcsum() {
    let sumprice = 0
    for (let i = 0; i < this.orderList.length; i++) {
      sumprice = sumprice + this.orderList[i].price * this.orderList[i].count
    }
    return sumprice.toLocaleString()
  }

  get orderedMenu() {
    return this.$store.getters['modules/reservationGourmet/getMenu']
      ? this.$store.getters['modules/reservationGourmet/getMenu']
      : []
  }

  // 店舗情報
  get restaurantInfo() {
    return this.$store.getters['modules/listStore/getStore']
  }

  // 予約プラン名取得
  get planName() {
    return this.reservationDetail.menus[0].menu.name
  } // 予約プランオプション

  // プラン価格取得
  get planPrice() {
    return Number(this.reservationDetail.menus[0].menu.price) * this.visitPeople
  }

  // 選択したオプション取得
  get options() {
    if (
      this.$feature('option') &&
      this.reservationDetail.menus[0].options &&
      this.reservationDetail.menus[0].options.length > 0
    ) {
      return this.reservationDetail.menus[0].options.filter((option) => {
        // return option.keyword !== null
        return option.keyword !== null && option.count > 0
      })
    }
    return []
  }

  // サービスコード取得
  get appCd() {
    return this.$store.getters['modules/common/getAppCd'] ? this.$store.getters['modules/common/getAppCd'] : ''
  }

  // レストランプラン予約情報取得
  get reservationDetail() {
    return this.$store.getters['modules/reservationGourmet/getApplicationRS']
      ? this.$store.getters['modules/reservationGourmet/getApplicationRS']
      : {}
  }

  // 予約時間取得
  get visitTime() {
    return this.reservationDetail.visitTime
  }

  // 予約日付取得
  get visitDate() {
    return this.reservationDetail.visitDate
  }

  // 予約人数取得
  get visitPeople() {
    return this.reservationDetail.persons
  }

  // 予約曜日取得
  get dayOfTheWeek() {
    const date = new Date(this.reservationDetail.visitDate)
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
    return dayOfWeekStr
  }

  // 席のみflag取得
  get isOnlySeat() {
    if (this.$store.getters['modules/cource/getterCource']) {
      return this.$store.getters['modules/cource/getterCource'].onlySeat
    }
  }

  get cancelPolicy() {
    return this.$store.getters['modules/cancel/getCancelPolicy']
      ? this.$store.getters['modules/cancel/getCancelPolicy']
      : []
  }

  // レストランプラン予約料金
  get totalPlanPrice() {
    const menuPrice = this.planPrice
    let optionPrice = 0
    this.options.forEach((option) => {
      optionPrice += option.price * option.count
    })
    return Number(menuPrice) + Number(optionPrice)
  }

  // メニューID毎に合計注文数を併合する
  get mergeMenuCountById() {
    return cloneDeep(this.orderedMenu).reduce((retMenus, menuDetail) => {
      const byId = keyBy([menuDetail.menu], 'id')
      const key = Object.keys(byId)[0]
      if (retMenus[key]) {
        retMenus[key].count += byId[key].count
      } else {
        retMenus[key] = pick(byId[key], ['name', 'count', 'maxCount'])
      }
      return retMenus
    }, {})
  }

  get disables() {
    return Vue.observable({
      /** 注文個数が上限を超えていた場合はエラーメッセージを生成する。エラーがない場合はnull */
      menus: Object.keys(this.mergeMenuCountById).map((menuId) => {
        const menuDetail = this.mergeMenuCountById[menuId]
        // 在庫数が10個以上ある場合、最大注文個数は10にする
        const maxCount = menuDetail.maxCount >= 10 ? 10 : menuDetail.maxCount
        return menuDetail.count > maxCount
          ? `${menuDetail.name}が最大注文数を超えています。
          注文できる個数は最大${maxCount}個までです。`
          : null
      }),
      price: this.totalPrice === 0
    })
  }

  get dirty() {
    return this.isDirty(this.disables)
  }

  get receiveTime() {
    return this.$store.getters['modules/suggest_search/getSearchboxSituation'].pickUpTime
  }

  get receivedating() {
    return this.$store.getters['modules/suggest_search/getSearchboxSituation'].pickUpDate
  }

  get receiveDate() {
    const ST = this.receivedating
    if (ST) {
      const ArrayDate = ST.split('-')
      const newDate =
        ArrayDate[1] + '/' + ArrayDate[2] + '(' + this.getWeek(ArrayDate[0], ArrayDate[1], ArrayDate[2]) + ')'
      return newDate
    }
  }

  get totalPrice() {
    let totalPrices = 0
    for (let i = 0; i < this.orderedMenu.length; i++) {
      totalPrices =
        totalPrices +
        Number(this.orderedMenu[i].menu.price) * this.orderedMenu[i].menu.count +
        Number(this.optionTotalPrice(this.orderedMenu[i].options)) * this.orderedMenu[i].menu.count
    }
    return totalPrices
  }

  isDirty(disables: { [key: string]: (string | null)[] | boolean }): boolean {
    return Object.values(disables).some((value) => {
      return Array.isArray(value) ? value.some((v) => !!v) : !!value
    })
  }

  async idToName(id) {
    const a = this.$store.getters['modules/reservationGourmet/getApplicationTO']
    const param = {
      id,
      query: {
        pickUpDate: a.pickUpDate,
        pickUpTime: a.pickUpTime
      }
    }
    await this.$store.dispatch('modules/menu/getTakeoutMenu', param)
    return this.$store.getters['modules/menu/getTakeoutMenu'].id
  }

  optionTotalPrice(list) {
    let allPrice = 0
    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) {
        for (let j = 0; j < list[i].length; j++) {
          allPrice = Number(allPrice) + Number(list[i][j].price)
        }
      } else {
        allPrice = Number(allPrice) + Number(list[i].price)
      }
    }
    return allPrice
  }

  // 末尾の秒数データを削除する
  secondsDelect(time) {
    return time.slice(0, -3)
  }

  // 営業時間の要素数が1以上の場合に連続する斜線を追加する
  diagonalPlus(index) {
    if (index !== 0) {
      return '/'
    } else {
      return ''
    }
  }

  getWeek(year, month, day) {
    const weeks = ['日', '月', '火', '水', '木', '金', '土']

    const date = new Date(year, month - 1, day)

    return weeks[date.getDay()]
  }

  async confirmed() {
    // 前のcompletestatus(決済完了情報）を初期化する
    this.$store.dispatch('modules/reservationGourmet/resetCS')
    // 外部通信
    this.isLoading = true
    if (this.appCd === 'TO') {
      await this.$store
        .dispatch('modules/reservationGourmet/reservationSaveTO')
        .then(() => {
          // eslint-disable-next-line prettier/prettier
          const { paymentUrl } = this.$store.getters['modules/reservationGourmet/getPaymentST']
          if (paymentUrl) {
            window.location.href = paymentUrl
          } else {
            location.href = 'payment'
          }
        })
        .catch(() => {
          location.href = '/gourmet/reservation/input_form/'
        })
    } else {
      await this.$store
        .dispatch('modules/reservationGourmet/reservationSaveRS')
        .then(() => {
          // eslint-disable-next-line prettier/prettier
          const { paymentUrl } = this.$store.getters['modules/reservationGourmet/getPaymentST']
          if (paymentUrl) {
            window.location.href = paymentUrl
          } else if (!paymentUrl && this.isOnlySeat) {
            this.$router.push('/reservation/complete/')
          } else {
            location.href = 'payment'
          }
        })
        .catch(() => {
          location.href = '/gourmet/reservation/input_form/'
        })
    }
  }
}
</script>
<style lang="sass" scoped>
.confirmpage
  .backArea
    position: relative
    width: 100%
    margin: 0 auto
    .-icon
      position: absolute
      top: 0%
      left: 0%
      width: 30px
      transform: rotate(180deg)
      fill: #a6a6a6
    .backTxt
      position: absolute
      margin-top: 5px
      margin-left: 35px
      width: 50px
  .button
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    margin: 30px auto
    text-align: center
    .button-info
      margin-top: 10px
  .-text
    margin: 10px
  #catch-time
    text-align: center
  .-user
    margin-left: 10px
    margin-bottom: 20px
  .infoTitle
    margin-left: 10px
    color: #4d4d4d
  .infoText
    margin-left: 10px
    margin-bottom: 15px
  .stepbar
    margin: 20px 0
  .sum
    margin-top: 10px
    padding-bottom: 10px
  .-center
    width: 100%
    margin: 20px auto
    text-align: center
  .sumleft
    margin-top: 10px
    margin-left: 10px
    padding-bottom: 10px
  .datebox
    width: 230px
    height: 35px
    border-radius: 17.5px
    background-color: #ffc11c
    margin: 0 auto
    padding: 0 10px
    text-align: center
  .datefont
    padding-left: 8px
    padding-top: 5px
  .orderbox
    width: 343px
    height: auto
    border-radius: 2px
    background-color: #f4f4f4
    margin: 0 auto
  .orderflex
    display: flex
    #flexitem1
      width: 70%
      margin: 15px 0px
      margin-left: 20px
    #flexitem2
      width: 30%
      margin: 15px 0
  .optionflex
    display: flex
    margin-left: 20px
    margin-bottom: 30px
    #flexitem1
      margin: 0px 10px 5px 20px
      width: 50%
    #flexitem2
      margin: 0px 0
      .leftBorder
        border-left: solid 2px $gray
        padding: 0 10px
  .sumflex
    border-top: 1px solid gray
    display: flex
    #flexitem1
      width: 40%
      margin-left: 10px
    #flexitem2
      width: 30%
  .-text.store
    margin-top: 28px
.-text-detail
  margin-left: 10px
  line-height: 1.29
#top
  line-height: 1.4
.name-line
  line-height: 1.25
.restaurant
  .restaurantMypage
    .-title-second
      padding-left: 8px
      @include pc_view
        padding-left: 0
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 20%
        font-size: 14px
    .plan
      padding: 20px 0px 20px 10px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .-title
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 30%
        font-size: 14px
      .plan-wrapper
        display: flex
        justify-content: flex-end
        flex: 1
        padding-right: 24px
        padding-left: 8px
        .plan-name
          margin-right: 16px
        .price
          p
            white-space: pre
    .-RTcell
      display: flex
      padding: 20px 0px 20px 10px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .-title
        display: flex
        justify-content: center
        align-items: center
        width: 30%
        text-align: center
        font-size: 14px
      .-data
        font-size: 14px
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
      .total-price
        display: flex
        justify-content: flex-end
        flex: 1
        padding-right: 24px
        .price
          display: flex
          justify-content: flex-end
          align-items: baseline
          flex: 1
          .price-title
            display: flex
            margin-right: 16px
    .mt-20
      margin-top: 20px
    .mt-40
      margin-top: 40px
    .mt-54
      margin-top: 54px
  .storetext
    margin-top: 24px
    font-size: 16px
  .store-label.title
    font-size: 14px
    margin-top: 16px
  .store-label
    font-size: 12px
    line-height: 1.33
  .customer-label
    color: #4d4d4d
    font-size: 12px
    margin-top: 20px
  .customer-info
    font-size: 14px
  .genre
    display: flex
    flex-wrap: wrap
  .seals-time
    display: flex
    flex-wrap: wrap
    .-icon
      margin-top: 2.5px
      width: 16px
      height: 16px
      margin-right: 6px
      fill: $dark_gray
@include pc_view
  .confirmpage
    .frames
      height: 300px
    .stepbar
      margin: 20px auto
      width: 100%
    .fs-14
      font-size: 14px
    .orderbox
      width: 100%
      padding: 0 65px
    .optionflex
      display: flex
      margin-left: 50px
      margin-bottom: 30px
      #flexitem1
        margin: 5px 10px 5px 20px
        width: 15%
        #flexitem2
          margin: 5px 0
          .leftBorder
            border-left: solid 2px $gray
            padding: 0 20px
    .orderflex
      #flexitem2
        padding-left: 175px
    .sumflex
      border-top: 1px solid gray
      display: flex
      justify-content: space-between
    #flexitem1
      width: 40%
      margin-left: 10px
    #flexitem2
      width: 30%
  #top
    font-size: 32px
  .error-color
    color: red
    white-space: pre-line
    padding: 0 8px 16px
  .restaurant
    .-restaurant-text
      margin: 0
    .restaurantMypage
      .plan
        display: flex
        .-title
          width: 20%
      .-RTcell
        display: flex
        padding: 20px 0px 20px 10px
        background-color: #f4f4f4
        border-bottom: solid 1px #e4e4e4
        .-title
          display: flex
          justify-content: center
          align-items: center
          width: 20%
          text-align: center
          font-size: 16px
        .-data
          font-size: 16px
        .plan-wrapper
          justify-content: space-between
        .options-wrapper
          flex: 1
          padding-right: 24px
          .options
            display: flex
            justify-content: space-between
            .option
              display: flex
              align-items: center
              p:nth-child(2)
                margin-left: 8px
        .total-price
          display: flex
          justify-content: flex-end
          flex: 1
          padding-right: 24px
          .price
            display: flex
            align-items: baseline
            width: 35%
            .price-title
              display: flex
      .mt-20
        margin-top: 20px
      .mt-40
        margin-top: 40px
      .mt-54
        margin-top: 54px
    .storetext
      font-size: 24px
    .store-label.title
      font-size: 18px
      margin-top: 16px
    .store-label
      font-size: 14px
      line-height: 1.29
    .customer-label
      color: #4d4d4d
      font-size: 14px
      margin-top: 16px
    .customer-info
      font-size: 16px
    .button
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      margin: 30px auto
      text-align: center
      .button-info
        font-size: 14px
        margin-top: 10px
</style>
