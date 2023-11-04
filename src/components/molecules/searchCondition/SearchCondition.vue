<template lang="pug">
div(@click="open").search-condition
  div
    p
      Span {{ startDate | date-format}}
      Span(v-if='endDate')-{{ endDate | date-format}}
    paragraph {{ pf }}
    paragraph(v-if='ps') {{ ps }}
  div
    i.el-icon-search
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'nuxt-property-decorator'
import { Paragraph, Span } from '~/components/atoms/typography'

@Component({
  components: {
    Paragraph,
    Span
  }
})
export default class extends Vue {
  @Prop() startDate!: string
  @Prop() endDate?: string
  @Prop() pf!: string
  @Prop() ps?: string

  @Emit('open')
  open() {
    // 親にemitするだけ
  }
}
</script>
<style lang="sass" scoped>
.search-condition
  display: flex
  padding: 8px 16px
  justify-content: space-between
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2)
  z-index: 2
  position: relative
</style>
