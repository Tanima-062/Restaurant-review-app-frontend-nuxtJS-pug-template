<template lang="pug">
.restaurant-form
  restaurant-search(
    :isShow='isShowSearch',
    :title='"こだわり検索"',
    :searchInfo='searchBox',
    @update-query='updateQuery',
    @close='isShowSearch = false'
  )
  notification-pop(
    :isShown='isAlertPopShown',
    type='error',
    icon='warning',
    position='right',
    @closePop='closePop'
  )
  paragraph-bold.label(fontSize='tiny', color='dark_gray') エリア、または現在地から検索
  .condition-wrapper
    .container_top
      area-select(
        :area-list='areaList',
        :selected-area-cd='searchBox.suggestText ? searchBox.suggestText : ""',
        :disabled='isLoading',
        @select-area='updateArea'
      )
      location-button.location-button(@click='goMap')
      paragraph(
        v-show='areaErrorFlag',
        fontSize='tiny',
        letterSpacing='none',
        color='error'
      ) エリアを選択してください
    .container_bottom(:class='[errorFlag ? "error-version" : ""]')
      select-restaurant-top(
        :selected-date='date',
        :selected-time='time',
        :selected-people='people',
        :inactive='whenever',
        :isLoading='isLoading',
        :hasChoices='hasChoices',
        @change-date='changeDate',
        @change-time='changeTime',
        @change-people='changePeople',
        @commitmentClick='clickCommitment()'
      )
      .whenever-wrapper
        .whenever-inner
          check-box(v-model='whenever') 日付未定
          commitment-button.commitment(
            :hasChoices='hasChoices',
            @commitmentClick='clickCommitment()'
          )
        paragraph.alert(
          fontSize='small',
          letterSpacing='none',
          v-show='errorFlag'
        ) * 来店日時は現在の日時以降に設定してください
  .submit-btn-wrapper
    nuxt-link.submit-btn-favorite(to='/favorite/?pl=res')
      paragraph-bold.submit-btn-favorite__title(
        color='dark_gray',
        fontSize='tiny',
        lineHeight='1'
      ) お気に入り
      favorite-icon.submit-btn-favorite__icon(v-if='!favoriteCheckFlag')
      favorite-check-icon.check-color(v-else)
    .submit-btn-search
      CTA-Button(
        text='レストランを検索',
        type='primary',
        fontSize='large',
        @click='search()'
      )
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import omit from 'lodash/omit'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography'
import { AreaTypes } from '~/types/areaTypes'
import { searchBoxRS } from '~/store/modules/search_store/index'
import { setUrlQuery, propertyFormat, initVisitProperty } from '~/plugins/util'
import AreaSelect from '~/components/molecules/select/AreaSelect.vue'
import CheckBox from '~/components/atoms/checkbox/CheckBox.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FavoriteIcon from '~/assets/icon/favorite.svg'
import FavoriteCheckIcon from '~/assets/icon/favorite-check.svg'
import InnerTitleRestaurantButton from '~/components/atoms/button/InnerTitleRestaurantButton.vue'
import LocationButton from '~/components/atoms/button/LocationButton.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import RestaurantSearch from '~/components/molecules/select/RestaurantSearch.vue'
import SelectRestaurantTop from '~/components/molecules/select/SelectRestaurantTop.vue'
import CommitmentButton from '~/components/atoms/button/CommitmentButton.vue'
@Component({
  components: {
    AreaSelect,
    CheckBox,
    CTAButton,
    CommitmentButton,
    FavoriteIcon,
    InnerTitleRestaurantButton,
    LocationButton,
    NotificationPop,
    Paragraph,
    ParagraphBold,
    RestaurantSearch,
    SelectRestaurantTop,
    FavoriteCheckIcon
  }
})
export default class RestaurantForm extends Vue {
  nowLoading = false
  isShowSearch = false
  isAlertPopShown = false
  date = ''
  time = ''
  people = 0
  isDatepickerShow = false
  errorFlag = false
  areaErrorFlag = false
  isLoading = true
  favoriteCheckFlag = false
  mounted() {
    setTimeout(() => {
      // ここでお知らせのactionトリガーを書く
      this.$store.dispatch('modules/notification/InitNotificationRS')
      this.$store.dispatch('modules/area/SearchBoxRS')
      // 初期化されていない場合は初期化してからvuexの値を参照する
      this.$store.dispatch('modules/search_store/setSearchBoxRS', initVisitProperty(this.searchBox))
      const { visitDate, visitTime, visitPeople } = this.searchBox

      this.date = visitDate
      this.time = visitTime
      this.people = visitPeople
      this.isLoading = false
      this.favoriteCheck()
    }, 0)
  }

  favoriteCheck() {
    if (this.isLogin !== true) {
      this.favoriteCheckFlag = this.$store.getters['modules/favorite/getLocalRestaurantFavorite'].length > 0
    } else {
      const databox = {
        dateUndecided: true
      }
      this.$store.dispatch('modules/favorite/IndexRestaurantFavorite', databox).then(() => {
        this.favoriteCheckFlag = this.$store.getters['modules/favorite/getRestaurants'].restorantStores.length > 0
      })
    }
  }

  get locationInfo() {
    return this.$store.getters['modules/user/getLocationInfo']
  }

  get searchBox() {
    return this.$store.getters['modules/search_store/getSearchBoxRS']
  }

  get whenever() {
    return this.$store.getters['modules/search_store/getWhenever']
  }

  set whenever(whenever) {
    this.$store.dispatch('modules/search_store/setWhenever', whenever)
    if (whenever) {
      this.errorFlag = false
    }
  }

  updateArea({ areaCd: suggestText }) {
    this.areaErrorFlag = false
    const suggestCd = suggestText ? 'AREA' : ''
    this.$store.dispatch('modules/search_store/setSearchBoxRS', {
      suggestText,
      suggestCd
    })
  }

  clickCommitment() {
    // モーダル
    this.isShowSearch = true
  }

  get areaList(): AreaTypes.SelectAreaTypes[] {
    return this.$store.getters['modules/area/getSearchBoxRS'].areas
      ? this.$store.getters['modules/area/getSearchBoxRS'].areas
      : []
  }

  @Watch('locationInfo')
  checks() {
    this.nowLoading = false
  }

  openDatepickerEvent() {
    this.isDatepickerShow = true
  }

  /**
   * datepickerを閉じるイベント
   */
  closeDatepicker() {
    this.isDatepickerShow = false
  }

  changeDate(date: string): void {
    this.whenever = false
    this.date = date
    this.$store.dispatch('modules/search_store/setSearchBoxRS', {
      visitDate: this.date
    })
  }

  changeTime(time: string): void {
    this.whenever = false
    this.time = time
    this.$store.dispatch('modules/search_store/setSearchBoxRS', {
      visitTime: this.time
    })
  }

  changePeople(people: string): void {
    this.whenever = false
    this.people = +people
    this.$store.dispatch('modules/search_store/setSearchBoxRS', {
      visitPeople: this.people
    })
  }

  updateQuery({ query }) {
    this.$store.dispatch('modules/search_store/setSearchBoxRS', propertyFormat(searchBoxRS, query))
  }

  closePop(): void {
    this.isAlertPopShown = false
  }

  dayFormatter(date): string {
    const newDate = new Date(date)
    const weeks = ['日', '月', '火', '水', '木', '金', '土']
    return (
      ('0' + (newDate.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + newDate.getDate()).slice(-2) +
      '(' +
      weeks[newDate.getDay()] +
      ')'
    )
  }

  search() {
    const areaSuggest = this.$store.getters['modules/search_store/getSearchBoxRS']
    if (!areaSuggest.suggestCd || !areaSuggest.suggestText) {
      this.areaErrorFlag = true
    } else {
      this.areaErrorFlag = false
    }
    const now = new Date()
    const selectDate = new Date(`${this.date.replace(/-/g, '/')} ${this.time}`) // 年月日の間に「ー」が入っているとsafariにエラー発生
    if (!this.whenever && now > selectDate) {
      this.errorFlag = true
    } else {
      this.errorFlag = false
    }
    if (!this.areaErrorFlag && !this.errorFlag) {
      this.$store.dispatch('modules/search_store/setSearchBoxRS', {
        page: null
      })
      const setURL = this.whenever ? omit(this.searchBox, ['visitDate', 'visitTime', 'visitPeople']) : this.searchBox
      this.$store.dispatch('modules/search_store/resetStoreSearch')
      this.$router.push({
        path: '/restaurant/search_result/',
        query: setUrlQuery(setURL)
      })
    }
  }

  async goMap() {
    await this.$router.push('/map/?pl=res')
  }

  get hasChoices() {
    const genre = this.$store.getters['modules/search_store/getSearchBoxRS']
    return genre.cookingGenreCd || genre.details || genre.lowerPrice || genre.upperPrice
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0 && this.userData.email !== ''
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }
}
</script>
<style lang="sass" scoped>
.restaurant-form
  padding: 0 8px
  margin: 0 auto
  border-radius: 4px
  background-color: $white
  .label
    font-size: 12px
    padding: 12px 0 0 8px
  .condition-wrapper
    .whenever-inner
      display: block
      .commitment
        display: none
    .container_top
      display: grid
      gap: 16px
      grid-row-gap: 8px
      grid-template-columns: 1fr max-content
      grid-template-rows: 52px 1fr
    .container_bottom
      margin-top: 8px
      .whenever-wrapper
        display: flex
        flex-direction: column
        padding-top: 8px
        .alert
          margin-top: 8px
          color: $error_color
  .submit-btn-wrapper
    display: grid
    grid-template-columns: max-content 1fr
    grid-gap: 8px
    margin-top: 16px
    .submit-btn-favorite
      display: flex
      flex-direction: column
      align-items: center
      &:hover
        .submit-btn-favorite__title
          color: $sub_color
        .submit-btn-favorite__icon
          fill: $sub_color
      &__title
      &__icon
        margin-top: 8px
        fill: $white
        stroke: $dark_gray
        stroke-width: 1.5px
@include pc_view
  .restaurant-form
    padding: 0 16px
    margin: 0 auto
    border-radius: 4px
    background-color: $white
    .label
      font-size: 12px
      padding: 16px 0 0 0
    .condition-wrapper
      display: grid
      grid-template-columns: 1fr 1fr
      grid-gap: 48px
      .container_top
        display: grid
        gap: 16px
        grid-row-gap: 8px
        grid-template-columns: 1fr max-content
        .location-button
          padding-top: 4px
      .container_bottom
        margin-top: 0
        .whenever-wrapper
          display: flex
          flex-direction: column
          padding-top: 8px
          .alert
            margin-top: 8px
            color: $error_color
    .submit-btn-wrapper
      display: grid
      grid-template-columns: max-content 322px
      grid-gap: 8px
      justify-content: center
      margin-top: 16px
      .submit-btn-favorite
        display: flex
        flex-direction: column
        align-items: center
        &:hover
          .submit-btn-favorite__title
            color: $sub_color
          .submit-btn-favorite__icon
            fill: $sub_color
        &__title
        &__icon
          margin-top: 8px
          fill: $white
          stroke: $dark_gray
          stroke-width: 1.5px
          width: 28px
@media screen and (max-width: 374px)
  .restaurant-form
    .condition-wrapper
      .whenever-inner
        display: flex
        justify-content: space-between
        align-items: flex-end
        .commitment
          display: block
</style>
