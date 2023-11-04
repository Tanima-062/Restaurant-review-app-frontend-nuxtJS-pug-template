<i18n src="~/locales/common/jp.json"></i18n>
<i18n src="~/locales/common/en.json"></i18n>
<i18n src="~/locales/common/ko.json"></i18n>
<i18n src="~/locales/common/zh.json"></i18n>
<template lang="pug">
button(@click="click()").-filter-button
  filter-icon.-icon
  span-bold(fontSize="medium").-label {{ $t("絞り込み") }}
  span(fontSize="tiny").-count {{filterCount}}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { SpanBold, Span } from '~/components/atoms/typography'
import FilterIcon from '~/assets/icon/filter.svg'

@Component({
  components: {
    FilterIcon,
    Span,
    SpanBold
  }
})
export default class extends Vue {
  @Prop() filterCount!: string

  @Emit()
  click(): void {
    // 親コンポーネントにクリックイベントを通知するだけ
  }
}
</script>
<style lang="sass" scoped>
.-filter-button
  overflow: visible
  text-transform: none
  box-sizing: border-box
  width: 100%
  height: 52px
  background-color: $white
  border: 1px solid $light_gray
  border-radius: 3px
  text-align: center
  cursor: pointer
  .-count
    display: none
  .-icon
    width: 18px
    height: 18px
    vertical-align: text-bottom
    margin-right: 8px
  &.onFilter
    .-icon
      fill: $sub_color
    .-label
      color: $sub_color
    .-count
      margin-left: 8px
      background: $sub_color
      color: $white
      border-radius: 50%
      min-width: 18px
      height: 18px
      line-height: 1
      padding: 3px
      text-align: center
      display: inline-block
      vertical-align: text-bottom
</style>
