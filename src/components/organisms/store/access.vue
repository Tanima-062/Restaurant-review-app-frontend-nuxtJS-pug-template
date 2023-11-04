<template lang="pug">
.access
  paragprah access
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold
  }
})
export default class MenuModal extends Vue {
  @Prop({ default: '鴨胸肉のロースト' }) title?: string
}
</script>
<style lang="sass"></style>
