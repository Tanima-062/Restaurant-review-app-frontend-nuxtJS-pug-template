<template lang="pug">
base-drawer-free.drawer(
  :isActive='isShow',
  @close='closeDrawer',
  title='プラン詳細',
  textSize='L',
  number=1,
  padding='none'
)
  api-loading.planLoading(:loading='planId === 0 || !isLoading')
  .courseModal(v-if='planId !== 0 && isLoading')
    .course-top
      .tagarea
        .tag(v-if='courceDetail.freeDrinks')
          paragraph(fontSize='tiny', letterSpacing='none') 飲み放題
      .detail-title
        paragraph-bold(fontSize='medium', letterSpacing='none') {{ courceDetail.name }}
        paragraph(v-if='!isSeatOnly', fontSize='tiny', letterSpacing='none') 全{{ courceDetail.numberOfCource }}品
      .priceTxt(v-if='courceDetail.price && !isSeatOnly')
        span-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(Number(courceDetail.price.price)) }}
        Span(fontSize='tiny', letterSpacing='none') （税込）
      .priceTxt(v-if='courceDetail.price && isSeatOnly')
        span-bold(fontSize='medium', letterSpacing='none') 当日会計
    .imgList
      img.imgs(
        v-if='courceDetail.image.imageUrl',
        :src='courceDetail.image.imageUrl'
      )
      no-image.imgs(v-else)
    paragraph.course-mid(fontSize='small', letterSpacing='none') {{ courceDetail.description }}
    .grayBox
      #add-option(v-if='!isSeatOnly')
        .plan-price
          .plan-price-title
            paragraph-bold(fontSize='medium', letterSpacing='none') プラン料金
          .plan-price-description
            paragraph-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(Number(courceDetail.price.price)) }}
            paragraph(fontSize='tiny', letterSpacing='none') x
            paragraph(fontSize='tiny', letterSpacing='none') {{ visitPeople }}名
            paragraph(fontSize='tiny', letterSpacing='none') =
            paragraph-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(planPrice) }}
        .option-box(v-if='$feature("option") && courceDetail.options')
          paragraph-bold(fontSize='medium', letterSpacing='none') 追加オプション
          template(
            v-if='courceDetail.options[0]',
            v-for='(option, index) in courceDetail.options'
          )
            .option(v-if='option.optionCd !== "TOPPING"')
              .text
                .option-content
                  paragraph(fontSize='tiny', letterSpacing='none') {{ option.keyword }}
                  .option-require(v-if='option.required === 1')
                    paragraph(fontSize='tiny', letterSpacing='none') 必須
                .price
                  paragraph-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(Number(option.price)) }}
                  paragraph#count-data(fontSize='tiny', letterSpacing='none') {{ "x" + count[index] }}
              .count-box
                plus-minus-circle.c_position(
                  minCount=0,
                  :maxCount='visitPeople',
                  :currentCount='count[index]',
                  @change-count='countnum',
                  :price='option.price',
                  :identifier='index'
                )
        #sum-price
          hr.section-last
          .check-box
            paragraph-bold(fontSize='medium', letterSpacing='none') お支払い金額
            .sum
              paragraph-bold(letterSpacing='none') 合計
              Span#tax-sum(fontSize='tiny', letterSpacing='none') （税込）
              paragraph-bold ¥{{ $moneyFormat(Number(planPrice) + Math.floor(sumPrice)) }}
      #add-option(v-else)
        #sum-price
          .check-box
            paragraph-bold(fontSize='medium', letterSpacing='none') お支払い金額
            .sum
              paragraph-bold(letterSpacing='none') 合計
              Span#tax-sum(fontSize='tiny', letterSpacing='none') （税込）
              paragraph-bold ¥{{ $moneyFormat(Number(planPrice) + Math.floor(sumPrice)) }}
      paragraph.error(v-show='errorMessage', letterSpacing='none') {{ errorMessage }}
    .course-content
      simple-accordion.course-detail(:title='"プラン内容"', :firstOpen='true')
        .detail-flex
          paragraph.head(fontSize='small', letterSpacing='none') 品数
          paragraph.text(fontSize='small', letterSpacing='none') 全{{ itemCheck(courceDetail.numberOfCource) }}品
        hr.section-last
        .detail-flex
          paragraph.head(fontSize='small', letterSpacing='none') 人数
          paragraph.text(fontSize='small', letterSpacing='none') {{ isMinCheck(courceDetail.availableNumberOfLowerLimit) + " ~ " + isMaxCheck(courceDetail.availableNumberOfUpperLimit) }} 名
        hr.section-last
        .detail-flex
          paragraph.head(fontSize='small', letterSpacing='none') 飲み放題
          paragraph.text(fontSize='small', letterSpacing='none') {{ isDrinkPlan(courceDetail.freeDrinks) }}
        hr.section-last
        .detail-flex
          paragraph.head(fontSize='small', letterSpacing='none') プラン提供時間
          paragraph.text(fontSize='small', letterSpacing='none') {{ hyChange(courceDetail.providedTime) }}分制
        hr.section-last
        .detail-flex
          paragraph.head(fontSize='small', letterSpacing='none') 注意事項
          paragraph.text(fontSize='small', letterSpacing='none') {{ itemCheck(courceDetail.notes) }}
      simple-accordion(
        v-if='courceDetail.plan',
        :title='"メニュー内容"',
        :firstOpen='true'
      )
        paragraph.plan-description(fontSize='small', letterSpacing='none') {{ courceDetail.plan }}
      template(v-if='$feature("review")')
        simple-accordion.review(
          v-if='courceDetail.reviews && courceDetail.reviews.length',
          :title='"クチコミ"'
        )
          review-detail(:reviews='courceDetail.reviews')
    .reservation
      CTA-button-others#flexitem1(
        fontSize='small',
        type='primary',
        text='予約へ進む',
        @click='pushOther(); movedPage()',
        :disabled='!reservationDisabled'
      )
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit, Watch } from 'nuxt-property-decorator'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
import BaseDrawerFree from '~/components/atoms/drawers/BaseDrawerFree.vue'
import CalendarIcon from '~/assets/icon/calendar.svg'
import ClockIcon from '~/assets/icon/clock.svg'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import CTAButtonOthers from '~/components/atoms/button/CTAButtonOthers.vue'
import DatePicker from '~/components/atoms/form/DatePicker.vue'
import ImageRadio from '~/components/molecules/radio/ImageRadio.vue'
import InnerTitleRestaurantButton from '~/components/atoms/button/InnerTitleRestaurantButton.vue'
import NoImage from '~/components/atoms/noImage/index.vue'
import NotificationGourmet from '~/components/molecules/card/NotificationGourmet.vue'
import PlusMinusCircle from '~/components/molecules/counter/PlusMinusCource.vue'
import ReviewDetail from '~/components/organisms/store/ReviewDetail.vue'
import SimpleAccordion from '~/components/molecules/accordion/SimpleAccordion.vue'
import UserShapeIcon from '~/assets/icon/user-shape.svg'
import ValidatedTextArea from '~/components/molecules/textarea/ValidatedTextArea.vue'

@Component({
  components: {
    ApiLoading,
    BaseDrawerFree,
    CalendarIcon,
    ClockIcon,
    CTAButton,
    CTAButtonOthers,
    DatePicker,
    Heading,
    ImageRadio,
    InnerTitleRestaurantButton,
    NoImage,
    NotificationGourmet,
    Paragraph,
    ParagraphBold,
    PlusMinusCircle,
    ReviewDetail,
    SimpleAccordion,
    Span,
    SpanBold,
    UserShapeIcon,
    ValidatedTextArea
  }
})
export default class CourseDetail extends Vue {
  @Prop() isShow!: boolean
  @Prop({ default: 0 }) planId!: number
  @Prop() maxPeople?: number
  @Prop() visitDate!: string
  @Prop() visitTime!: string
  @Prop() visitPeople!: number

  sumPrice = 0
  count = [0]
  lowerLimit = 0
  upperLimit = 0
  isRequired = false
  isLoading = false
  isLunchProvided = false
  isDinnerProvided = false

  @Watch('planId')
  updatedPlanId() {
    if (this.planId !== 0) {
      this.getInfo()
    }
  }

  @Emit()
  closeDrawer() {
    this.count.fill(0)
    this.sumPrice = 0
    this.isRequired = false
    this.isLoading = false
    this.isLunchProvided = false
    this.isDinnerProvided = false
    this.isLoading = false
  }

  @Emit()
  movedPage() {
    // 親コンポーネントイベント伝達
  }

  // コース詳細情報取得
  get courceDetail() {
    const data = this.$store.getters['modules/cource/getterCource']
    if (this.$feature('options') && data.options) {
      const count = data.options.length
      if (this.count.length + 1 <= count) {
        for (let i = 0; i < count - 1; i++) {
          this.count.push(0)
        }
      }
    }
    return data
  }

  // 提供時間
  get providedTime() {
    return this.courceDetail.providedTime
  }

  // ランチ提供時間
  get providedLunchTime(): Array<string> {
    const lunchTime = new Array(2)
    if (this.courceDetail.salesLunchStartTime && this.courceDetail.salesLunchEndTime) {
      lunchTime[0] = this.courceDetail.salesLunchStartTime.substring(0, 5)
      lunchTime[1] = this.courceDetail.salesLunchEndTime.substring(0, 5)
      return lunchTime
    } else {
      return []
    }
  }

  // ディナー提供時間
  get providedDinnerTime(): Array<string> {
    const dinnerTime = new Array(2)
    if (this.courceDetail.salesDinnerStartTime && this.courceDetail.salesDinnerEndTime) {
      dinnerTime[0] = this.courceDetail.salesDinnerStartTime.substring(0, 5)
      dinnerTime[1] = this.courceDetail.salesDinnerEndTime.substring(0, 5)
      return dinnerTime
    } else {
      return []
    }
  }

  // 予約時間が提供時間の内に入ってるか判断
  get isProvidedTime() {
    const visitTime = this.convertMinutes(this.visitTime)
    if (this.providedLunchTime.length > 0) {
      this.isLunchProvided = true
      const startTime = this.convertMinutes(this.providedLunchTime[0])
      const endTime = this.convertMinutes(this.providedLunchTime[1])
      if (startTime <= visitTime && visitTime < endTime) {
        if (endTime - this.providedTime >= startTime && visitTime + this.providedTime <= endTime) {
          return true
        }
      }
    }

    if (this.providedDinnerTime.length > 0) {
      this.isDinnerProvided = true
      const startTime = this.convertMinutes(this.providedDinnerTime[0])
      const endTime = this.convertMinutes(this.providedDinnerTime[1])
      if (startTime <= visitTime && visitTime < endTime) {
        if (endTime - this.providedTime >= startTime && visitTime + this.providedTime <= endTime) {
          return true
        }
      }
    }
    if (this.providedLunchTime.length === 0 && this.providedDinnerTime.length === 0) {
      return true
    }
    return false
  }

  // 席だけ予約
  get isSeatOnly() {
    return this.courceDetail.onlySeat
  }

  // 人数分プラン価格
  get planPrice() {
    return this.courceDetail.price.price * this.visitPeople
  }

  // 店舗情報取得
  get storeInfo() {
    if (this.$store.getters['modules/listStore/getStore']) {
      return this.$store.getters['modules/listStore/getStore']
    }
  }

  // 営業時間と提供時間計算（予約可能条件）
  get isAvailableTime() {
    let isAvailable = false
    if (this.storeInfo.openingHours && this.storeInfo.openingHours.length > 0) {
      const visitTime = this.convertMinutes(this.visitTime)
      this.storeInfo.openingHours.forEach((openingHour) => {
        const openTime = this.convertMinutes(openingHour.openTime)
        const closeTime = this.convertMinutes(openingHour.closeTime)
        if (openTime <= visitTime && visitTime <= closeTime) {
          if (closeTime - openTime >= this.providedTime && closeTime - visitTime >= this.providedTime) {
            isAvailable = true
          }
        }
      })
    }
    return isAvailable
  }

  // 予約可能最小人数
  get isSeatMin() {
    this.lowerLimit = this.isMinCheck(this.courceDetail.availableNumberOfLowerLimit)
    if (this.lowerLimit <= this.visitPeople) {
      return true
    }
    return false
  }

  // 予約可能最大人数
  get isSeatMax() {
    this.upperLimit = this.isMaxCheck(this.courceDetail.availableNumberOfUpperLimit)
    if (this.visitPeople <= this.upperLimit) {
      return true
    }
    return false
  }

  // 予約可能条件
  get reservationDisabled() {
    return (
      !this.isUnavailableMessage &&
      this.isAvailableTime &&
      this.isSeatMin &&
      this.isSeatMax &&
      (this.isRequired || this.isSeatOnly) &&
      this.isProvidedTime
    )
  }

  // result.messageは現状不要(予約できるプランだけプラン一覧で出しているのとエラーメッセージの調整をしてない)
  // なので使うようになったらerrorMessageで出すようにする
  get isUnavailableMessage() {
    return this.courceDetail.result.status ? '' : this.courceDetail.result.message
  }

  // 予約不可能メッセージ
  get errorMessage() {
    if (this.isUnavailableMessage) {
      return 'このプランはご指定の条件で空席がありません。\n別の条件でお探しください。'
    } else if (!this.isAvailableTime) {
      return 'プラン時間が営業時間を超えている為お申し込みできません。\n別の条件でお探しください。'
    } else if (!this.isSeatMin) {
      return `現在お申し込み可能な人数は${this.lowerLimit}人からです。\n別の条件でお探しください。`
    } else if (!this.isSeatMax) {
      return `現在お申し込み可能な人数は${this.upperLimit}人までです。\n別の条件でお探しください。`
    } else if (!this.isProvidedTime) {
      const lunchStartTime = this.providedLunchTime[0]
      const lunchEndTime = this.providedLunchTime[1]
      const dinnerStartTime = this.providedDinnerTime[0]
      const dinnerEndTime = this.providedDinnerTime[1]
      const convertLunchStartTime = this.convertMinutes(lunchStartTime)
      const convertLunchEndTime = this.convertMinutes(lunchEndTime)
      const convertDinnerStartTime = this.convertMinutes(dinnerStartTime)
      const convertDinnerEndTime = this.convertMinutes(dinnerEndTime)
      if (this.isLunchProvided && this.isDinnerProvided) {
        if (this.providedLunchTime.length > 0 && this.providedDinnerTime.length > 0) {
          return `このプランの提供時間は下記の通りです\nランチ：${lunchStartTime}${this.convertHours(
            convertLunchEndTime - this.providedTime > convertLunchStartTime
              ? convertLunchEndTime - this.providedTime
              : 0
          )}\nディナー：${dinnerStartTime}${this.convertHours(
            convertDinnerEndTime - this.providedTime > convertDinnerStartTime
              ? convertDinnerEndTime - this.providedTime
              : 0
          )}\n別の条件でお探しください。`
        }
      } else if (this.isLunchProvided) {
        if (this.providedLunchTime.length > 0) {
          return `このプランの提供時間は下記の通りです\nランチ：${lunchStartTime}${this.convertHours(
            convertLunchEndTime - this.providedTime > convertLunchStartTime
              ? convertLunchEndTime - this.providedTime
              : 0
          )}\n別の条件でお探しください。`
        }
      } else if (this.isDinnerProvided) {
        if (this.providedDinnerTime.length > 0) {
          return `このプランの提供時間は下記の通りです\nディナー${dinnerStartTime}${this.convertHours(
            convertDinnerEndTime - this.providedTime > convertDinnerStartTime
              ? convertDinnerEndTime - this.providedTime
              : 0
          )}\n別の条件でお探しください。`
        }
      }
    }
    return ''
  }

  // 時を分に交換（時間計算用）
  convertMinutes(time?: string) {
    if (!time) {
      return 0
    }
    const timeParts = time.split(':')
    return Number(timeParts[0]) * 60 + Number(timeParts[1])
  }

  // 分を時に交換（時間計算用）
  convertHours(time: number) {
    if (!time) {
      return ''
    }
    const hours = time / 60
    const rhours = Math.floor(hours)
    const minutes = hours - rhours
    const rminutes = Math.round(minutes)
    const minutesFormat = rminutes < 10 ? `0${rminutes}` : rminutes
    return `〜${rhours}:${minutesFormat}`
  }

  // 飲み放題flag
  isDrinkPlan(value) {
    if (value === true) {
      return 'あり'
    } else {
      return 'なし'
    }
  }

  // 品 null check
  itemCheck(value) {
    if (value === null || value === 0) {
      return '-'
    } else {
      return value
    }
  }

  // 提供時間 null check
  hyChange(value) {
    if (value === 0 || null || undefined) {
      return '--'
    } else {
      return value
    }
  }

  // 最小人数nullチェック
  isMinCheck(lowerLimit) {
    if (!lowerLimit) {
      return 1
    }
    return lowerLimit
  }

  // 最大人数nullチェック
  isMaxCheck(maxLimit) {
    if (!maxLimit) {
      if (this.maxPeople) {
        return this.maxPeople
      } else {
        return '-'
      }
    }
    return maxLimit
  }

  // コース情報取得
  async getInfo() {
    const planId = Number(this.planId)
    await this.$store
      .dispatch('modules/cource/GetCource', {
        planId,
        visitDate: this.visitDate,
        visitTime: this.visitTime,
        visitPeople: this.visitPeople
      })
      .then(() => {
        this.isLoading = true
        this.optionStatusCheck()
      })
  }

  // 必須optionチェック
  optionStatusCheck() {
    if (!this.$feature('option')) {
      return (this.isRequired = true)
    }
    const options = this.courceDetail.options
    const isValidation: Array<number> = []
    if (options) {
      options.forEach((option, index) => {
        if (option.required === 1) {
          isValidation.push(this.count[index])
        }
      })
    }

    if (isValidation.every((x) => x > 0)) {
      this.isRequired = true
    } else {
      this.isRequired = false
    }
  }

  /**
   * 追加オプションの増減
   */
  countnum(data): void {
    this.count[data.identifier] = data.newCount
    const addPrice = data.price === 0 ? 0.01 : data.price
    if (data.upDown === 1) {
      this.sumPrice = this.sumPrice + addPrice
    } else {
      this.sumPrice = this.sumPrice - addPrice
    }
    this.optionStatusCheck()
  }

  // 予約画面に移動
  pushOther() {
    const menu = {
      name: this.courceDetail.name,
      id: this.courceDetail.id,
      price: this.courceDetail.price.price,
      count: 1
    }
    const options = this.$feature('option') ? this.courceDetail.options : undefined
    const visitDate = this.visitDate
    const visitTime = this.visitTime
    const persons = this.visitPeople
    if (options) {
      options.forEach((option, index) => {
        option.count = this.count[index]
      })
    }

    const sendData = {
      menus: [{ menu, options }],
      visitDate,
      visitTime,
      persons
    }
    this.$store.dispatch('modules/reservationGourmet/resetReservation')
    this.$store.dispatch('modules/common/setAppCd', 'RS')
    this.$store.dispatch('modules/reservationGourmet/setReservation', sendData)
    this.$router.push('/reservation/input_form')
  }
}
</script>

<style lang="sass" scoped>
.drawer :deep()
  .-content
    margin-bottom: 0
.courseModal
  .course-top
    padding: 0 16px
    .detail-title
      display: flex
      align-items: center
      margin-top: 8px
      margin-left: 12px
      p
        margin-right: 4px
    .tagarea
      display: flex
      align-items: center
      .tag
        display: flex
        justify-content: center
        align-items: center
        width: 55px
        height: 20px
        margin-right: 10px
        border-radius: 2px
        border: solid 1px $dark_gray
  .section-last
    background-color: $gray
  .imgList
    width: 100%
    margin: 10px 0
    text-align: center
    .imgs
      width: 100%
      max-width: 300px
      height: 225px
      object-fit: cover
      @include pc_view
        max-width: 450px
        height: 337px
  .priceTxt
    display: flex
    justify-content: flex-end
    align-items: flex-end
  .course-mid
    white-space: pre-wrap
    padding: 0 16px
  .grayBox
    margin: 24px 0 0 0
    padding: 16px 0
    background-color: $light_gray
    width: 100%
    .input_box
      padding-top: 20px
      padding-bottom: 20px
      display: flex
      position: relative
      width: 100%
      @include pc_view
        width: 90%
      margin: -20px auto
      background-color: $light_gray
      .-icon
        margin-left: 20px
        position: absolute
        top: 44%
        left: 0%
        width: 20px
        height: 26px
        fill: $dark_gray
        padding: 0 16px
  .course-content
    padding: 0 16px
    .course-detail
      .detail-flex
        display: flex
      .head
        width: 30%
      .text
        width: 70%
        line-height: 1.29
    .option-content
      display: flex
      margin-right: 16px
      .option-require
        display: flex
        justify-content: center
        align-items: center
        min-width: 30px
        height: 20px
        p
          color: red
    .plan-description
      white-space: pre-wrap
      line-height: 1.29
    .review:is(.simple-accordion-open)
      // クチコミだけ開いた時は下線を消す
      border: none
#add-option
  margin: 0 auto
  padding: 15px
  background-color: white
  width: 90%
  .option
    margin: 10px 0
    display: flex
    justify-content: space-between
  .c_position
    margin: 10px 0
    margin-left: auto
    margin-right: 0px
    width: 90px !important
  .plan-price
    @include pc_view
      display: flex
      justify-content: space-between
    .plan-price-title
    .plan-price-description
      display: flex
      justify-content: flex-end
      align-items: center
      p
        margin-right: 2px
#sum-price
  .check-box
    display: flex
    justify-content: space-between
  .sum
    display: flex
    #tax-sum
      padding-top: 3%
.reservation
  position: sticky
  bottom: 0
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 80px
  padding: 16px 0
  background-color: $white
  border-top: 1px solid $gray
  z-index: 10
  #flexitem1
    display: flex
    justify-content: center
    align-items: center
    width: 325px
    @include sp_view
      width: 200px
  #flexitem2
    margin-right: 15%
    border: none
    background-color: rgba(228, 228, 228, 0.45)
.error
  display: flex
  justify-content: center
  margin-top: 8px
  padding: 0 16px
  color: red
  text-align: left
  white-space: pre-line
.price
  display: flex
  #count-data
    margin-top: 2.5px
    margin-left: 8px
.planLoading
  position: absolute !important
  top: calc(50% - 96px)
</style>
