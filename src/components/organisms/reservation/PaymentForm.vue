<template lang="pug">
validation-observer(v-slot='{ handleSubmit, invalid }', tag='div')
  form.user-forms(@submit.prevent='handleSubmit(onSubmit)')
    .-name-input-list
      .mt-m
        label(for='card-cardNum')
          Span(fontSize='tiny') カード番号
        //- スマホ側(ios14.6)でキーボードで全角入力タイプだと入力時にバグが起きるので、telで強制的に数字限定の入力キーボードを表示させる
        validated-input#card-securityCode(
          :value='cardInfo.cardNum',
          :disabled="isSystemError",
          type="tel",
          name='カード番号',
          rules='required|numeric|max:16|validCardnum',
          placeholder='例：0000000000000000',
          maxlength='16',
          @input='onInput($event, "cardNum")'
        )
      .names
        .mt-m.forms-left
          label(for='card-name')
            Span(fontSize='tiny') ファーストネーム
          validated-input#card-name(
            :value='firstname',
            :disabled="isSystemError",
            name='名 (ローマ字入力)',
            rules='required|max:30|validUpperName',
            placeholder='例：TARO',
            maxlength='30',
            @input='onInputName($event, "firstname")'
          )
        .mt-m.forms-right
          label(for='card-name')
            Span(fontSize='tiny') ラストネーム
          validated-input(
            :value='lastname',
            :disabled="isSystemError",
            name='姓 (ローマ字入力)',
            rules='required|max:30|validUpperName',
            placeholder='例：YAMADA',
            type='',
            maxlength='30',
            @input='onInputName($event, "lastname")'
          )
      paragraph(fontSize='tiny') ※ミドルネームがある方はファーストネームの後ろにスペースを付けて入力してください
      .mt-m
        paragraph(fontSize='tiny') 有効期限
          span-bold(fontSize='tiny') (月/年)
        .expireDate
          select-box#month(
            :value='cardInfo.expireMonth',
            :disabled="isSystemError",
            @change='changeMonth($event)',
            required
          )
            option(value='', disabled, selected, style='display: none') 月
            option(v-for='month in monthOptions', :value='month.value') {{ month.text }}
          select-box#year(
            :value='cardInfo.expireYear',
            :disabled="isSystemError",
            @change='changeYear($event)',
            required
          )
            option(value='', disabled, selected, style='display: none') 年
            option(v-for='year in yearOptions', :value='year.value') {{ year.text }}
      .mt-m
        label.mb-s(for='card-securityCode')
          Span(fontSize='tiny') セキュリティコード
        //- スマホ側(ios14.6)でキーボードで全角入力タイプだと入力時にバグが起きるので、telで強制的に数字限定の入力キーボードを表示させる
        validated-input#card-securityCode.-phone-input(
          :value='cardInfo.securityCode',
          :disabled="isSystemError",
          type="tel",
          name='セキュリティコード',
          rules='required|numeric|max:4|min:3',
          maxlength='4',
          @input='onInput($event, "securityCode")'
        )
      .mt-m
        CTA-button(
          text='支払いを完了する',
          type='primary',
          fontSize='medium',
          v-if="!isSystemError"
          :disabled='judgefunc(invalid)',
          @click='pushNewPay'
        )
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'nuxt-property-decorator'
import ValidatedInput from '~/components/molecules/input/ValidatedInput.vue'
import ValidatedTextArea from '~/components/molecules/textarea/ValidatedTextArea.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import { Paragraph, Span, SpanBold } from '~/components/atoms/typography/'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
@Component({
  components: {
    ValidatedInput,
    ValidatedTextArea,
    CTAButton,
    Paragraph,
    Span,
    SpanBold,
    SelectBox
  }
})
export default class PaymentForm extends Vue {
  @Prop({ default: false })
  isSystemError?: boolean

  firstname = ''
  lastname = ''
  expirationYear = ''
  expirationMonth = ''
  selectMonthValid = true
  selectYearValid = true
  private isTitleState: 'valid' | 'invalid' | 'unknown' = 'unknown'
  mounted() {
    this.$store.dispatch('modules/reservationGourmet/resetCardInfo')
  }

  get cardInfo() {
    return this.$store.getters['modules/reservationGourmet/getCardInfo']
  }

  onInput(inputText, key) {
    this.$store.dispatch('modules/reservationGourmet/InCardInfo', {
      key,
      value: inputText
    })
  }

  judgefunc(invalid) {
    if (invalid === false && this.selectMonthValid === false && this.selectYearValid === false) {
      return false
    } else {
      return true
    }
  }

  onInputName(val, key) {
    if (key === 'firstname') {
      this.firstname = val
    } else {
      this.lastname = val
    }
  }

  onSubmit() {
    // if (this.isTitleState === 'invalid') return
    // 次のページへ遷移
    // this.$router.push('/reservation/confirm')
  }

  get fullName() {
    const fullname = this.firstname + ' ' + this.lastname
    return fullname
  }

  @Watch('fullName')
  sendFullName(val) {
    this.$store.dispatch('modules/reservationGourmet/InCardInfo', {
      key: 'name',
      value: val
    })
  }

  changeMonth(month) {
    this.selectMonthValid = false
    this.$store.dispatch('modules/reservationGourmet/InCardInfo', {
      key: 'expireMonth',
      value: month
    })
  }

  changeYear(year) {
    this.selectYearValid = false
    this.$store.dispatch('modules/reservationGourmet/InCardInfo', {
      key: 'expireYear',
      value: year
    })
  }

  get yearOptions() {
    const time = new Date()
    const year = time.getFullYear()
    const _options: { text: string; value: string | number }[] = []
    for (let i = 0; i <= 10; i++) {
      const valYear = year + i
      const yearData = { text: valYear + '', value: valYear }
      _options.push(yearData)
    }
    return _options
  }

  get monthOptions() {
    const _options: { text: string; value: string | number }[] = []
    for (let i = 1; i <= 12; i++) {
      const monthData = { text: i + '月', value: ('0' + i).slice(-2) }
      _options.push(monthData)
    }
    return _options
  }

  @Emit()
  pushNewPay() {
    // 親に伝えるだけ
  }
}
</script>

<style lang="sass" scoped>
.user-forms
  .disabled
    disabled: true
  .-name-input-list
    .expireDate
      display: flex
      #month
        margin-right: 3px
        &:invalid
          color: #e4e4e4
      #year
        margin-left: 3px
        &:invalid
          color: #e4e4e4
  .-error-msg
    margin-top: 4px
  .-caution
    @include pc_view
      margin-top: 24px
  .-flight-input :deep()
    .string-input
  .-email-input :deep(), .-phone-input :deep(), .-info-input
    .string-input
  .names
    display: flex
    .forms-left
      width: 50%
      margin-right: 3px
    .forms-right
      width: 50%
      margin-left: 3px
  .-user-form-submit
    display: block
    margin: 40px auto 112px
</style>
