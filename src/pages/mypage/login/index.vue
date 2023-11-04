<template lang="pug">
validation-observer(v-slot='{ handleSubmit, invalid }', tag='div')
  .confirmLogin
    notification-pop(
      :isShown='isAlertPopShown',
      :type='popType',
      :icon='iconType',
      position='right',
      @closePop='closePop'
    )
      template(v-if='getStatus')
        | {{ $t("予約確認に成功しました！") }}
        | {{ $t("マイページへ移動します。") }}
      template(v-else)
        | {{ $t("予約確認に失敗しました。") }}
        | {{ $t("予約番号又は電話番号が登録情報と異なっています。") }}
    .mt-m
      .confirmBox
        Heading.-title(:number='1', fontSize='l') ご予約内容の確認
        paragraph.-discription(fontSize='small') ご予約内容の確認・変更・キャンセルを行えます。<br>確認したいご予約の情報を入力して「予約確認」ボタンを押して下さい。<br>※テイクアウト予約の変更・キャンセルは、掲載店舗へ直接お問合せお願いいたします。
        .confirmBox-inner
          .input
            label.mb-s(for='user-id')
              Span.required(fontSize='small') 予約番号
            validated-input#user-id(
              :value='loginForm.reservationNo',
              name='予約番号',
              rules='required|max:40',
              placeholder="例" + "：TO123456789",
              type='id',
              maxlength='40',
              @input='onInput($event, "reservationNo")'
            )
          .mt-m
          .input
            label.mb-s(for='user-password')
              Span.required(fontSize='small') 電話番号
            validated-input#user-password(
              :value='loginForm.tel',
              name='電話番号',
              rules='required|max:20',
              placeholder='例: 0123456789',
              type='tel',
              maxlength='20',
              @input='onInput($event, "tel")'
            )
          CTA-button#loginbtn(
            text='予約確認',
            type='primary',
            fontSize='large',
            @click='pushConfirm',
            :disabled='invalid'
          )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import ValidatedInput from '~/components/molecules/input/ValidatedInput.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold,
    ValidatedInput,
    NotificationPop,
    CTAButton
  }
})
export default class MypageLoingIndex extends Vue {
  head() {
    return {
      title: 'テイクアウトの予約確認',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      headerTitle: '予約確認',
      layoutType: 9,
      returnPath: '/takeout'
    })
  }

  private checked = false
  private popType = 'success'
  private iconType = 'info'
  private isAlertPopShown = false
  /* eslint-disable */
  mounted() {
    this.$store.dispatch('modules/user/getUserData')
    if (this.isLogin) {
      // ログイン情報があるか確認
      this.$store.dispatch('modules/reservationGourmet/setReservationisLogin', true)
    } else {
      this.$store.dispatch('modules/reservationGourmet/setReservationisLogin', false)
      // ログイン情報初期化
    }
  }

  /* eslint-enable */
  get loginForm() {
    return this.$store.getters['modules/reservationGourmet/getloginForm']
  }

  onInput(val: string, key: string): void {
    this.$store.dispatch('modules/reservationGourmet/setReservationLogins', {
      key,
      value: val
    })
  }

  onChecked(): void {
    this.$store.dispatch('modules/client/InClientChecked', this.checked)
  }

  closePop() {
    this.isAlertPopShown = false
  }

  pushConfirm() {
    this.$store.dispatch('modules/reservationGourmet/LoginForm').then(() => {
      const flag = this.getStatus
      if (flag) {
        this.popType = 'success'
        this.iconType = 'info'
        this.$router.push('/mypage/')
      } else {
        this.popType = 'error'
        this.iconType = 'warning'
        // api出来たらとる
      }
      this.isAlertPopShown = true
    })
  }

  get getStatus() {
    return this.$store.getters['modules/reservationGourmet/getStatus']
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }
}
</script>
<style lang="sass">
.confirmLogin
  #loginbtn
    height: 52px
    margin: 40px 0
    @include sp_view
      max-width: 491px
  .-title
    margin: 30px 0
  .-discription
    margin-bottom: 30px
    line-height: 1.29
  .checkflex
    display: flex
    position: releative
    #flex1
      width: 10%
      .checkmark
        border: 2px solid #a6a6a6
        width: 20px
        height: 20px
        margin-top: 10px
        -webkit-appearance: auto
    #flex2
      width: 90%
  .confirmBox-inner
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    .input
      display: flex
      justify-content: center
      flex-direction: column
      width: 100%
      max-width: 491px
</style>
