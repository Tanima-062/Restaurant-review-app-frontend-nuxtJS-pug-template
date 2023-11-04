<template lang="pug">
.location-condition-wrapper
  .location-condition-suggest
    select.location-condition-suggest__select(v-model='switchConditionValue')
      option(
        v-for='location in locationGenre',
        :key='location',
        :value='location'
      ) {{ location }}
    select-arrow.location-condition-suggest__select--arrow
    vue-simple-suggest.location-condition-suggest__input(
      v-if='switchCondition',
      :value='selectedData',
      type='text',
      :list='getSuggestLists',
      :placeholder='placeholder',
      @select='onSuggestSelect($event)',
      :disabled='disabled',
      autocapitalize='off',
      autocomplete='off',
      autocorrect='off',
      aria-haspopup='false',
      aria-autocomplete='both',
      spellcheck='false'
    )
      template(#suggestion-item='{ suggestion }')
        .suggestion-style
          train-icon.icon
          span.suggestion-style-color {{ suggestion.title }}
    select.location-condition-suggest__input.area-select(
      v-else,
      required,
      @change='changeArea($event.target.value)',
      :disabled='!areaLists'
    )
      option.area-select-option(value='') 東京都／大阪府のエリアから検索
      optgroup(label='人気のエリア')
        option(
          v-for='(area, index) in areaLists',
          :value='[area.areaCd, area.name]',
          :selected='area.areaCd === selectedAreaCd',
          :label='area.name',
          :key='area.id',
          v-if='index < 6'
        ) {{ area.name }}
      optgroup(label='エリア一覧')
        option(
          v-for='(area, index) in areaLists',
          :value='[area.areaCd, area.name]',
          :selected='area.areaCd === selectedAreaCd',
          :label='area.name',
          :key='area.id',
          v-if='index >= 6'
        ) {{ area.name }}
  .location-here(@click='goMap')
    paragraph-bold.location-here__title(color='dark_gray', fontSize='tiny') 現在地
    location-mark-icon.location-here__icon
</template>
<script lang="ts">
import 'vue-simple-suggest/dist/styles.css' // Optional CSS
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import VueSimpleSuggest from 'vue-simple-suggest'
import { AreaTypes } from '~/types/areaTypes'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography'
import LocationMarkIcon from '~/assets/icon/location-mark.svg'
import SearchIcon from '~/assets/icon/search.svg'
import SelectArrow from '~/assets/icon/select-arrow.svg'
import TrainIcon from '~/assets/icon/train.svg'

@Component({
  components: {
    LocationMarkIcon,
    Paragraph,
    ParagraphBold,
    SearchIcon,
    SelectArrow,
    TrainIcon,
    VueSimpleSuggest
  }
})
export default class ComplexSuggest extends Vue {
  @Prop() selectedData!: string
  @Prop() disabled!: boolean
  @Prop() areaLists!: AreaTypes.SelectAreaTypes[]
  @Prop({ default: true }) isTakeout!: boolean
  @Prop() selectedAreaCd!: string
  switchConditionValue = 'エリア'
  locationGenre = ['エリア', '駅名']
  placeholder = '例) 恵比寿、新宿'
  @Emit()
  onSuggestSelect(suggest): string {
    return suggest.title
  }

  @Emit()
  inputText(val) {
    return val
  }

  @Emit()
  pushBtn() {
    // 親に伝える
  }

  get switchCondition() {
    switch (this.switchConditionValue) {
      case 'エリア': {
        return false
      }
      case '駅名': {
        return true
      }
      default:
        return false
    }
  }

  getSuggestLists(input) {
    return async (resolve) => {
      // ここでelasticsearchを叩く
      if (input === '') {
        resolve([])
      }
      await axios({
        method: 'post',
        url: process.env.PATH + '/elasticSearch', // nodeへリクエスト
        data: { queryText: input }
      })
        .then((res) => {
          const suggestList = res.data.hits.hits
          const list: { id: string; title: string }[] = []
          for (let i = 0; i < suggestList.length; i++) {
            list.push({
              id: suggestList[i]._id,
              title: suggestList[i]._source.name
            })
          }
          resolve(list)
        })
        .then(() => {
          // 失敗時空
          resolve([])
        })
    }
  }

  @Emit()
  changeArea(value) {
    const newval = value.split(',')
    let areaType = 'AREA'
    if (value === '') {
      areaType = ''
    }
    // 0にコード 1に名前
    return {
      suggestCd: areaType,
      suggestText: newval[0]
    }
  }

  goMap() {
    this.$router.push(`/map/${this.isTakeout ? '' : '?pl=res'}`)
  }

  get locationInfo() {
    return this.$store.getters['modules/user/getLocationInfo']
  }
}
</script>
<style lang="sass">
.location-condition-wrapper
  display: flex
  width: 100%
  .location-condition-suggest
    position: relative
    display: flex
    flex: 1
    height: 50px
    border: 1px solid $dark_gray
    border-radius: 3px
    font-family: HiraKakuPro-W3
    &__select
      min-width: 85px
      padding-left: 10px
      font-size: 16px
      outline: none
      border: none
      background-color: $light-gray
      &--arrow
        position: absolute
        width: 16px
        height: 16px
        fill: $dark-gray
        top: 15px
        left: 65px
    &__input
      max-width: 185px
      @include pc_view
        max-width: none
      min-width: calc(100% - 85px)
      outline: none
      border: none
      border-left: 1px solid $dark_gray
      background-color: #fff
      .input-wrapper
        height: 100%
        .default-input
          background-color: white !important
          padding: 17px 0 17px 8px !important
          height: 100% !important
          border: none !important
          &::placeholder
            color: $dark_gray
            font-size: 16px !important
    .area-select
      font-size: 16px
      padding-left: 8px
      border-radius: 0px
      white-space: nowrap
  .location-here
    display: flex
    flex-direction: column
    align-items: center
    min-width: 55px
    &:hover
      cursor: pointer
      .location-here__title
        color: #1c5db5
      .location-here__icon
        fill: #1c5db5
    @include pc_view
      margin-left: 10px
    padding: 0 4px
    @include pc_view
      padding: 0 8px
    .fillBule
      fill: #1c5db5
      color: #1c5db5
    &__icon
      width: 20px
      height: 20px
      fill: $dark_gray
select:invalid
  color: #222

.vue-simple-suggest.designed.focus
  .suggestions
    padding: 10px 0
    .suggest-item
      padding: 6px 12px
    .selected
      background-color: #fff !important
    .hover
      background-color: #1ba1ff !important
      .suggestion-style
        svg
          fill: #fff
        .suggestion-style-color
          color: #fff
.suggestion-style
  display: grid
  align-items: center
  gap: 5px
  grid-template-columns: max-content 1fr
  .suggestion-style-color
    font-size: 14px
    color: #222
  svg
    fill: #A6A6A6
    width: 16px
    height: 16px
</style>
