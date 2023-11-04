<template lang="pug">
div.radio(:class="{either: isEither}" )
  el-radio-group(v-model="selectedValue" @change='changeOption')
    el-radio(v-for='(radioContent, index) in radioContents' :key='index' :label='radioContent.label')
      label
        .radiocontents
          .imgs
            img(:src='radioContent.src' width='100%' )
          .texts
            paragraph-bold {{radioContent.label}}
            paragraph （２~４人）
            paragraph 喫煙
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
export default class ImageRadio extends Vue {
  @Prop({ default: '' }) initValue?: string | number
  @Prop() radioContents!: RadioContent
  @Prop({ default: false }) isEither?: boolean

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
.radio
  padding-top: 40px
  padding: 13% 10px
  .radiocontents
    margin-top: -15%
    display: flex
    margin-left: 30px
    margin-bottom: 15%
    .imgs
      width: 30%
    .texts
      width: 70%
      margin-left: 20px
</style>
