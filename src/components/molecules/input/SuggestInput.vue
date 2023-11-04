<template lang="pug">
.suggestbox
  vue-simple-suggest(
    :value='selectedData',
    type='text',
    :list='simpleSuggestionList',
    :placeholder='placeholder',
    @select='onSuggestSelect($event)',
    @input='suggestWatch($event)',
    :disabled='disabled'
  )
    template(slot='misc-item-above')
      paragraph.topStation(fontSize='small') 駅名
    .listing(slot='suggestion-item', slot-scope='{suggestion}') {{ suggestion.title }}
      //- train-icon#-trainicon
  search-icon#-icon
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css' // Optional CSS
import Paragraph from '~/components/atoms/typography/Paragraph.vue'
import SearchIcon from '~/assets/icon/search.svg'
import TrainIcon from '~/assets/icon/train.svg'

@Component({
  components: {
    VueSimpleSuggest,
    Paragraph,
    SearchIcon,
    TrainIcon
  }
})
export default class SuggestInput extends Vue {
  @Prop() selectedData!: string
  @Prop() placeholder!: string
  @Prop() disabled!: boolean
  @Prop() simpleSuggestionList!: string[]
  @Emit()
  onSuggestSelect(suggest): string {
    return suggest.title
  }

  @Emit()
  inputText(val) {
    return val
  }

  suggestWatch(val) {
    this.inputText(val)
    // ここでelasticsearchを叩く
    if (val !== '') {
      this.$store.dispatch('modules/suggest_search/elasticSearch', val)
    }
  }
}
</script>
<style lang="sass">
.suggestbox
  position: relative
  width: 50%
  .topStation
    margin: 16px
    font-size: 16px
  #-icon
    position: absolute
    width: 20px
    top: 20%
    left: 0%
    fill: #a6a6a6
    margin-left: 10px
  .listing
    position: relative
    color: black
    #-trainicon
      position: absolute
      width: 20px
      top: 15%
      left: 0%
      margin-left: -30px
    .leftside
      margin-left: -30px
.vue-simple-suggest.designed .input-wrapper input
  border: 1px solid #e4e4e4 !important
  border-radius: 2px !important
  padding: 15px 15px 15px 40px !important
  background-color: #f4f4f4 !important
  font-size: 16px !important
  &:focus
    background-color: white !important
  &:selected
    background-color: white !important
.vue-simple-suggest.designed .suggestions .suggest-item
  background-color: white
  font-family: HiraKakuPro-W3
  font-size: 14px
  font-weight: normal
  font-stretch: normal
  font-style: normal
  line-height: 2.14
  padding-left: 40px
  margin-top: -1px
  &:hover
    background-color: #2873D5
    font-family: HiraKakuPro-W3
    font-size: 14px
    font-weight: normal
    font-stretch: normal
    font-style: normal
    line-height: 2.14
    padding-left: 40px
    .listing
      color: white
  &.selected
    background-color: #2873D5
    color: white !important
    font-family: HiraKakuPro-W3
    font-size: 14px
    font-weight: normal
    font-stretch: normal
    font-style: normal
    line-height: 2.14
    padding-left: 40px
    .listing
      color: white
    .suggestlist
      position: relative
      .-trainicon
        position: absolute
        width: 20px
@include pc_view
  .suggestbox
    width: 35%
    position: relative
    #-icon
      position: absolute
      width: 20px
      top: 20%
      left: 0%
      margin-left: 50px
      fill: #a6a6a6
</style>
