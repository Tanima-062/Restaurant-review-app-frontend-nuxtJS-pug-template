<template lang="pug">
.update
  full-loading(:is-loading='isLoading || isBlock')
  .update-wrapper
    paragraph-bold.-title(fontSize='big') ご予約内容の変更
    paragraph-bold.-subtitle(fontSize='large') ご来店日時・人数
    paragraph.-explain(fontSize='small') ご希望の日付・人数を選択してください
    .update-condition-wrapper
      date-select(@change-date='changeDate', :selected-date='selectedDate')
      time-button(
        @change-time='changeTime',
        :selected-time='selectedTime',
        :times='vacancyTime',
        :disabled='!vacancyTime.length'
      )
      people-select(
        @change-people='changePeople',
        :selected-people='selectedPeople',
        :peoples='vacancyPeople',
        :disabled='!vacancyPeople.length'
      )
    paragraph.-warn(
      fontSize='small',
      v-if='!isLoading && !isBlock && (!vacancyTime.length > 0 || !vacancyPeople.length > 0)'
    ) 日付を変更し再度検索を行なってください
    paragraph.-warn(
      fontSize='small',
      v-if='!isLoading && !isBlock && errorFlag'
    ) ・来店日時は現在の日時以降に設定してください
  .detail-price-wrapper(v-if='!isOnlySeat')
    .detail-price-inner
      .plan-wrapper
        .plan-inner
          paragraph-bold(fontSize='base', letterSpacing='none') プラン料金
          .price
            paragraph-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(Number(menu[0].unitPrice)) }}
            paragraph(fontSize='tiny', letterSpacing='none') x
            paragraph#count-data(fontSize='tiny', letterSpacing='none') {{ selectedPeople }}名
            paragraph(fontSize='tiny', letterSpacing='none') =
            paragraph-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(menu[0].unitPrice * selectedPeople) }}
      .option-wrapper(
        v-if='options.length > 0',
        v-for='(option, index) in options'
      )
        .option(v-if='option.optionCd !== "TOPPING"')
          .text
            .option-content
              paragraph(fontSize='tiny', letterSpacing='none') {{ option.keyword }}
              .option-require(v-if='option.required === 1')
                paragraph(fontSize='tiny', letterSpacing='none') 必須
            .price
              paragraph-bold(fontSize='medium', letterSpacing='none') ¥{{ $moneyFormat(Number(option.unitPrice)) }}
              paragraph#count-data(fontSize='tiny', letterSpacing='none') {{ "x" + count[index] }}
          .count-box
            plus-minus-circle.c_position(
              minCount=0,
              :maxCount='selectedPeople',
              :currentCount='count[index]',
              @change-count='countnum',
              :price='option.unitPrice',
              :identifier='index',
              :key='renderKey'
            )
      .sum-price.option-wrapper
        paragraph-bold(fontSize='medium', letterSpacing='none') お支払い金額
        .sum
          paragraph-bold(letterSpacing='none') 合計
          Span#tax-sum(fontSize='tiny', letterSpacing='none') （税込）
          paragraph-bold ¥{{ $moneyFormat(Math.floor(sumPrice) <= 0 ? 0 + menu[0].unitPrice * selectedPeople : Math.floor(sumPrice) + menu[0].unitPrice * selectedPeople) }}
  .update-bottom-wrapper
    paragraph-bold.-subtitle(fontSize='medium') お店への連絡事項（任意）
    .-comment
      validated-text-area(
        height=100,
        placeholder='ご予約内容に関する連絡・質問・ご要望などがございましたらご記入ください。',
        @input='onInput($event)'
      )
    .-btn
      CTA-button.-submit(
        fontSize='large',
        text='この内容で変更する',
        thin=false,
        type='secondary_sub',
        @click='confirmed()',
        :disabled='isDisabled'
      )
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { format, parseISO } from 'date-fns'
import cloneDeep from 'lodash/cloneDeep'
import { Heading, SpanBold, Paragraph, ParagraphBold, Span } from '~/components/atoms/typography'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import DateSelect from '~/components/molecules/select/DateSelect.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import PeopleSelect from '~/components/molecules/select/PeopleSelect.vue'
import PlusMinusCircle from '~/components/molecules/counter/PlusMinusCource.vue'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import TimeButton from '~/components/atoms/button/TimeButton.vue'
import ValidatedTextArea from '~/components/molecules/textarea/ValidatedTextArea.vue'
@Component({
  components: {
    CTAButton,
    DateSelect,
    FullLoading,
    Heading,
    Paragraph,
    ParagraphBold,
    PeopleSelect,
    PlusMinusCircle,
    SelectBox,
    Span,
    SpanBold,
    TimeButton,
    ValidatedTextArea
  }
})
export default class InquiryIndex extends Vue {
  selectedDate = ''
  selectedTime = ''
  selectedPeople = 0
  request = ''
  sumPrice = 0
  isRequired = false
  count: number[] = []
  renderKey = 0
  isOptionChanged = true
  isBlock = true
  isLoading = true
  errorFlag = false
  head() {
    return {
      title: 'グルメ',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 5,
      headerTitle: 'ご予約内容の変更',
      returnPath: '/mypage'
    })
  }

  mounted() {
    setTimeout(async () => {
      if (!this.completeStatus.status) {
        this.$router.replace({ name: 'index' })
      }

      this.selectedDate = this.visitDate
      this.selectedTime = this.visitTime
      this.selectedPeople = this.visitPeople
      this.sumPrice = this.optionTotalPrice(this.options)
      this.options.forEach((option) => {
        this.count.push(option.count)
      })
      // 在庫API
      const data = {
        visitDate: this.visitDate,
        menuId: this.menu[0].menuId,
        reservationId: this.menu[0].reservationId
      }
      await this.$store.dispatch('modules/update/FetchMenuVacancy', data)
      this.isLoading = false
    })
  }

  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve']
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

  // 予約日付取得
  get visitDate() {
    const date = this.reservationTime
    const newFormat = format(date, 'yyyy-MM-dd')
    return newFormat
  }

  // 予約人数取得
  get visitPeople() {
    return this.completeStatus.reservation.persons
  }

  get vacancyInfo() {
    return this.$store.getters['modules/update/getVacancyInfo']
  }

  get isDisabled() {
    if (this.isBlock || this.vacancyTime.length === 0 || this.vacancyPeople.length === 0) {
      return true
    } else if (
      this.visitTime === this.selectedTime &&
      this.visitDate === this.selectedDate &&
      this.visitPeople === Number(this.selectedPeople) &&
      this.isOptionChanged
    ) {
      return true
    }
    return false
  }

  get vacancyTime() {
    if (typeof this.vacancyInfo.stocks !== 'undefined' && this.vacancyInfo.stocks.length > 0) {
      const stocks = this.vacancyInfo.stocks
      const vacancyTimes = stocks
        .filter((stock) => stock.people === Number(this.selectedPeople))
        .filter((stock) => stock.sets !== 0)
        .map((stock) => stock.vacancyTime)

      const isEmpty = vacancyTimes.includes(this.selectedTime)
      if (vacancyTimes.length > 0 && (!isEmpty || !this.selectedTime)) {
        this.selectedTime = vacancyTimes[0]
      }
      return vacancyTimes
    }

    return []
  }

  /**
   * 特定時間に予約できる人数表示
   */
  get vacancyPeople() {
    if (typeof this.vacancyInfo.stocks !== 'undefined' && this.vacancyInfo.stocks.length > 0) {
      const stocks = this.vacancyInfo.stocks
      const headCount = stocks
        .filter((stock) => stock.vacancyTime === this.selectedTime && stock.sets > 0)
        .map((stock) => stock.people)
      this.isBlock = false
      return headCount
    }
    this.isBlock = false
    return []
  }

  get menu() {
    return this.completeStatus.reservation.reservationMenus
  }

  get options() {
    if (
      this.$feature('option') &&
      this.completeStatus.reservation.reservationMenus[0].reservationOptions &&
      this.completeStatus.reservation.reservationMenus[0].reservationOptions.length > 0
    ) {
      return this.completeStatus.reservation.reservationMenus[0].reservationOptions.filter((option) => {
        return option.keyword !== null
      })
    }
    return []
  }

  get isOnlySeat() {
    return this.completeStatus.reservation.reservationMenus[0].onlySeat
  }

  @Watch('renderKey')
  maxCount() {
    this.count.forEach((optionCount, index) => {
      if (optionCount > this.selectedPeople) {
        const changedCount = this.count[index] - Number(this.selectedPeople)
        this.count[index] = Number(this.selectedPeople)
        this.sumPrice -= this.options[index].unitPrice * changedCount
      }
    })
  }

  @Watch('renderKey')
  modifyCheck() {
    this.isOptionChanged = this.options.every((option, index) => {
      return option.count === this.count[index]
    })
  }

  // option合計
  optionTotalPrice(options) {
    let allPrice = 0
    // option合計(optionが配列・objectか２パータン)
    options.forEach((option) => {
      if (Array.isArray(option)) {
        option.forEach((detailOption) => {
          allPrice += Number(detailOption.price)
        })
      } else {
        allPrice += Number(option.price)
      }
    })
    return allPrice
  }

  countnum(data): void {
    this.renderKey++
    this.count[data.identifier] = data.newCount
    const addPrice = data.price === 0 ? 0 : data.price
    if (data.upDown === 1) {
      this.sumPrice = this.sumPrice + addPrice
    } else {
      this.sumPrice = this.sumPrice - addPrice
    }

    const options = this.options
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

  changeDate(date: string): void {
    this.isBlock = true
    this.errorFlag = false
    this.selectedDate = date
    const data = {
      visitDate: this.selectedDate,
      menuId: this.menu[0].menuId,
      reservationId: this.menu[0].reservationId
    }
    this.$store.dispatch('modules/update/FetchMenuVacancy', data)
  }

  changeTime(time: string): void {
    this.selectedTime = time
  }

  changePeople(people: number): void {
    this.renderKey++
    this.selectedPeople = people
  }

  onInput(text): void {
    this.request = text
  }

  validVisitDate(visitDate: string, visitTime: string) {
    return new Date() > new Date(`${visitDate.replace(/-/g, '/')} ${visitTime}`)
  }

  confirmed(): void {
    const newOptions = cloneDeep(this.options)
    let count = 0
    newOptions.forEach((option) => {
      Object.keys(option).forEach((key) => {
        if (key === 'count') {
          option[key] = this.count[count]
          count++
        }
      })
    })

    const data = {
      date: this.selectedDate,
      time: this.selectedTime,
      persons: this.selectedPeople,
      request: this.request,
      reservationOptions: newOptions
    }

    if (this.validVisitDate(this.selectedDate, this.selectedTime)) {
      this.errorFlag = true
    } else {
      this.errorFlag = false
      this.$store.dispatch('modules/update/SetChangeInfo', data).then(() => {
        this.$router.push('/reservation/update/confirm/')
      })
    }
  }
}
</script>
<style lang="sass" scoped>
body page
  padding: 0
.update
  .update-wrapper
    .-warn
      display: flex
      justify-content: center
      align-items: center
      color: red
      margin: 24px 0
    .-title
      margin-top: 20px
    .-subtitle
      margin-top: 20px
    .-explain
      margin-top: 14px
    .update-condition-wrapper
      display: flex
      justify-content: space-between
      width: 100%
      padding: 0 8px
      margin-top: 6px
      border-bottom: 1px solid rgba(0, 0, 0, 0.3)
  .detail-price-wrapper
    background-color: $light-gray
    padding: 16px
    margin-top: 24px
    .detail-price-inner
      background-color: $white
      .plan-wrapper
        padding: 16px 16px 0 16px
        .plan-inner
          padding-bottom: 16px
          border-bottom: 1px solid $gray
          .price
            display: flex
            justify-content: flex-end
            align-items: center
            p
              margin-right: 2px
      .option-wrapper
        padding: 16px
        .option
          display: flex
          justify-content: space-between
          align-items: center
          .text
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
            .price
              display: flex
              align-items: center
          .count-box
            .c_position
              margin: 10px 0
              margin-left: auto
              margin-right: 0px
              width: 90px !important
      .sum-price
        display: flex
        justify-content: space-between
        .sum
          display: flex
  .update-bottom-wrapper
    .-subtitle
      margin-top: 20px
    .-explain
      margin-top: 14px
    .policy-wrapper
      margin-top: 8px
      padding: 0 10px
      background: #F0F0F0
      .policy
        display: flex
        padding: 14px 0
        &:not(:last-child)
          padding: 14px 0
          border-bottom: 1px solid $gray
        .policy-caption
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
        .policy-description
          display: flex
          flex: 1
          justify-content: center
          align-items: center
    .-comment
      margin-top: 14px
    .-btn
      display: flex
      justify-content: center
      .-submit
        margin: 20px 0
@include pc_view
  .update
    .update-wrapper
      .-warn
        font-size: 16px
      .-title
        margin-top: 20px
      .-subtitle
        margin-top: 40px
      .-explain
        margin-top: 14px
      .update-condition-wrapper
        display: flex
        justify-content: space-between
        width: 100%
        max-width: 490px
        padding: 0 16px
        margin: 6px auto 0 auto
        border-bottom: 1px solid rgba(0, 0, 0, 0.3)
      .policy-wrapper
        margin-top: 16px
        padding: 0 10px
        background: #F0F0F0
        .policy
          display: flex
          padding: 14px 0
          &:not(:last-child)
            padding: 14px 0
            border-bottom: 1px solid $gray
          .policy-caption
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            padding-left: 20px
          .policy-description
            display: flex
            flex: 1
            justify-content: flex-start
            align-items: center
            padding-left: 28px
      .-comment
        margin-top: 14px
      .-btn
        display: flex
        justify-content: center
        align-items: center
        .-submit
          display: flex
          justify-content: center
          align-items: center
          min-width: 343px
          height: 52px
          margin: 32px 0
</style>
