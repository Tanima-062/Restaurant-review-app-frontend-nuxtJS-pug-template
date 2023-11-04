<template lang="pug">
.not-found
  section
    heading.error-text(
      :number='2',
      fontSize='m',
      color='white',
      lineHeight='1.5'
    ) エラーが発生しました。
    paragraph-bold.error-subtext(color='white', fontSize='small') エラーが発生しました。<br>恐れ入りますが<nuxt-link to='/' class='top-link'>トップページ</nuxt-link>から再度ご予約ください。
    nuxt-link.button-wrapper(to='/')
      CTA-button.-to-top-button(
        text='トップページに戻る >',
        type='secondary',
        fontSize='small'
      )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ParagraphBold, Heading } from '~/components/atoms/typography/'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
@Component({
  components: {
    ParagraphBold,
    Heading,
    CTAButton
  },
  data() {
    return {
      activeName: '1',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
export default class Error extends Vue {
  head() {
    return {
      title: 'エラーが発生しました'
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 1,
      returnPath: '',
      headerTitle: '404 Not Found'
    })
  }
}
</script>
<style lang="sass" scoped>
.page
  max-width: none
.not-found
  height: 100vh
  background: url("~@/static/img/error/404.jpg") center center no-repeat
  background-size: cover
  @include sp_view
    background: url("~@/static/img/error/404.jpg") no-repeat
    background-size: cover
  section
    min-width: $container_min_width_pc
    max-width: $container_max_width_pc
    margin: 0 auto
    padding-top: 80px
    @include sp_view
      padding-top: 64px
      min-width: $container_min_width_sp
      max-width: $container_max_width_sp
    .error-text
      margin-bottom: 8px
      color: $white
      @include sp_view
        font-size: 16px
    .error-subtext
      margin-bottom: 40px
      @include sp_view
        font-size: 12px
      .top-link
        color: $white
        text-decoration: underline
    .button-wrapper
      @include sp_view
        display: flex
        justify-content: center
      .-to-top-button
        display: flex
        justify-content: center
        align-items: center
        width: 270px
        height: 50px
        border-radius: 0px
        border: none
        background-color: #1f5eb4
</style>
