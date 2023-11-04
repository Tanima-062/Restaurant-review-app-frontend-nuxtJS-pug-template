<template lang="pug">
.myfavorite
  .flexbutton
    button.tops(
      @click='favFlag = $feature("phase1") ? 1 : 2',
      :class='[favFlag === 1 ? "nowColor" : "", $feature("phase1") ? "" : "comingsoon"]',
      fontSize='big',
      :disable='$feature("phase1")'
    ) レストラン <br>
      Span(v-if='$feature("phase1")', fontSize='small') （{{ favoriteRestaurantLength }}件）
      Span.comingsoon(v-else, fontSize='small') Coming Soon!
    button.tops(
      @click='favFlag = 2',
      :class='[favFlag === 2 ? "nowColor" : ""]',
      fontSize='big'
    ) テイクアウト <br>
      Span(fontSize='small') （{{ favoriteTakeoutLength }}件）
  no-ssr
    hr.sectionLast(v-if='$window.width > 767')
  //- レストラン用の日時指定
  .container_bottom.restaurant-wrap(v-if='favFlag === 1')
    select-restaurant-top(
      :visChoice='false',
      :selected-date='restaurantSendDate',
      :selected-time='restaurantTime',
      :selected-people='restaurantPeople',
      :isLoading='isLoading',
      :inactive='whenever',
      @change-date='updateDateEvent($event, "RS")',
      @change-time='changeTime',
      @change-people='changePeople'
    )
    .check-wrapper
      check-box.check(v-model='whenever') 日付未定
  //- テイクアウト用の日時指定
  .container_bottom.take-wrap(v-if='favFlag === 2')
    inner-title-restaurant-button#date.takeout(
      title='日付',
      @click='openDatepickerEvent',
      :value='takeoutDate'
    )
    calendar-icon.-icon2
    .-picker
      date-picker(
        :is-show='isDatepickerShow',
        @update-dates='updateDateEvent($event, "TO")',
        @close='closeDatepicker',
        :selected-start-date='takeoutSendDate'
      )
      clock-icon.-icon
    select-restaurant#time.takeout(
      text='時間',
      :value='time',
      @changehour='changehour($event)',
      @changemin='changemin($event)'
    )
  api-loading(:loading='apiFlag', v-if='favFlag === 2')
  child-block(
    :type='1',
    :isFavorite='true',
    v-if='favFlag === 2 && !apiFlag',
    :date='takeoutSendDate',
    :time='gettime',
    :favoriteMenus='displayFavoriteMenus'
  )
  api-loading(:loading='resApiFlag', v-if='favFlag === 1')
  favorite-restaurant(
    v-if='favFlag === 1 && !resApiFlag',
    :favoriteRestaurant='displayFavoriteRestaurant'
  )
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { format, add } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import { initVisitProperty } from '~/plugins/util'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
import ArrowIcon from '~/assets/icon/arrow.svg'
import CalendarIcon from '~/assets/icon/calendar.svg'
import CheckBox from '~/components/atoms/checkbox/CheckBox.vue'
import ChildBlock from '~/components/atoms/overlay/ChildBlock.vue'
import ClockIcon from '~/assets/icon/clock.svg'
import DatePicker from '~/components/atoms/form/DatePicker.vue'
import FavoriteRestaurant from '~/components/atoms/overlay/FavoriteRestaurant.vue'
import InnerTitleRestaurantButton from '~/components/atoms/button/InnerTitleRestaurantButton.vue'
import SelectRestaurant from '~/components/molecules/select/SelectRestaurant.vue'
import SelectRestaurantTop from '~/components/molecules/select/SelectRestaurantTop.vue'
import TimeButton from '~/components/atoms/button/TimeButton.vue'
@Component({
  components: {
    ApiLoading,
    ArrowIcon,
    CalendarIcon,
    CheckBox,
    ChildBlock,
    ClockIcon,
    DatePicker,
    FavoriteRestaurant,
    Heading,
    InnerTitleRestaurantButton,
    Paragraph,
    ParagraphBold,
    SelectRestaurant,
    SelectRestaurantTop,
    Span,
    SpanBold,
    TimeButton
  }
})
export default class FavoriteIndex extends Vue {
  head() {
    return {
      title: 'グルメ/お気に入り',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store, query }) {
    if (query.pl) {
      store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 3,
        returnPath: '/restaurant',
        headerTitle: 'グルメ/お気に入り'
      })
    } else {
      store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 3,
        returnPath: '/takeout',
        headerTitle: 'グルメ/お気に入り'
      })
    }
  }

  apiFlag = true
  resApiFlag = true
  isDatepickerShow = false
  favFlag = 2
  hour = this.nextTime
  takeoutDate = this.todayGet
  takeoutSendDate = this.todaySendDataGet
  restaurantSendDate = ''
  time = 1
  min = '00'
  restaurantPeople = 0
  restaurantTime = ''
  isLoading = true
  whenever = true

  mounted(): void {
    const pl = this.$route.query.pl
    if (pl === 'res') {
      this.favFlag = 1
    }
    setTimeout(() => {
      const { visitDate, visitTime, visitPeople } = initVisitProperty(this.searchBox)
      // 以下はレストランのお気に入り条件指定に入れるデータの初期値
      this.restaurantPeople = visitPeople
      this.restaurantTime = visitTime
      this.restaurantSendDate = visitDate
      this.isLoading = false
      this.pushMethod()
      if (this.$feature('phase1')) {
        this.pushRestaurantMethod()
      }
    }, 0)
  }

  /**
   * 日付未定チェック有無
   */
  @Watch('whenever')
  changeOptionRequest() {
    this.pushRestaurantMethod()
  }

  /**
   * テイクアウト情報更新
   */
  pushMethod() {
    if (this.isLogin !== true) {
      if (this.localTakeout) {
        const databox = {
          pickUpDate: this.takeoutSendDate,
          pickUpTime: this.gettime,
          menuIds: this.localTakeout.join(','),
          appCd: 'TO'
        }
        this.apiFlag = true
        this.$store.dispatch('modules/favorite/IndexFavorite', databox).then(() => {
          this.apiFlag = false
        })
      } else {
        this.apiFlag = false
      }
    } else {
      const databox = {
        pickUpDate: this.takeoutSendDate,
        pickUpTime: this.gettime,
        appCd: 'TO'
      }
      this.apiFlag = true
      this.$store.dispatch('modules/favorite/IndexFavorite', databox).then(() => {
        this.apiFlag = false
      })
    }
  }

  /**
   * レストラン情報更新
   */
  pushRestaurantMethod() {
    if (this.isLogin !== true) {
      const databox = {
        storeIds: this.localRestaurant,
        appCd: 'RS',
        dateUndecided: this.whenever
      }
      if (!this.whenever) {
        const optionData = {
          pickUpDate: this.restaurantSendDate,
          pickUpTime: this.restaurantTime,
          visitPeople: this.restaurantPeople
        }
        Object.assign(databox, optionData)
      }
      this.resApiFlag = true
      this.$store.dispatch('modules/favorite/IndexRestaurantFavorite', databox).then(() => {
        this.resApiFlag = false
      })
    } else {
      const databox = {
        dateUndecided: this.whenever,
        appCd: 'RS'
      }
      if (!this.whenever) {
        const optionData = {
          pickUpDate: this.restaurantSendDate,
          pickUpTime: this.restaurantTime,
          visitPeople: this.restaurantPeople
        }
        Object.assign(databox, optionData)
      }
      this.resApiFlag = true
      this.$store.dispatch('modules/favorite/IndexRestaurantFavorite', databox).then(() => {
        this.resApiFlag = false
      })
    }
  }

  openDatepickerEvent(): void {
    this.isDatepickerShow = true
  }

  /**
   * datepickerを閉じるイベント
   */
  closeDatepicker(): void {
    this.isDatepickerShow = false
    if (this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus) {
      //
    }
  }

  /**
   * カレンダーからdateの更新
   */
  updateDateEvent(val, code) {
    if (code === 'TO') {
      this.takeoutDate = val.startDate
      this.takeoutSendDate = val.metaDate
      this.pushMethod()
    } else {
      this.restaurantSendDate = val
      this.pushRestaurantMethod()
    }
    this.whenever = false
    this.closeDatepicker()
  }

  changeTime(time) {
    this.whenever = false
    this.restaurantTime = time
    this.pushRestaurantMethod()
  }

  changePeople(val) {
    this.whenever = false
    this.restaurantPeople = val
    this.pushRestaurantMethod()
  }

  changehour(val) {
    this.hour = val
    if (this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus) {
      //
    }
    this.pushMethod()
  }

  changemin(val) {
    this.min = val
    if (this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus) {
      //
    }
    this.pushMethod()
  }

  reset() {
    this.whenever = false
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

  get localRestaurant() {
    if (this.$store.getters['modules/favorite/getLocalRestaurantFavorite'].length > 0) {
      return this.$store.getters['modules/favorite/getLocalRestaurantFavorite'].join(',') // ローカルを取り出す
    }
  }

  get localTakeout() {
    if (this.$store.getters['modules/favorite/getLocalFavorite'].length > 0) {
      return this.$store.getters['modules/favorite/getLocalFavorite'] // ローカルを取り出す
    }
  }

  get searchBox() {
    return this.$store.getters['modules/search_store/getSearchBoxRS']
  }

  get favoriteRestaurantLength() {
    if (Object.keys(this.favoriteRestaurant).length) {
      return this.favoriteRestaurant.length
    }
    return 0
  }

  get displayFavoriteRestaurant() {
    if (Object.keys(this.favoriteRestaurant).length) {
      return this.$store.getters['modules/favorite/getRestaurants'].restorantStores
    } else {
      return []
    }
  }

  get favoriteRestaurant() {
    return this.$store.getters['modules/favorite/getRestaurants'].restorantStores
      ? this.$store.getters['modules/favorite/getRestaurants'].restorantStores
      : {}
  }

  get todayGet() {
    // vuexのデータがあった場合は、その日付データを優先的に取得する
    const selectedDate = this.$store.getters['modules/date/getDate']
    if (selectedDate === '' || null || undefined) {
      const date = add(new Date(), { hours: 2 })
      return format(date, 'MM/dd (eee)', { locale: ja })
    } else {
      return this.dayFormatter(selectedDate)
    }
  }

  get todaySendDataGet() {
    const selectedDate = this.$store.getters['modules/date/getDate']
    if (selectedDate === '' || null || undefined) {
      const date = add(new Date(), { hours: 2 })
      return format(date, 'yyyy-MM-dd', { locale: ja })
    } else {
      return selectedDate
    }
  }

  get nextTime() {
    const data = add(new Date(), { hours: 2 })
    return format(data, 'HH', { locale: ja })
  }

  get gettime() {
    return this.hour + ':' + this.min
  }

  get favoriteTakeoutLength() {
    if (this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus) {
      this.apiFlag = false
      return this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus.length
    } else {
      return 0
    }
  }

  get displayFavoriteMenus() {
    if (Object.keys(this.favoriteTakeout).length) {
      return this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus
    } else {
      return []
    }
  }

  get favoriteTakeout() {
    return this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus
      ? this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus
      : {}
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
.myfavorite
  padding: 20px
  .sectionLast
    width: 70%
    margin: 0px auto
    margin-top: -2px
    height: 1px
    background-color: #a6a6a6
.flexbutton
  display: flex
  .tops
    outline: none
    font-family: HiraKakuPro-W3
    font-size: 16px
    font-weight: normal
    position: relative
    display: block
    width: 50%
    height: 60px
    padding: 0.5em
    text-align: center
    background-color: white
    border: none
    border-bottom: solid 1px $dark_gray
    text-decoration: none
    &:hover
      @include pc_view
        cursor: pointer
        //TODO: 本番環境でレストランがリリースされるまでホバー機能を一旦、保留。レストランリリース後にホバー機能を解禁
        // opacity: 0.6
  .nowColor
    border-bottom: solid 3px $sub_color
    color: $sub_color
  .comingsoon
    color: $gray
.take-wrap
  display: flex
.container_bottom
  padding-top: 12px
  padding-bottom: 16px
  justify-content: center
  position: relative
  width: 100%
  margin: 0 auto
  #date
    width: 30%
    margin-left: 20px
  #time
    width: 30%
  .takeout
    justify-content: center
    width: 50% !important
  .-picker
    position: relative
    .-icon
      position: absolute
      top: 30%
      width: 20px
      height: 26px
      fill: $dark_gray
  .-icon2
    position: absolute
    top: 30%
    left: 20px
    width: 20px
    height: 26px
    fill: $dark_gray
.check-wrapper
  padding-top: 15px
  margin-left: 8px
  white-space: nowrap
  .check
    transform: scale(1.2)
@include pc_view
  .flexbutton
    width: 100%
    margin: 0 auto
  .container_bottom
    width: 50%
    padding-top: 16px
    padding-bottom: 32px
  .restaurant-wrap
    display: flex
    align-items: center
  .check-wrapper
    width: 30%
    padding-top: 15px
    margin-left: 15px
    .check
      transform: scale(1)
</style>
