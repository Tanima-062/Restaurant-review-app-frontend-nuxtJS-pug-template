<template lang="pug">
div.radio(:class="{either: isEither}")
  el-radio-group.-group(:value="initValue" @input="changeOption")
    el-radio(
      v-for='(radioContent, index) in radioContents'
      :key='index'
      :label='radioContent.label'
    ) {{radioContent.text}}
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import { Paragraph } from '~/components/atoms/typography'

type RadioContent = {
  label: string | number
  text: string
}

@Component({
  components: {
    Paragraph
  }
})
export default class SimpleRadio extends Vue {
  @Prop({ default: '' }) initValue?: string | number
  @Prop() radioContents!: RadioContent
  @Prop({ default: false }) isEither?: boolean

  @Emit('changeOption')
  changeOption(value: string | number) {
    return value
  }
}
</script>
<style lang="sass" scoped>
.radio :deep()
  text-align: left
  margin: 20px auto
  > .-group
    label
      padding: 12px
      border-radius: 3px
      &:not(:first-child)
        margin-top: 8px
      .el-radio__label
        color: $black
        font-size: $font_size_default_pc
        margin-left: 16px
      &.is-checked
        > .el-radio__input
          .el-radio__inner
            border: 1.5px solid $main_color
            background-color: $white
            &::after
              background-color: $main_color
              width: 8px
              height: 8px
        .el-radio__label
</style>
