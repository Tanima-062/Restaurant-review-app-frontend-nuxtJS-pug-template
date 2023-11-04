<template lang="pug">
  div.sort-select
    label.-select-label {{label}}
    select(
      :value="value"
      @change="change($event)"
      @input="$emit('input', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    ).-select-box
      slot
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component({})
export default class SortSelect extends Vue {
  @Prop() value

  @Emit()
  change(event) {
    this.label = event.target.selectedOptions[0].label
    return event.target.value
  }

  private label = '並び替え'
}
</script>

<style lang="sass" scoped>
.sort-select
  position: relative
  .-select-label
    position: relative
    top: 1px //上に1pxズレるようなので調整
    width: 100%
    padding: 8px
    height: 50px
    line-height: 34px
    font-size: $font_size_default_pc
    color: $black
    background-color: $white
    border: 0
    border-radius: 3px
    text-align: center
    &:after
      content: "▼"
      display: inline-block
      margin-left: 4px
  .-select-box
    opacity: 0
    position: absolute
    top: 0
    width: 100%
    padding: 8px
    height: 50px
    font-size: $font_size_default_pc
    border: 0
    border-radius: 3px
</style>
