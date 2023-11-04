<template lang="pug">
label.check-box
  input(
    type='checkbox',
    v-bind='$attrs',
    :checked='isChecked',
    @change='change'
  )
  .box(:class='{ checked: isChecked }')
    check-icon.check(v-if='isChecked')
  paragraph.mt-s.label(
    v-if='$slots.default',
    fontSize='small',
    lineHeight='1.4'
  )
    <slot/>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Model, Prop } from 'nuxt-property-decorator'
import isEqual from 'lodash/isEqual'
import { Paragraph, SpanBold } from '~/components/atoms/typography'

import CheckIcon from '~/assets/icon/checkmark.svg'
@Component({
  components: {
    CheckIcon,
    Paragraph,
    SpanBold
  }
})
export default class CheckBox extends Vue {
  /** `checked` に配列を指定した場合、その配列に `value` が含まれていればチェック状態になる */
  @Model('change', { type: [Boolean, Array], default: false })
  readonly checked!: boolean | (string | number | null)[]

  /** チェック状態。`checked`に配列を指定した場合は `value` との組み合わせでチェック状態になる */
  @Prop({ default: null }) value!: string | number | null

  get isChecked() {
    return Array.isArray(this.checked) ? this.checked.some((item) => isEqual(item, this.value)) : this.checked
  }

  @Emit()
  change(e) {
    if (Array.isArray(this.checked)) {
      return e.target.checked
        ? this.checked.concat(this.value)
        : this.checked.filter((item) => !isEqual(item, this.value))
    }
    return e.target.checked
  }
}
</script>
<style lang="sass" scoped>
.check-box
  display: grid
  grid-auto-flow: column
  grid-gap: 10px
  justify-content: flex-start
  position: relative
  width: fit-content
  &:hover
    cursor: pointer
  & > input
    display: none
  .box
    border: 1px solid $dark_gray
    border-radius: 3px
    width: 16px
    height: 16px
    -webkit-appearance: auto
    position: relative
    background: $white
    &.checked
      fill: $white
      border: 2px solid $sub_color
      background-color: $sub_color
    .check
      height: 12px
      width: 12px
      position: absolute
  .label
    margin: 0
    cursor: pointer
</style>
