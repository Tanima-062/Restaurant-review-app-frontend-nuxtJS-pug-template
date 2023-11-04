<template lang="pug">
base-drawer-free(
  :isActive='isShow',
  @close='closeDrawer',
  :title='title',
  textSize='l',
  number=1
)
  .selectModal
    paragraph-bold.sub-title(v-show='title==="再検索"', fontSize='medium') エリアまたは現在地から検索
    .clear
      paragraph.clearText(fontSize='small', @click='clear()') クリア
    .SearchContainer
      template(v-if='title === "再検索"')
        .container_top
          area-select(
            :area-list='areas',
            :selected-area-cd='selectedAreaCd ? selectedAreaCd : ""',
            @select-area='changeArea'
          )
          location-button(@click='goMap')
          paragraph(
            v-show='areaErrorFlag',
            fontSize='tiny',
            letterSpacing='none',
            color='error'
          ) エリアを選択してください
        .search-condition-wrapper
          .search-condition-date
            date-select(
              :selected-date='selectedDate',
              :disabled='localWhenever',
              @change-date='changeDate'
            )
          .search-condition-time
            time-button(
              :selected-time='selectedTime',
              :inactive='localWhenever',
              @change-time='changeTime'
            )
          .search-condition-people
            people-select(
              :selected-people='selectedPeople',
              :inactive='localWhenever',
              @change-people='changePeople'
            )
          div
        .whenever-wrapper
          check-box(:checked='localWhenever', @change='changeWhenever') 日付未定
        paragraph.alert(
          fontSize='medium',
          letterSpacing='none',
          v-show='errorFlag'
        ) ・来店日時は現在の日時以降に設定してください
        hr.section-last
      paragraph-bold.-formlabls(fontSize='medium') ジャンルから絞り込む
      .NarrowGenreContainer
        .cooksCategory.inputselect
          paragraph 料理カテゴリー
          select-box#genre_type(@change='changeFood($event)')
            option(value='', :selected='selectedFoodCd === ""') 選択してください
            option(
              v-for='item in genresInit',
              :selected='hasSelectedValue(item.genreCd === selectedFoodCd)',
              :value='[item.genreCd, item.name]',
              :label='item.name',
              :key='item.id'
            ) {{ item.name }}
          select-arrow.-selecticon
        .menusCategory.inputselect
          paragraph メニューカテゴリー
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
          select-arrow.-selecticon
      .budget-container
        paragraph-bold.-formlabls(fontSize='medium') 店舗予算から絞り込む
        simple-radio(
          :radio-contents='BUDGEZONE',
          :init-value='BUDGEZONE[selectedZone === 0 ? 1 : 0].label',
          :is-either='true',
          @changeOption='changeOption'
        )
      .budget-reserve-container
        budget-select(
          :selected-price='selectedLowerPrice',
          :standard-price='selectedUpperPrice',
          @change='changeLowerPrice'
        )
        .tilde 〜
        budget-select(
          :isLower='false',
          :selected-price='selectedUpperPrice',
          :standard-price='selectedLowerPrice',
          @change='changeUpperPrice'
        )
      hr.section-last-bold(v-if='preferenceList.length > 0')
      .preference-container
        .preferences(
          v-for='(preference, index) in preferenceList',
          :key='preference.genreCd'
        )
          preference-card(
            v-if='isShow',
            ref='preferenceCard',
            :preference='preference',
            :selected-preferences='selectedPreferences',
            @click='changePreference'
          )
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
import { Prop, Component, Emit, Watch } from 'nuxt-property-decorator'
import { AreaTypes } from '~/types/areaTypes'
import { StoreTypes } from '~/types/storeTypes'
import { searchBoxRS } from '~/store/modules/search_store'
import { initVisitProperty } from '~/plugins/util'
import AreaSelect from '~/components/molecules/select/AreaSelect.vue'
import BaseDrawerFree from '~/components/atoms/drawers/BaseDrawerFree.vue'
import BudgetSelect from '~/components/molecules/select/BudgetSelect.vue'
import CheckBox from '~/components/atoms/checkbox/CheckBox.vue'
import CTAButtonLong from '~/components/atoms/button/CTAButtonLong.vue'
import DateSelect from '~/components/molecules/select/DateSelect.vue'
import LocationButton from '~/components/atoms/button/LocationButton.vue'
import PeopleSelect from '~/components/molecules/select/PeopleSelect.vue'
import PreferenceCard from '~/components/molecules/card/PreferenceCard.vue'
import SelectArrow from '~/assets/icon/nextV2.svg'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import SimpleRadio from '~/components/molecules/radio/SimpleRadio.vue'
import TimeButton from '~/components/atoms/button/TimeButton.vue'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
const MODAL_OVERLAY_CLASS = 'base-modal-overlay'
@Component({
  components: {
    AreaSelect,
    BaseDrawerFree,
    BudgetSelect,
    CheckBox,
    CTAButtonLong,
    DateSelect,
    Heading,
    LocationButton,
    Paragraph,
    ParagraphBold,
    PeopleSelect,
    PreferenceCard,
    SelectArrow,
    SelectBox,
    SimpleRadio,
    Span,
    SpanBold,
    TimeButton
  }
})
export default class RestaurantSearch extends Vue {
  @Prop() isShow!: boolean
  @Prop({ default: '再検索' }) title!: string
  @Prop() searchInfo!: StoreTypes.SearchBoxRS
  @Prop({ default: false }) whenever!: boolean
  BUDGEZONE = [
    { label: 1, text: 'ランチ' },
    { label: 0, text: 'ディナー' }
  ]

  $refs!: {
    preferenceCard
  }

  errorFlag = false
  areaErrorFlag = false
  selectedAreaCd = ''
  selectedFoodCd = ''
  selectedMenuCd = ''
  selectedDate = ''
  selectedTime = ''
  selectedPeople = 0
  selectedZone = searchBoxRS.zone
  selectedLowerPrice: number | null = null
  selectedUpperPrice: number | null = null
  selectedPreferences: number[] = []
  localWhenever = false
  disabledFlag = true

  mounted() {
    // こだわり検索用のデータを取得
    this.$store.dispatch('modules/search_store/fetchPreference')
    // ジャンルリストを叩く
    this.$store.dispatch('modules/suggest_search/ReSearch')
    this.dataInit()
  }

  @Watch('searchInfo', { deep: true })
  dataInit() {
    this.notChangeGenre()
  }

  // areaのoptionリストを取得
  get areas(): AreaTypes.SelectAreaTypes[] {
    return this.$store.getters['modules/area/getSearchBoxRS'].areas
      ? this.$store.getters['modules/area/getSearchBoxRS'].areas
      : []
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

  get preferences() {
    return this.$store.getters['modules/search_store/getPreference'].genres
  }

  get preferenceList() {
    const parents = this.preferences.filter((preference) => preference.level === 2)
    const children = this.preferences.filter((preference) => preference.level === 3)
    return parents.map((parent) => {
      return {
        genreCd: parent.genreCd,
        name: parent.name,
        child: children.filter((child) => {
          const reg = new RegExp(`^${parent.path}/${parent.genreCd}$`)
          return child.path.match(reg)
        })
      }
    })
  }

  notChangeGenre(): void {
    this.selectedAreaCd = this.searchInfo.suggestText
    this.selectedFoodCd = this.searchInfo.cookingGenreCd
    this.selectedMenuCd = this.searchInfo.menuGenreCd
    this.selectedDate = this.searchInfo.visitDate
    this.selectedTime = this.searchInfo.visitTime
    this.selectedPeople = this.searchInfo.visitPeople
    this.selectedLowerPrice = this.searchInfo.lowerPrice
    this.selectedUpperPrice = this.searchInfo.upperPrice
    this.selectedZone = this.searchInfo.zone
    this.selectedPreferences = this.convertPreferenceAry(this.searchInfo.details)
    if (this.selectedFoodCd) {
      this.$store.dispatch('modules/suggest_search/ReSearchChild', this.searchInfo.cookingGenreCd)
    }
    this.localWhenever = this.whenever
  }

  // クリアボタンを押した時
  clear() {
    this.errorFlag = false
    this.areaErrorFlag = false
    this.disabledFlag = true
    const temp = {
      suggestText: this.selectedAreaCd,
      visitDate: this.selectedDate,
      visitTime: this.selectedTime,
      visitPeople: this.selectedPeople,
      suggestCd: this.searchInfo.suggestCd
    }
    const updateData = {}
    this.$store.dispatch('modules/suggest_search/ResetChild')

    // レストランTOPでは設定されているエリアコードをリセットしないようにする
    if (this.title === '再検索') {
      const { visitDate, visitTime, visitPeople } = initVisitProperty(searchBoxRS)

      Object.assign(updateData, {
        visitDate,
        visitTime,
        visitPeople
      })
      this.localWhenever = false
    } else {
      Object.assign(updateData, searchBoxRS, temp)
    }
    this.updateQuery(updateData)
    this.$refs.preferenceCard.forEach(({ clear }) => clear())
    this.notChangeGenre()
  }

  pushSend() {
    const top = document.getElementsByClassName('-header')[0]
    if (top instanceof HTMLElement) {
      top.scrollIntoView(true)
    }
    // ページのリセット,料理カテゴリのセット,メニューカテゴリのセット
    const updateData = {
      cookingGenreCd: this.selectedFoodCd,
      menuGenreCd: this.selectedMenuCd,
      visitDate: this.selectedDate,
      visitTime: this.selectedTime,
      visitPeople: this.selectedPeople,
      lowerPrice: this.selectedLowerPrice,
      upperPrice: this.selectedUpperPrice,
      zone: this.selectedZone,
      details: this.convertPreferenceStr(this.selectedPreferences),
      appCd: searchBoxRS.appCd
    }
    // エリアコードのセットとエリアの値のセットは常に両方される
    if (this.title === '再検索') {
      if (!this.localWhenever && this.validVisitDate(updateData)) {
        this.errorFlag = true
      } else {
        this.errorFlag = false
      }
      if (this.selectedAreaCd) {
        this.areaErrorFlag = false
        Object.assign(updateData, {
          suggestCd: 'AREA',
          suggestText: this.selectedAreaCd
        })
      } else {
        this.areaErrorFlag = true
      }
      if (this.errorFlag || this.areaErrorFlag) {
        return
      }
      this.$store.dispatch('modules/search_store/resetStoreSearch')
      this.updateQuery(updateData)
    } else {
      this.updateQuery(updateData)
    }
    this.closeDrawer()
  }

  hasSelectedValue(value) {
    if (value) {
      this.disabledFlag = false
      return true
    } else {
      return false
    }
  }

  validVisitDate({ visitDate, visitTime }) {
    return new Date() > new Date(`${String(visitDate).replace(/-/g, '/')} ${String(visitTime)}`)
  }

  @Emit()
  updateQuery(query) {
    return { query, whenever: this.localWhenever }
  }

  @Emit('close')
  closeDrawer() {
    this.errorFlag = false
    this.notChangeGenre()
  }

  // マップに飛ぶ
  goMap() {
    const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
    document.body.style.overflow = 'auto'
    this.$router.push('/map/?list=true&pl=res')
  }

  changeArea({ areaCd }) {
    this.areaErrorFlag = false
    this.selectedAreaCd = areaCd
  }

  changeFood(val) {
    const newval = val.split(',')
    this.selectedFoodCd = newval[0]
    this.selectedMenuCd = ''
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
  }

  changeOption(val) {
    this.selectedZone = val
  }

  changeLowerPrice(price) {
    this.selectedLowerPrice = price
    // 一度でも発火したらzoneを入れる。デフォルトは昼
    this.selectedZone = this.selectedZone === 0 ? 0 : 1
  }

  changeUpperPrice(price) {
    this.selectedUpperPrice = price
    // 一度でも発火したらzoneを入れる。デフォルトは昼
    this.selectedZone = this.selectedZone === 0 ? 0 : 1
  }

  changeDate(date: string): void {
    this.localWhenever = false
    this.selectedDate = date
  }

  changeTime(time: string): void {
    this.localWhenever = false
    this.selectedTime = time
  }

  changePeople(people: number): void {
    this.localWhenever = false
    this.selectedPeople = people
  }

  changeWhenever(whenever) {
    this.localWhenever = whenever
    if (this.localWhenever) {
      this.errorFlag = false
    }
  }

  changePreference(id: number): void {
    const index = this.selectedPreferences.indexOf(id)
    if (index > -1) {
      this.selectedPreferences.splice(index, 1)
    } else {
      this.selectedPreferences.push(id)
    }
  }

  convertPreferenceAry(preferences: string): number[] {
    if (!preferences) {
      return []
    }
    return preferences.split(',').reduce((retAry: number[], preference) => {
      if (preference !== '' && !isNaN(Number(preference))) {
        retAry.push(+preference)
      }
      return retAry
    }, [])
  }

  convertPreferenceStr(preferences: number[]): string {
    return `${preferences}`
  }
}
</script>

<style lang="sass" scoped>
.selectModal
  .sub-title
    margin: 16px 0
    @include pc_view
      font-size: 20px
  .clear
    position: absolute
    top: 0
    right: 0
    margin-top: 30px
    margin-right: 50px
    cursor: pointer
    .clearText
      color: $main_color
      text-decoration: underline
      text-decoration-color: #0896ff
      &:active
        font-weight: 700
      @include pc_view
        font-size: 16px
        &:hover
          font-weight: 700
          text-decoration-color: #ffffff
  .-formlabls
    margin: 16px 0
    @include pc_view
      font-size: 18px
  .SearchContainer
    margin: 0
  .section-last
    height: 1px
    background-color: $gray
  .section-last-bold
    height: 8px
    background-color: $light_gray
    margin-bottom: 0
    width: 100%
    @include sp_view
      width: calc(100% + 36px)
      margin-left: -16px
      margin-right: -16px
  .inputselect
    position: relative
    display: inline-block
    width: 100%
    p
      margin-bottom: 8px
    .-half
      width: 23%
    .-selecticon
      pointer-events: none
      transform: rotate(90deg)
      position: absolute
      top: 60%
      right: 16px
      margin-top: -12px
      width: 16px
      height: 24px
      fill: $dark_gray
  .container_top
    display: grid
    grid-template-columns: 1fr max-content
    gap: 16px
    grid-row-gap: 8px
    padding-bottom: 16px
  .search-condition-wrapper
    padding: 8px 12px
    border-radius: 2px
    border: solid 1px $dark_gray
    background-color: $white
    display: flex
    width: 100%
    justify-content: space-between
    .search-condition-time
      border-left: dashed 1px $dark_gray
      padding-left: 16px
    .search-condition-people
      border-left: dashed 1px $dark_gray
      padding-left: 16px
  .whenever-wrapper
    padding-top: 8px
  .container_bottom
    display: flex
    justify-content: space-between
    align-items: flex-end
    border: 1px solid $dark_gray
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
        color: $dark_gray
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
    @include pc_view
      display: flex
      gap: 24px
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
    .menusCategory
      display: none
  .budget-container
    display: grid
    align-items: center
    grid-column-gap: 12px
    row-gap: 16px
    margin: 16px 0
    .radio :deep()
      .el-radio-group
        display: grid
        grid-template-columns: max-content max-content
        gap: 8px
        .el-radio
          margin: 0
          padding: 0
          .el-radio__label
            margin: 0
    .-formlabls
      margin: 0
    .radio.either
      margin: 0
  .budget-reserve-container
    display: grid
    grid-template-columns: 1fr max-content 1fr
    gap: 4px
    align-items: center
    .tilde
      font-size: 16px
  .preference-container
    .preferences-last
      border: solid 1px $gray
  .-commitment
    position: relative
    .-icon
      position: absolute
      width: 15px
      left: 100%
      transform: rotate(90deg)
      fill: $dark_gray
    .-iconRev
      position: absolute
      width: 15px
      left: 100%
      transform: rotate(270deg)
      fill: $dark_gray
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
  .alert
    color: $error_color
    margin: 10px 0px
    font-size: 14px
</style>
