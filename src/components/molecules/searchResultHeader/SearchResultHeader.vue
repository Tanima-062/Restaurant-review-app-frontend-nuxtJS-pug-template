<template lang="pug">
div.search
  div.-search-functions
    button(@click="openDrawerRefine").-search-button
      i.-search-result-icon.icon-filter
      Span.-search-result-text 絞り込み
    button.-search-button
      i.-search-result-icon.icon-select-arrow
      Span.-search-result-text 並び替え
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'

@Component({
  components: {
    Span
  }
})
export default class extends Vue {
  @Emit('openDrawerRefine')
  openDrawerRefine() {
    // 親要素にemitするだけ
  }
}
</script>
<style lang="sass" scoped>
.search
  background-color: $light_gray
  padding: 16px
  .-search-functions
    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-gap: 8px
    .-search-button
      background-color: $white
      padding: 8px
      width: 100%
      text-align: center
      border: 1px solid $light_gray
</style>
