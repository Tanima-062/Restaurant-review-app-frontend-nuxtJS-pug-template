<template lang="pug">
.radio(:class='{ either: isEither }')
  el-radio-group.-group(v-model='selectedValue', @change='changeOption')
    el-radio(
      v-for='(radioContent, index) in radioContents',
      :key='index',
      :label='radioContent.label'
    ) {{ radioContent.text }}
      paragraph-bold.names(fontSize='medium', v-if='index === 0') {{ name }}
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit, Watch } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography'

type RadioContent = {
  label: string | number
  text: string
}

@Component({
  components: {
    Paragraph,
    ParagraphBold
  }
})
export default class NameRadio extends Vue {
  @Prop({ default: '' }) initValue?: string | number
  @Prop() radioContents!: RadioContent
  @Prop({ default: false }) isEither?: boolean
  @Prop() name?: string

  private selectedValue: string | number | undefined

  beforeMount() {
    this.selectedValue = cloneDeep(this.initValue)
  }

  @Emit('changeOption')
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
  .names
    padding-top: 10px
    padding-left: 40px
</style>
