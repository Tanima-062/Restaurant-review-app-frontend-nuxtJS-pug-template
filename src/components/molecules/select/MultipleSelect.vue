<template lang="pug">
.multiple
  v-select(
    multiple
    placeholder='なし'
    :options="options"
    label="contents"
    v-model="selected"
    :reduce="options => options.id"
    @input="getSelect($event)"
    ).selectbox
    template(#open-indicator="{ attributes }")
      span(v-bind="attributes")
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Next from '~/assets/icon/next.svg'
@Component({
  components: {
    Next
  }
})
export default class MultipleSelect extends Vue {
  @Prop({}) options
  // options = [
  //   { name: '卵', id: 1 },
  //   { name: 'チャーシュー', id: 2 },
  //   { name: 'ほうれん草', id: 3 },
  //   { name: 'メンマ', id: 4 },
  //   { name: 'ネギ', id: 5 }
  // ]
  selected = []
  attributes!: {
    ref: 'openIndicator'
    role: 'presentation'
    class: 'vs__open-indicator'
  }

  @Prop() value
  @Prop({ default: true }) border?: boolean

  @Emit('getSelect')
  getSelect(val) {
    return val
  }
}
</script>

<style lang="sass">
.multiple
  .vs__search
    width: 100%
  .vs__dropdown-toggle
    width: 102%
    margin-left: -3px
    padding: 0
    min-height: 50px
    font-size: $font_size_default_pc
    color: $black
    background-color: $white
    border: solid 1px #a6a6a6
    border-radius: 3px
    &.border
        border: 1px solid $dark_gray
        &:disabled
        border-color: $gray
    &:disabled
        color: $dark_gray
        background: $gray
        &:hover
        cursor: not-allowed
    .vs__open-indicator
      fill: black
    .vs__fade-enter-active
      transition: none
    .vs__fade-leave-active
      transition: none
    .-icon
      width: 8px
      transform: rotate(90deg)
      fill: black
      stroke: black
      stroke-width: 6px
</style>
