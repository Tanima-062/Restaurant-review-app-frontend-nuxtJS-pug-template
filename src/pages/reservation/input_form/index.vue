<template lang="pug">
.reservation
  full-loading(v-if='isLoading', :isLoading='isLoading')
  template(v-else)
    .-step-bar-section
      notification-pop(
        :isShown='isAlertPopShown',
        :type='popType',
        :icon='iconType',
        position='right',
        @closePop='closePop'
      )
        template(v-if='isLogin')
          | {{ $t("ログインに成功しました！") }}
          | {{ $t("手続きを進めてください。") }}
        template(v-else)
          | {{ $t("ログインに失敗しました。メールアドレスまたはパスワードが登録情報と異なっています。") }}
      payment-step-bar.-payment-step-bar(
        :active='1',
        backUrl='/takeout',
        :isOnlySeat='isOnlySeat'
      )
    .-user-form-section
      heading.mt-xl.pcOnly(:number='2', fontSize='l') {{ "お客様情報入力" }}
      .flex-p-c.mt-xl(v-show='!isLogin')
        CTA-button(
          :text='$t("ログインして予約する方はこちら")',
          style='max-width: 400px !important'
          type='secondary_sub',
          @click='openLoginDrawer'
        )
      notification.mt-l(
        v-show='!isLogin',
        title='ログインせずご注文される方は、下記に情報をご入力ください',
        type='message',
        icon='info'
      )
      login-modal(
        :isShow='isLoginDrawerActive',
        @closemodal='closeLoginDrawer',
        @alertevent='alertsget'
      )
      user-form.-user-form-wrapper(:isOnlySeat='isOnlySeat')
      //- login-drawer(:isActive="isLoginDrawerActive" @closeLoginDrawer="closeLoginDrawer" @submitLogin="submitLogin")
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'
import { Heading } from '~/components/atoms/typography'
import { AuthTypes } from '~/types/authTypes'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import LoginModal from '~/components/atoms/modals/LoginModal.vue'
import Notification from '~/components/molecules/card/Notification.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import UserForm from '~/components/organisms/reservation/UserForm.vue'
@Component({
  components: {
    CTAButton,
    FullLoading,
    Heading,
    LoginModal,
    Notification,
    NotificationPop,
    PaymentStepBar,
    UserForm
  }
})
export default class ReservationInput extends Vue {
  private isLoginDrawerActive = false
  private isAlertPopShown = false
  private popType = ''
  private iconType = 'info'
  private isLoading = true
  private historyMemo = ''

  mounted() {
    setTimeout(() => {
      if (this.orderedMenu.length > 0 || this.cource.menus.length > 0) {
        if (this.isLogin) {
          // ログイン情報があるか確認
          this.$store.dispatch('modules/user/getUserData')
        } else {
          // ログイン情報初期化
          this.$store.dispatch('modules/user/resetUserData')
        }
        this.isLoading = false
      } else {
        this.$router.replace({ name: 'index' })
      }
    }, 0)
  }

  head() {
    return {
      title: 'お客様情報入力画面',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'お客様情報入力画面｜レストラン・テイクアウトの検索・予約ならスカイチケットグルメ！近くのお店、人気の東京・大阪エリアの、焼肉・寿司・中華・イタリアンなど様々なジャンルの飲食店が選べる。テイクアウトなら事前予約でお店ですぐに持ち帰りが可能！'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'お客様情報入力画面｜レストラン・テイクアウトの検索・予約ならスカイチケットグルメ！近くのお店、人気の東京・大阪エリアの、焼肉・寿司・中華・イタリアンなど様々なジャンルの飲食店が選べる。テイクアウトなら事前予約でお店ですぐに持ち帰りが可能！'
        }
      ]
    }
  }

  fetch({ store, from }) {
    this.historyMemo = from
      ? from.fullPath === '/reservation/confirm/'
        ? this.historyMemo
        : from.fullPath
      : this.historyMemo
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 5,
      returnPath: from ? (from.fullPath === '/reservation/confirm/' ? this.historyMemo : from.fullPath) : '/',
      headerTitle: 'お客様情報入力'
    })
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }

  get orderedMenu() {
    return this.$store.getters['modules/reservationGourmet/getMenu']
      ? this.$store.getters['modules/reservationGourmet/getMenu']
      : []
  }

  get isOnlySeat() {
    if (this.$store.getters['modules/cource/getterCource']) {
      return this.$store.getters['modules/cource/getterCource'].onlySeat
    }
  }

  get cource() {
    return this.$store.getters['modules/reservationGourmet/getApplicationRS']
      ? this.$store.getters['modules/reservationGourmet/getApplicationRS']
      : {}
  }

  // cookieの存在有無
  // get existsCookie() {
  //   return document.cookie.split(';').some((item) => item.includes('_al_'))
  // }
  openLoginDrawer(): void {
    this.isLoginDrawerActive = true
  }

  closeLoginDrawer(): void {
    this.isLoginDrawerActive = false
  }

  alertsget(val): void {
    this.isLoginDrawerActive = false
    if (val === true) {
      this.popType = 'success'
      this.iconType = 'info'
    } else {
      this.popType = 'error'
      this.iconType = 'warning'
    }
    this.isAlertPopShown = true
  }

  changedPopType(): string {
    if (this.isLogin) {
      return 'success'
    } else {
      return 'error'
    }
  }

  submitLogin(): void {
    this.popType = this.changedPopType()
    this.isAlertPopShown = true
    this.closeLoginDrawer()
  }

  closePop(): void {
    this.isAlertPopShown = false
  }

  @Watch('userData')
  setuserInfo(newData: AuthTypes.UserData): void {
    if (Object.keys(newData).length === 0) {
      return
    }
    const userInfo = this.$store.getters['modules/users/getUserInfo']
    const { firstName, lastName, email, tel } = newData
    const loginData = { ...userInfo, firstName, lastName, email, tel }
    this.$store.dispatch('modules/reservationGourmet/setAllUserInfo', loginData)
  }
}
</script>
<style lang="sass" scoped>
.reservation
  display: grid
  @include pc_view
    width: 992px
  @media (min-width: 750px) and (max-width: 800px)
    width: 700px
    grid-template-columns: repeat(12, 1fr)
  .-user-form-wrapper :deep()
    .user-form
      margin-top: 16px
  .-step-bar-section
    grid-column: 1/13
    @include sp_view
      margin-top: 16px
    @include pc_view
      margin-top: 24px
  .-user-form-section
    grid-column: 2/12
    @include sp_view
      grid-column: 1/13
    @include pc_view
      grid-column: 1/13
</style>
