<template lang="pug">
div.radio(:class="{either: isEither}")
  el-radio-group.-group(v-model="selectedValue" @change='changeOption')
    el-radio(
      v-for='(radioContent, index) in radioContents'
      :key='index'
      :label='radioContent.label'
    ) {{radioContent.text}}
      span-bold(v-if='smallText!=null') <br>
      span-bold.rect(v-if='points!=null && index===0') {{points}}
      span-bold.smallText(v-if='smallText!=null') {{smallText}}
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit, Watch } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import { Paragraph, SpanBold } from '~/components/atoms/typography'

type RadioContent = {
  label: string | number
  text: string
}

@Component({
  components: {
    Paragraph,
    SpanBold
  }
})
export default class Radio extends Vue {
  @Prop({ default: '' }) initValue?: string | number
  @Prop() radioContents!: RadioContent
  @Prop({ default: false }) isEither?: boolean
  @Prop() smallText?: string
  @Prop() points?: string

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
  > .-group
    display: flex
    flex-direction: column
    label
      padding: 16px
      border-radius: 3px
      background-color: $light_gray
      margin-top: 10px
      &:not(:first-child)
        margin-top: 10px
      .el-radio__label
        color: $dark_gray
        font-size: $font_size_default_pc
        margin-left: 16px
      .smallText
        color: $dark_gray
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
        .smallText
          color: $white
.either :deep()
  > .-group
    label
      &:not(:first-child)
        margin-top: 10px
.smallText
  padding: 40px
  font-size: 12px
.rect
  border-radius: 3px;
  border: solid 1px #ddf1ff;
  background-color: #ddf1ff;
  padding: 2px 5px
  font-size: 12px
  color: #1c5db5
</style>
