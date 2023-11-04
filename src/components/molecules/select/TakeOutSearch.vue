<template lang="pug">
base-drawer-free(
  :isActive='isShow',
  @close='closeDrawer',
  :title='title',
  textSize='L',
  number=1
)
  .selectModal
    paragraph-bold#-formlabls(v-show='title==="再検索"') エリアまたは現在地から検索
    .clear
      paragraph.clearText(fontSize='small', @click='clear()') クリア
    .SearchContainer
      .container_top(v-show='title==="再検索"')
        area-select(
          v-if='$feature("phase1")',
          :area-list='areaLists',
          :selected-area-cd='selectedAreaCd ? selectedAreaCd : ""',
          @select-area='changeArea'
        )
        area-select-box(
          v-else,
          :area-list='areaLists',
          :selected-area-cd='selectedAreaCd',
          @change='changeArea'
        )
        location-button(@click='gomap')
      hr.sectionLast(v-show='title!=="こだわり検索"')
      paragraph-bold#-formlabls ジャンルから絞り込む
      .NarrowGenreContainer
        .cooksCategory.inputselect
          paragraph 料理ジャンル
          select-box#genre_type(@change='changeFood($event)')
            option(value='', :selected='selectedFoodCd === ""') 選択してください
            option(
              v-for='item in genresInit',
              :selected='hasSelectedValue(item.genreCd === selectedFoodCd)',
              :value='[item.genreCd, item.name]',
              :label='item.name',
              :key='item.id'
            ) {{ item.name }}
          select-arrow#pullbutton.-selecticon
        .menusCategory.inputselect
          paragraph メニュージャンル
          select-box#genre_food(
            @change='changeMenu($event)',
            :disabled='disabledFlag'
          )
            option(value='', :selected='selectedMenuCd === ""') 選択してください
            option(
              v-for='item in menuInit',
              :selected='hasSelectedValue(item.genreCd === selectedMenuCd)',
              :value='[item.genreCd, item.name]',
              :label='item.name',
              :key='item.id'
            ) {{ item.name }}
          select-arrow#pullbutton.-selecticon
  template(v-slot:footer)
    .-footer
      .btn
        CTA-button-long(
          text='絞り込む',
          type='secondary',
          fontSize='large',
          @click='pushSend'
        )
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { AreaTypes } from '~/types/areaTypes'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import AreaSelect from '~/components/molecules/select/AreaSelect.vue'
import AreaSelectBox from '~/components/molecules/select/AreaSelectBox.vue'
import BaseDrawerFree from '~/components/atoms/drawers/BaseDrawerFree.vue'
import CTAButtonLong from '~/components/atoms/button/CTAButtonLong.vue'
import LocationButton from '~/components/atoms/button/LocationButton.vue'
import Next from '~/assets/icon/next.svg'
import SelectArrow from '~/assets/icon/nextV2.svg'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import { urlQueryFormat } from '~/plugins/util'

const MODAL_OVERLAY_CLASS = 'base-modal-overlay'
@Component({
  components: {
    AreaSelect,
    AreaSelectBox,
    BaseDrawerFree,
    CTAButtonLong,
    Heading,
    LocationButton,
    Next,
    Paragraph,
    ParagraphBold,
    SelectArrow,
    SelectBox,
    Span,
    SpanBold
  }
})
export default class TakeOutSearch extends Vue {
  @Prop() private isShow!: boolean
  @Prop({ default: '再検索' }) title!: string
  selectedAreaCd = ''
  selectedAreaName = ''
  selectedFoodCd = ''
  selectedFoodName = ''
  selectedMenuCd = ''
  selectedMenuName = ''
  disabledFlag = true

  mounted() {
    this.selectedAreaCd = this.getSearchBox.suggestText
    this.selectedAreaName = this.getSearchBox.suggestTextName
    this.selectedFoodCd = this.getSearchBox.cookingGenreCd
    this.selectedFoodName = this.getSearchBox.cookingGenreCdName
    this.selectedMenuCd = this.getSearchBox.menuGenreCd
    this.selectedMenuName = this.getSearchBox.menuGenreCdName

    // ジャンルリストを叩く
    this.$store.dispatch('modules/suggest_search/ReSearch')
    setTimeout(() => {
      this.notChangeGenre()
    }, 0)
  }

  notChangeGenre(): void {
    this.selectedAreaCd = this.getSearchBox.suggestText
    this.selectedAreaName = this.getSearchBox.suggestTextName
    this.selectedFoodCd = this.getSearchBox.cookingGenreCd
    this.selectedFoodName = this.getSearchBox.cookingGenreCdName
    this.selectedMenuCd = this.getSearchBox.menuGenreCd
    this.selectedMenuName = this.getSearchBox.menuGenreCdName
    if (this.selectedFoodCd) {
      this.$store.dispatch('modules/suggest_search/ReSearchChild', this.getSearchBox.cookingGenreCd)
    }
  }

  // クリアボタンを押した時
  clear() {
    this.disabledFlag = true
    const tempSelectedAreaCd = this.selectedAreaCd
    const tempSelectedAreaName = this.selectedAreaName
    this.$store.dispatch('modules/search_store/resetSearchBoxTO')
    this.$store.dispatch('modules/suggest_search/ResetChild')

    // テイクアウトTOPでは設定されているエリアコードをリセットしないようにする
    if (this.title === '再検索') {
      this.selectedAreaCd = ''
      this.selectedAreaName = ''
    } else {
      let areaType = 'AREA'
      if (tempSelectedAreaCd === '') {
        areaType = ''
      }
      const updateData = {
        suggestCd: areaType,
        suggestText: tempSelectedAreaCd,
        suggestTextName: tempSelectedAreaName
      }
      this.$store.dispatch('modules/search_store/setSearchBoxTO', updateData)
    }

    this.selectedFoodCd = ''
    this.selectedFoodName = ''
    this.selectedMenuCd = ''
    this.selectedMenuName = ''
  }

  // areaのoptionリストを取得
  get areas(): AreaTypes.SelectAreaTypes[] {
    return this.$store.getters['modules/area/getSearchBoxTO'].areas
      ? this.$store.getters['modules/area/getSearchBoxTO'].areas
      : []
  }

  get areaLists() {
    if (this.getSearchBox.suggestCd !== 'AREA' || !this.areas) {
      return this.areas
    }
    if (this.areas.every((area) => area.areaCd !== this.getSearchBox.suggestText)) {
      return this.areas.concat({
        areaCd: this.getSearchBox.suggestText,
        id: 0,
        name: this.getSearchBox.suggestTextName,
        level: 0,
        path: '',
        weight: 0,
        sort: 0
      })
    } else {
      return this.areas
    }
  }

  // genreのoptionリストを取得
  get genresInit() {
    if (this.$store.getters['modules/suggest_search/getResearchGenre']) {
      return this.$store.getters['modules/suggest_search/getResearchGenre']
    }
  }

  // menuのoptionリストを取得
  get menuInit() {
    return this.$store.getters['modules/suggest_search/getResearchGenreChild']
  }

  pushSend() {
    // ページのリセット,料理カテゴリのセット,メニューカテゴリのセット
    const updateData = {
      page: null,
      cookingGenreCd: this.selectedFoodCd,
      cookingGenreCdName: this.selectedFoodName,
      menuGenreCd: this.selectedMenuCd,
      menuGenreCdName: this.selectedMenuName
    }

    // エリアコードのセットとエリアの値のセットは常に両方される
    if (this.title === '再検索') {
      let areaType = 'AREA'
      if (this.selectedAreaCd === '') {
        areaType = ''
      }
      Object.assign(updateData, {
        suggestCd: areaType,
        suggestText: this.selectedAreaCd,
        suggestTextName: this.selectedAreaName
      })
      this.$store.dispatch('modules/search_store/setSearchBoxTO', updateData)

      // 再検索の時は叩く
      this.$store.dispatch('modules/search_store/storeSearch', this.getSearchBox)
    } else {
      this.$store.dispatch('modules/search_store/setSearchBoxTO', updateData)
    }
    this.closeDrawer()
    this.$router.push('/takeout/search_result/' + urlQueryFormat(updateData))
    this.$nuxt.refresh()
  }

  hasSelectedValue(value) {
    if (value) {
      this.disabledFlag = false
      return true
    } else {
      return false
    }
  }

  @Emit('close')
  closeDrawer() {
    this.notChangeGenre()
  }

  // マップに飛ぶ
  gomap() {
    const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
    document.body.style.overflow = 'auto'
    this.$router.push('/map/?list=true&pl=take')
  }

  changeArea(data) {
    if (this.$feature('phase1')) {
      this.selectedAreaCd = data.areaCd
      this.selectedAreaName = data.name
    } else {
      this.selectedAreaCd = data.suggestText
      this.selectedAreaName = data.suggestTextName
    }
  }

  changeFood(val) {
    const newval = val.split(',')
    this.selectedFoodCd = newval[0]
    this.selectedFoodName = newval[1]
    this.selectedMenuCd = ''
    this.selectedMenuName = ''
    // menuカテゴリのoptionリストを持ってくる
    if (newval[0] === '') {
      this.disabledFlag = true
      this.$store.dispatch('modules/suggest_search/ResetChild')
    } else {
      this.disabledFlag = false
      this.$store.dispatch('modules/suggest_search/ReSearchChild', newval[0])
    }
  }

  changeMenu(val) {
    const newval = val.split(',')
    this.selectedMenuCd = newval[0]
    this.selectedMenuName = newval[1]
  }

  get getSearchBox() {
    // 選択されているデータ
    return this.$store.getters['modules/search_store/getSearchBoxTO']
  }
}
</script>

<style lang="sass" scoped>
.selectModal
  width: 95%
  .clear
    position: absolute
    top: 0
    right: 0
    margin-top: 35px
    margin-right: 50px
    cursor: pointer
    .clearText
      color: #1BA1FF
      &:hover
        font-weight: 700
  #-formlabls
    margin-bottom: 15px
    font-size: 16px
  .SearchContainer
    margin: 0
  .sectionLast
    height: 1px
    background-color: #e4e4e4
  .sectionLast_full
    height: 1px
    background-color: #e4e4e4
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-52vw + 50%)
  .sectionLast_large
    height: 8px
    background-color: #f4f4f4
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
  .inputselect
    position: relative
    display: inline-block
    width: 100%
    .-half
      width: 23%
    .-selecticon
      position: absolute
      top: 56%
      right: 16px
      margin-top: -12px
      width: 16px
      height: 24px
      fill: $dark_gray
    .-selecticon2
      position: absolute
      top: 65%
      right: 16px
      margin-top: -12px
      width: 16px
      height: 24px
      fill: $dark_gray
  .container_top
    display: grid
    grid-template-columns: 1fr max-content
    gap: 16px
    padding-bottom: 16px
  .container_bottom
    display: flex
    justify-content: space-between
    align-items: flex-end
    border: 1px solid #a6a6a6
    border-radius: 3px
    margin-bottom: 8px
    margin-top: 8px
    height: 70px
    .-icon
      width: 16px
      height: 16px
      fill: $dark_gray
    .-search-date
      width: 50%
    .-search-time
      display: flex
      align-items: center
      width: 50%
      padding-left: 8px
      position: relative
      &:before
        content: ''
        position: absolute
        bottom: 8px
        left: -8px
        display: block
        width: 1px
        height: 60%
        border-left: 1px dashed $dark_gray
      .select-box
        max-width: 100px
        height: 40px
        padding: 8px
      .-label
        color: #a6a6a6
        position: absolute
        top: -38%
    .inner-title-button
      border-bottom: 0px
      padding: 0px 8px 8px 8px
      .-contents
        white-space: nowrap
      .-icon
        width: 16px
        height: 16px
        margin-right: 8px
        vertical-align: text-bottom
        fill: $dark_gray
  .NarrowGenreContainer
    #genre_type
      width: 100%
      margin-right: 5px
      margin-bottom: 20px
      &:hover
        cursor: pointer
    #genre_food
      width: 100%
      margin-right: 5px
      margin-bottom: 20px
      &:hover
        cursor: pointer
  .NarrowbudgetContainer
    display: flex
    padding-bottom: 30px
    position: relative
    #lower
      width: 40%
      margin-right: 5px
    #froms
      width: 20%
      padding-top: 10px
      text-align: center
    #upper
      width: 40%
      margin-right: 5px
    .smalliconL
      position: absolute
      top: 30%
      left: 30%
      margin-top: -12px
      width: 16px
      height: 24px
      fill: $dark_gray
    .smalliconR
      position: absolute
      top: 30%
      right: 5%
      margin-top: -12px
      width: 16px
      height: 24px
      fill: $dark_gray
  .-commitment
    position: relative
    .-icon
      position: absolute
      width: 15px
      left: 100%
      transform: rotate(90deg)
      fill: #a6a6a6
    .-iconRev
      position: absolute
      width: 15px
      left: 100%
      transform: rotate(270deg)
      fill: #a6a6a6
    #genres-name
      font-size: 16px
      cursor: hand
      cursor: pointer
    .pointer
      cursor: pointer
  .-footer
    .btn
      text-align: center
      width: 100%
#pullbutton
  transform: rotate(90deg)
.tophover
  cursor: pointer
@include pc_view
  .-footer
    .btn
      text-align: center
      width: 100%
  .selectModal
    #-formlabls
      margin: 20px 0
    .inputselect
      .-half
        width: 15%
    .NarrowGenreContainer
      display: flex
      .cooksCategory
        width: 100%
      .menusCategory
        width: 50%
        margin-left: 10px
    .NarrowbudgetContainer
      display: flex
      padding-bottom: 30px
      position: relative
      #lower
        width: 40%
        margin-right: 5px
      #froms
        width: 20%
        padding-top: 10px
        text-align: center
      #upper
        width: 40%
        margin-right: 5px
      .smalliconL
        position: absolute
        top: 30%
        left: 0
        margin-left: 210px
        margin-top: -12px
        width: 16px
        height: 24px
        fill: $dark_gray
      .smalliconR
        position: absolute
        top: 30%
        right: 3%
        margin-top: -12px
        width: 16px
        height: 24px
        fill: $dark_gray
</style>
