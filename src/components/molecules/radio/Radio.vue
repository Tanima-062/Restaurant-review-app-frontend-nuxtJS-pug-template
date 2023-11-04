<template lang="pug">
div.radio(:class="{either: isEither}")
  el-radio-group.-group(v-model="selectedValue" @change='changeOption')
    el-radio(
      v-for='(radioContent, index) in radioContents'
      :key='index'
      :label='radioContent.label'
    ) {{radioContent.text}}
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit, Watch } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
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
export default class Radio extends Vue {
  @Prop({ default: '' }) initValue?: string | number
  @Prop() radioContents!: RadioContent
  @Prop({ default: false }) isEither?: boolean

  private selectedValue: string | number | undefined

  beforeMount() {
    this.selectedValue = cloneDeep(this.initValue)
  }

  @Emit('selectRadio')
  changeOption() {
    return this.selectedValue
  }

  @Watch('initValue')
  onChangeInitValue(newInitValue) {
    this.selectedValue = cloneDeep(newInitValue)
  }
}
</script>
<style lang="sass" scoped>
.radio :deep()
  > .-group
    display: flex
    flex-direction: column
    label
      padding: 16px
      border-radius: 3px
      background-color: $light_gray
      &:not(:first-child)
        margin-top: 8px
      .el-radio__label
        color: $dark_gray
        font-size: $font_size_default_pc
        margin-left: 16px
      &.is-checked
        background-color: $sub_color
        > .el-radio__input
          .el-radio__inner
            border: 1px solid $light_gray
            background-color: $white
            &::after
              background-color: $sub_color
              width: 6px
              height: 6px
        .el-radio__label
          color: $white
.either :deep()
  > .-group
    flex-direction: row
    label
      width: calc(50% - 4px)
      &:not(:first-child)
        margin-top: 0
        margin-left: 8px
</style>
