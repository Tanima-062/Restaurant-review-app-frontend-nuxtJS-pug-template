<template lang="pug">
validation-observer(v-slot='{ handleSubmit, invalid }', tag='div')
  form.user-form(@submit.prevent='handleSubmit(onSubmit)')
    .-name-input-list
      .mt-m
        label.mb-s(for='user-firstName')
          Span.required.text(fontSize='tiny') {{ $t("名 (ローマ字入力)") }}
        validated-input#user-firstName(
          :value='user.firstName',
          :name='$t("名 (ローマ字入力)")',
          rules='required|max:30|validUpperName',
          :placeholder='$t("例") + "：TARO"',
          maxlength='30',
          @input='onInput($event, "firstName")'
        )
      .mt-m
        label.mb-s(for='user-lastName')
          Span.required.text(fontSize='tiny') {{ $t("姓 (ローマ字入力)") }}
        validated-input#user-lastName(
          :value='user.lastName',
          :name='$t("姓 (ローマ字入力)")',
          rules='required|max:30|validUpperName',
          :placeholder='$t("例") + "：YAMADA"',
          maxlength='30',
          @input='onInput($event, "lastName")'
        )
    paragraph.mt-s(fontSize='base') ※姓名の区別がないお客様は姓の欄にフルネーム、名に「NONE」を入れてください
    .mt-m
      label.mb-s(for='user-email')
        Span.required.text(fontSize='tiny') {{ $t("メールアドレス") }}
      validated-input#user-email.-email-input(
        :value='user.email',
        :name='$t("メールアドレス")',
        rules='required|max:254',
        :placeholder='$t("例") + "：adventure@mail.com"',
        type='email',
        maxlength='254',
        @input='onInput($event, "email")'
      )
      ul.-suggestEmailLists(v-if="suggestedEmailList.length > 0")
        li.-suggestEmailList(v-for="(suggestedEmail, index) in suggestedEmailList" :key="index")
          button.-suggestEmailButton(@click.prevent="setSuggestedEmail(suggestedEmail)")
            span.-suggestEmailSpan {{ user.email.split('@')[0] }}{{ suggestedEmail }}
    .mt-m
      label.mb-s(for='user-tel')
        Span.required.text(fontSize='tiny') {{ $t("電話番号") }}
      validated-input#user-tel.-phone-input(
        :value='user.tel',
        name='電話番号',
        rules='required|numeric',
        placeholder="例" + "：0312345678",
        type='tel',
        maxlength='21',
        @input='onInput($event, "tel")'
      )
    .mt-m
      label.mb-s(for='user-info')
        span-bold(fontSize='large', lineHeight='1.7') {{ "お店への連絡事項" }}
      validated-text-area.-info-input(
        :value='user.request',
        name='連絡事項',
        placeholder='ご予約内容に関する連絡・質問・ご要望などがございましたらご記入ください。',
        maxlength='200',
        height=90,
        :flag='false',
        @change='onInput($event, "request")'
      )
    hr.sectionLast
    .mt-m
      label.mb-s(for='user-alert')
        span-bold(v-if='isOnlySeat', fontSize='large', lineHeight='1.7') {{ "注意事項" }}
        span-bold(v-else, fontSize='large', lineHeight='1.7') {{ "キャンセルポリシー" }}
      validated-text-area#user-alert.-info-input(
        :value='rulecontent',
        name='注意事項',
        height=140,
        :flag='true',
        :inputform='true'
      )
    paragraph-bold.mt-m(fontSize='medium', color='black') 下記内容をご確認の上お申し込みください
    paragraph.mt-m.indentText(fontSize='small', color='black') {{ isOnlySeat ? "商品手配のために必要な範囲で個人データを第三者（店舗等）に提供することに同意します。" : "Skyticket上での支払金額を確認し、商品手配のために必要な範囲で個人データを第三者（店舗等）に提供することに同意します。" }}
    paragraph.mt-s.mb-l.indentText(fontSize='small', color='black') <a href="/info/terms" class="highlight" target="_blank">利用規約</a>、<a href="/info/privacy" class="highlight" target="_blank">プライバシーポリシー</a>、キャンセルポリシーを確認した上で同意します。
    .check-box-wrapper
      check-box(v-model='checked')
        SpanBold(fontSize='small' lineHeight="1") 上記の内容に同意します
  .-footer
    .btn
      CTA-button(
        text='ご注文内容の確認へ',
        :disabled='invalid || !checked',
        @click='onSubmit()'
      )
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography/'
import ValidatedInput from '~/components/molecules/input/ValidatedInput.vue'
import ValidatedTextArea from '~/components/molecules/textarea/ValidatedTextArea.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import CheckBox from '~/components/atoms/checkbox/CheckBox.vue'
import CheckMark from '~/assets/icon/checkmark.svg'
import { emailSuggest } from '~/utils/emailSuggest'
@Component({
  components: {
    ValidatedInput,
    ValidatedTextArea,
    CTAButton,
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    SelectBox,
    CheckBox,
    CheckMark
  }
})
export default class UserForm extends Vue {
  @Prop({ default: false }) isOnlySeat!: boolean
  checked = false
  rulecontent = `${this.isOnlySeat ? 'ご予約の注意事項' : 'ご予約の注意事項とキャンセルポリシー'}
（予約によるトラブルを防ぐため、ご理解とご協力をお願い申し上げます。）

※ご予約の注意事項

ご予約のお時間から遅れる場合は必ずお電話下さい。ご連絡が無く、お待ちのお客様がいた場合はお待ちのお客様を優先させて頂きます。

その際に生じた金銭などのいかなる理由も、責任は負いかねますのでご了承ください。

４・ご連絡がなく、ご予約当日にご来店されなかった場合はキャンセル料として、下記記載の金額をご請求させていただきます。

５・ご来店してからの人数減はキャンセル料の対象となります。お分かりになった時点で必ずお電話ください。

■お電話でのご予約の場合

ご予約のお日にち、時間、人数、お名前、お電話番号をお伝えください。

■ネットでのご予約

６・当店からの確認の返信メール又はお電話での確認を持ちまして、予約完了となります。

７・当店からの返信が無かった場合はご予約が成立しておりませんのでお気をつけ下さい。

８・ネットでのご予約は返信にお時間がかかってしまう場合もございます。

■迷惑メール設定などにより当店のメールが届かない場合がございます。

その為24時間たっても当店の返信メールが届かない場合にはお電話くださいませ。
  `
  // mounted() {
  //   // TOPで入力した年齢の情報を申し込み用にセット
  //   const textAge30 = this.searchCondition.user.age30
  //   this.onInput(textAge30, 'age30')
  // }
  /*
    ※title(敬称)のvalid状態はvee-validateが管理してくれないので自装
    submitするまでは、validでもinvalidでもない状態(unknown)にする
  */
  private isTitleState: 'valid' | 'invalid' | 'unknown' = 'unknown'
  private suggestedEmailList: string[] = []
  private isSuggested = false
  get user() {
    return this.$store.getters['modules/reservationGourmet/getReservationInfo']
  }

  onInput(inputText, key) {
    this.$store.dispatch('modules/reservationGourmet/InReservationInfo', {
      key,
      value: inputText
    })
  }

  onSubmit() {
    // if (this.isTitleState === 'invalid') return
    // 次のページへ遷移
    this.$router.push('/reservation/confirm')
  }

  @Watch('user.email')
  valueEmail(newValue) {
    if (newValue.length >= 2 && newValue.includes('@')) {
      // newValueから@以降の文字列を生成する
      const tmp = newValue
      let domain = tmp.split('@')
      domain.shift()
      domain = '@' + domain
      const isExistInSuggestedList = this.suggestedEmailList.includes(domain)
      if (newValue.split('@').length >= 2 && !isExistInSuggestedList && !this.isSuggested) {
        const checkWord = newValue.split('@')[1]
        this.getEmailSuggest(checkWord)
        this.isSuggested = false
      } else {
        this.suggestedEmailList = []
        this.isSuggested = false
      }
    } else {
      this.suggestedEmailList = []
      this.isSuggested = false
    }
  }

  async getEmailSuggest(checkWord: string) {
    const response = await emailSuggest(checkWord)
    this.suggestedEmailList = response
  }

  setSuggestedEmail(suggestedEmail: string) {
    const userInputEmail = this.user.email.split('@')[0]
    this.$store.dispatch('modules/reservationGourmet/InReservationInfo', {
      key: 'email',
      value: userInputEmail + suggestedEmail
    })
    this.suggestedEmailList = []
    this.isSuggested = true
  }
}
</script>

<style lang="sass" scoped>
.user-form
  .select-box.-title-select
    display: block
    width: 250px
  .-name-input-list
    @include pc_view
      display: grid
      grid-template-columns: 1fr 1fr
      grid-gap: 8px
  .check-box-wrapper
    margin-top: 24px
    padding-bottom: 50px
    display: flex
    justify-content: center
    @include sp_view
      padding-bottom: 30px
  .-error-msg
    margin-top: 4px
  .-caution
    @include pc_view
      margin-top: 24px
  .-flight-input :deep()
    .string-input
      @include pc_view
        width: 250px
  .-email-input :deep(), .-phone-input :deep(), .-info-input
    .string-input
      @include pc_view
        width: 575px
  .-user-form-submit
    display: block
    margin: 40px auto 112px
    @include pc_view
      margin: 80px auto 56px
      width: 325px
  .sectionLast
    width: 100%
    height: 8px
    background-color: #e4e4e4
    // 親要素の16pxを足し算する
    @include sp_view
      width: calc(100% + 36px)
      margin-left: -16px
      margin-right: -16px
.-footer
  position: sticky
  display: flex
  justify-content: center
  align-items: center
  bottom: 0
  left: 0
  width: 100vw
  margin: 0 -100vw
  padding: 16px 0
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.24)
  background-color: white
  z-index: 1
  .btn
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    width: 80%
.mt-s
  line-height: 1.25
.highlight
  color: $main_color
  text-decoration: underline
  transition: 0.3s
  &:hover
    opacity: 0.7
    transition: 0.3s
@include sp_view
  .text
    font-size: 14px
.-suggestEmailLists
  border: 1px solid #e4e4e4
  border-radius: 3px
  width: 100%
  .-suggestEmailList
    padding: 10px
    &:not(:last-of-type)
      border-bottom: 1px solid #e4e4e4
    .-suggestEmailButton
      display: block
      text-align: initial
      width: 100%
      background: none
      border: none
      font-size: 16px
      .-suggestEmailSpan
        font-weight: bold
.indentText
  padding-left: 1em
  position: relative
  &::before
    content: "・"
    position: absolute
    top: 0
    left: 0
</style>
