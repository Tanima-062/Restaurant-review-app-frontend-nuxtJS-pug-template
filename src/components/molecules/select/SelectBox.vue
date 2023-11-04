<template lang="pug">
select.select-box(
  :class='{ border: border }',
  @change='change($event.target.value)',
  @input='$emit("input", $event)',
  @focus='$emit("focus", $event)',
  @blur='$emit("blur", $event)',
  :disabled='disabled'
)
  slot
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
@Component({})
export default class SelectBox extends Vue {
  @Prop({ default: true }) border?: boolean
  @Prop({ default: false }) disabled?: boolean
  @Emit()
  change(changedValue) {
    return changedValue
  }
}
</script>

<style lang="sass" scoped>
.select-box
  -webkit-appearance: none
  width: 100%
  padding: 0 40px 0 8px
  height: 52px
  font-size: $font_size_default_pc
  color: $black
  background-color: $white
  border: 0
  border-radius: 3px
  &:hover
    cursor: pointer
  &.border
    border: 1px solid $dark_gray
    &:disabled
      border-color: $gray
  &:disabled
    color: $dark_gray
    background: $gray
    &:hover
      cursor: not-allowed
</style>
