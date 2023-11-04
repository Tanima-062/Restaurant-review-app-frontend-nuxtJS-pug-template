<template lang="pug">
div.researchbox
  vue-simple-suggest(
    :value='selectedData'
    :list="simpleSuggestionList"
    :placeholder='placeholder'
    @select="onSuggestSelect"
    @input='suggestWatch'
  )
    div.listing(slot='suggestion-item' slot-scope='{suggestion}')
      train-icon#-trainicon
      span {{suggestion.title}}
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
export default class ResearchSuggest extends Vue {
  @Prop() selectedData!: string
  @Prop() placeholder!: string
  @Prop() simpleSuggestionList!: string[]
  @Emit()
  onSuggestSelect(suggest): string {
    return suggest.title
  }

  suggestWatch(val) {
    // ここでelasticsearchを叩く
    if (val !== '') {
      this.$store.dispatch('modules/suggest_search/elasticSearch', val)
    }
  }
}
</script>
<style lang="sass">
.researchbox
  position: relative
  width: 50%
  #-icon
    position: absolute
    width: 20px
    top: 20%
    left: 5%
    fill: #a6a6a6
  .listing
    position: relative
    #-trainicon
      position: absolute
      width: 20px
      top: 15%
      left: -17%
.vue-simple-suggest.designed .input-wrapper input
  border: 1px solid #e4e4e4 !important
  border-radius: 2px !important
  padding: 15px 15px 15px 40px !important
  background-color: #f4f4f4 !important
  font-size: 16px !important
  &:focus
    background-color: white
  &:selected
    background-color: white
.vue-simple-suggest.designed .suggestions .suggest-item
  background-color: white
  color: #222222
  font-family: HiraKakuPro-W3
  font-size: 14px
  font-weight: normal
  font-stretch: normal
  font-style: normal
  line-height: 2.14
  padding-left: 40px
  margin-top: -1px
  &.hover
    background-color: white
    color: #222222
    font-family: HiraKakuPro-W3
    font-size: 14px
    font-weight: normal
    font-stretch: normal
    font-style: normal
    line-height: 2.14
    padding-left: 40px
  &.selected
    background-color: white
    color: #222222
    font-family: HiraKakuPro-W3
    font-size: 14px
    font-weight: normal
    font-stretch: normal
    font-style: normal
    line-height: 2.14
    padding-left: 40px
    .suggestlist
      position: relative
      .-trainicon
        position: absolute
        width: 20px
@include pc_view
  .researchbox
    #-icon
      position: absolute
      width: 20px
      top: 20%
      left: 3%
      fill: #a6a6a6
    .listing
      position: relative
      #-trainicon
        position: absolute
        width: 20px
        top: 15%
        left: -7%
@media screen and (max-width: 1024px) and (min-width: 650px)
  .researchbox
    #-icon
      position: absolute
      width: 20px
      top: 20%
      left: 3%
      fill: #a6a6a6
    .listing
      position: relative
      #-trainicon
        position: absolute
        width: 20px
        top: 15%
        left: -6%
@media screen and (max-width: 650px) and (min-width: 450px)
  .researchbox
    #-icon
      position: absolute
      width: 20px
      top: 20%
      left: 4%
      fill: #a6a6a6
    .listing
      position: relative
      #-trainicon
        position: absolute
        width: 20px
        top: 15%
        left: -10%
</style>
