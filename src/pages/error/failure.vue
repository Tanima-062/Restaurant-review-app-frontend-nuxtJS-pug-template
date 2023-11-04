<template lang="pug">
div.failure
  section
    heading(:number="2" fontSize="l" color="white").mt-xl.mb-l 予約が失敗しました。
    Paragraph.mb-xxl エラーが発生したため、予約を完了することができませんでした。恐れ入りますがトップページから再度ご予約ください。
    nuxt-link(to="/")
      CTA-button(text="トップページに戻る" type="secondary").-to-top-button
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Paragraph, Heading } from '~/components/atoms/typography/'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
@Component({
  components: {
    Paragraph,
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
export default class Failure extends Vue {
  head() {
    return {
      title: '予約が失敗しました'
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 1,
      returnPath: '',
      headerTitle: '予約失敗'
    })
  }
}
</script>
<style lang="sass" scoped>
.not-found
  h2
    color: $white
  max-width: 100%
  background: url("/car-rental/img/error/404.jpg") center center no-repeat
  background-size: cover
  section
    min-width: $container_min_width_pc
    max-width: $container_max_width_pc
    margin: 0 auto
    padding-top: 24px
    @include sp_view
      grid-template-columns: repeat(4, 1fr)
      min-width: $container_min_width_sp
      max-width: $container_max_width_sp
</style>
