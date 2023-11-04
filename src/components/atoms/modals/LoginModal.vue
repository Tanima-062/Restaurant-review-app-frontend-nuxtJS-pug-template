<template lang="pug">
base-drawer-free(:isActive='isShow' @close='closemodal' title='ログイン' textSize='L' number=1)
  div
    div.mt-m
      label(for="user-id").mb-s
        Span.required(fontSize="small") メールアドレス
      validated-input(
        :value='email'
        name="email"
        rules="required|max:254"
        placeholder="例" + "：adventure@mail.com"
        type="email"
        maxlength="254"
        id="useremail"
        @input="onInput($event, 'email')")
  div.mt-m
      label(for="user-password").mb-s
        Span.required(fontSize="small") パスワード
      Span.password-wrap
        Eye.eye-icon(
          v-if="isShowPasswordText"
          @click="toggleEye"
        )
        EyeBlocked.eye-icon(
          v-else
          @click="toggleEye"
        )
        validated-input(
          :value='password'
          name="パスワード"
          rules="required|max:21"
          placeholder="パスワードを入力してください"
          :type="isShowPasswordText ? 'text':'password' "
          maxlength="21"
          id="userpassword"
          @input="onInput($event, 'password')")
  .btn
    CTA-button-long(
      text='ログイン',
      type='secondary',
      fontSize='large',
      @click='goLogin()'
    )#loginbtn
  //- .checkflex
  //-     #flex1
  //-       input.checkmark(type="checkbox" v-model="checked")
  //-     #flex2
  //-       paragraph.mt-s.checktext(fontSize="base") 次回から自動的にログイン
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import ValidatedInput from '~/components/molecules/input/ValidatedInput.vue'
import CTAButtonLong from '~/components/atoms/button/CTAButtonLong.vue'
import BaseDrawerFree from '~/components/atoms/drawers/BaseDrawerFree.vue'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import Eye from '~/assets/icon/eye.svg'
import EyeBlocked from '~/assets/icon/eye-blocked.svg'

@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    BaseDrawerFree,
    CTAButtonLong,
    ValidatedInput,
    Eye,
    EyeBlocked
  }
})
export default class LoginModal extends Vue {
  @Prop() private isShow!: boolean
  private checked = false
  private email = ''
  private password = ''
  private isShowPasswordText = false
  toggleEye() {
    this.isShowPasswordText = !this.isShowPasswordText
  }

  onInput(val: string, key: string): void {
    if (key === 'email') {
      this.email = val
    } else if (key === 'password') {
      this.password = val
    }
  }

  isDatepickerShow = false
  /**
   * datepickerを閉じるイベント
   */
  @Emit()
  closemodal() {
    // 親に伝えるだけ
  }

  goLogin(): void {
    const data = { loginId: this.email, password: this.password }
    this.$store.dispatch('modules/user/LoginForm', data).then((flag) => {
      this.alertevent(flag)
    })
  }

  @Emit()
  alertevent(flag): void {
    return flag
  }
}
</script>

<style lang="sass" scoped>
.password-wrap
  position: relative
  .eye-icon
    width: 20px
    height: 20px
    position: absolute
    right: 8px
    top: 0
    bottom: 0
    margin: auto
    cursor: pointer
.btn
  width: 100%
  text-align: center
  #loginbtn
    width: 100%
    margin: 40px 0
.checkflex
    display: flex
    position: releative
    #flex1
      width: 5%
      .checkmark
        border: 2px solid #a6a6a6
        width: 20px
        height: 20px
        margin-top: 10px
        -webkit-appearance: auto
    #flex2
      width: 95%
</style>
