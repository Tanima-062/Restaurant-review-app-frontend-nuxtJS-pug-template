<template lang="pug">
validation-observer(v-slot='{ handleSubmit, invalid }', tag='div')
  div
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
    .mt-m
      label.mb-s(for='user-id')
        Span.required(fontSize='small') ID
      validated-input#user-id(
        :value='client.userName',
        name='username',
        rules='required|max:40',
        placeholder="例" + "：0123456789",
        type='id',
        maxlength='40',
        @input='onInput($event, "userName")'
      )
    .mt-m
      label.mb-s(for='user-password')
        Span.required(fontSize='small') パスワード
      validated-input#user-password(
        :value='client.password',
        name='パスワード',
        rules='required|max:200',
        placeholder='パスワードを入力してください',
        type='password',
        maxlength='200',
        @input='onInput($event, "password")'
      )
    CTA-button#loginbtn(
      text='ログイン',
      type='secondary',
      fontSize='large',
      @click='pushLogin',
      :disabled='invalid'
    )
    //- .checkflex
    //-   #flex1
    //-     input.checkmark(type="checkbox" v-model="checked" @change="onChecked()")
    //-   #flex2
    //-     paragraph.mt-s.checktext(fontSize="base") 次回から自動的にログイン
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import ValidatedInput from '~/components/molecules/input/ValidatedInput.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
@Component({
  layout: 'AdminSmallLoginLayout',
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
export default class AdminSmallLoginIndex extends Vue {
  head() {
    return {
      title: 'ログイン予約確認ページ',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  private checked = false
  private popType = 'success'
  private iconType = 'info'
  private isAlertPopShown = false
  mounted() {
    if (this.isLogin) {
      // ログイン情報があるか確認
      this.$store.dispatch('modules/client/getClientData')
      this.$router.push('/dishup/')
    } else {
      // ログイン情報初期化
      this.$store.dispatch('modules/client/removeClientData')
    }
    this.$store.dispatch('modules/user/resetUserData')
  }

  get client() {
    return this.$store.getters['modules/client/getClientInfo']
  }

  onInput(val: string, key: string): void {
    this.$store.dispatch('modules/client/InClientInfo', {
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

  pushLogin() {
    this.$store.dispatch('modules/client/LoginClientForm').then((flag) => {
      if (flag) {
        this.popType = 'success'
        this.iconType = 'info'
        this.$router.push('/dishup/')
      } else {
        this.popType = 'error'
        this.iconType = 'warning'
        // api出来たらとる
      }
      this.isAlertPopShown = true
    })
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/client/getClientLoginInfo']
  }
}
</script>
<style lang="sass">
#loginbtn
  margin: 40px 0
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
</style>
