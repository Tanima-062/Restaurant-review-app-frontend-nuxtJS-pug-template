<template lang="pug">
div
  .adminhead
    paragraph-bold(fontSize='big', color='spare_gray') テイクアウト
      span(style='color: #1ba1ff') 管理画面
  Nuxt.page
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold
  }
})
export default class AdminSmallLoginLayout extends Vue {}
</script>
<style lang="sass">
.adminhead
  text-align: center
  margin: 40px 0
</style>
