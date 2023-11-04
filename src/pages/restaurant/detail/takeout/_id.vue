<template lang="pug">
.container
  .otherspage
    full-loading(:isLoading='!restaurantDetail || loadFlag')
    template(v-if='restaurantDetail')
      .breadcrumbs
        nuxt-link.-text(:to='topUrl') TOP
      .detail
        h1.-storename(v-if='restaurantDetail.name') {{ restaurantDetail.name }}
        paragraph.storedetails(fontSize='tiny') {{ restaurantDetail.aliasName }}
        paragraph.genreText(fontSize='tiny') {{ genreText() }}
        paragraph.storedetails(fontSize='tiny') {{ restaurantDetail.access }}
      .priceList
        .priceList-daytime
          .icon-wrapper
            day-icon.-dayicon
          template(
            v-if='restaurantDetail.daytimeBudgetLowerLimit == null && restaurantDetail.daytimeBudgetLimit == null'
          )
            paragraph.pricesLunch(fontSize='tiny') {{ "---" }}
          template(
            v-else-if='restaurantDetail.daytimeBudgetLowerLimit && restaurantDetail.daytimeBudgetLimit == null'
          )
            paragraph.pricesLunch(fontSize='tiny') ¥{{ $moneyFormat(Number(restaurantDetail.daytimeBudgetLowerLimit)) }}～
          template(
            v-else-if='restaurantDetail.daytimeBudgetLowerLimit == null && restaurantDetail.daytimeBudgetLimit'
          )
            paragraph.pricesLunch(fontSize='tiny') ～¥{{ $moneyFormat(Number(restaurantDetail.daytimeBudgetLimit)) }}
          template(v-else)
            paragraph.pricesLunch(fontSize='tiny') ¥{{ $moneyFormat(Number(restaurantDetail.daytimeBudgetLowerLimit)) }}～¥{{ $moneyFormat(Number(restaurantDetail.daytimeBudgetLimit)) }}
        .priceList-nighttime
          .icon-wrapper
            night-icon.-nighticon
          template(
            v-if='restaurantDetail.nightBudgetLowerLimit == null && restaurantDetail.nightBudgetLimit == null'
          )
            paragraph.pricesLunch(fontSize='tiny') {{ "---" }}
          template(
            v-else-if='restaurantDetail.nightBudgetLowerLimit && restaurantDetail.nightBudgetLimit == null'
          )
            paragraph.pricesLunch(fontSize='tiny') ¥{{ $moneyFormat(Number(restaurantDetail.nightBudgetLowerLimit)) }}～
          template(
            v-else-if='restaurantDetail.nightBudgetLowerLimit == null && restaurantDetail.nightBudgetLimit'
          )
            paragraph.pricesLunch(fontSize='tiny') ～¥{{ $moneyFormat(Number(restaurantDetail.nightBudgetLimit)) }}
          template(v-else)
            paragraph.pricesLunch(fontSize='tiny') ¥{{ $moneyFormat(Number(restaurantDetail.nightBudgetLowerLimit)) }}～¥{{ $moneyFormat(Number(restaurantDetail.nightBudgetLimit)) }}
        button.circle_share(@click='locationFlag = true')
          share-icon.-shareicon
        button.circle_location(@click='clickMap')
          location-icon.-locationicon
        //- true(既にお気に入りされている時 -> お気に入り解除)
        template(v-if='$feature("phase1")')
          button.favo(
            v-if='iconCheck',
            @click='goodpush(restaurantDetail.id, "DELETE")'
          )
            favorite-icon.-favolocationicon.hert
          //- false(非お気に入り -> おきにいりに登録)
          button.favo(v-else, @click='goodpush(restaurantDetail.id, "REGIST")')
            favorite-icon.-favolocationicon
      .carousel(v-if='restaurantDetail.topImages')
        transition
          .favo-pop(v-show='popFlag')
            favorite-pop(:text='message')
        carousel-slider(
          v-if='restaurantDetail.topImages',
          :imageList='restaurantDetail.topImages'
        )
      //- コース詳細モーダル
      course-detail(
        :isShow='isShow',
        :maxPeople='maxPeople',
        :planId='planId',
        :visit-date='planSearch.visitDate',
        :visit-time='planSearch.visitTime',
        :visit-people='planSearch.visitPeople',
        @close-drawer='closeModal',
        @moved-page='movedPage'
      )
      .settings(v-if='!$feature("phase1")')
        no-ssr
          others-tab(
            v-if='$window.width > 767',
            fontSizeLeft='medium',
            typeLeft='white',
            textLeft='店舗TOP',
            fontSizeRight='medium',
            typeRight='secondary',
            textRight='プラン・テイクアウトを予約',
            :selected-tab='CurrentContents',
            @switching='current'
          )
          others-tab(
            v-else,
            fontSizeLeft='small',
            typeLeft='white',
            textLeft='店舗TOP',
            fontSizeRight='small',
            typeRight='secondary',
            textRight='プラン・テイクアウトを予約',
            :selected-tab='CurrentContents',
            @switching='current'
          )
        simple-tab#simpleTab(
          v-if='CurrentContents === 2',
          fontSizeLeft='small',
          typeLeft='white',
          textLeft='プラン',
          fontSizeRight='small',
          typeRight='white',
          textRight='テイクアウト',
          :selected-tab='CurrentTakeoutContents',
          :ComingSoon='!$feature("phase1")',
          @switching='currentTakeout'
        )
        three-tab(
          v-if='CurrentContents === 1',
          fontSize='small',
          type='white',
          textFirst='店舗情報',
          textSecound='クチコミ',
          textThird='写真',
          :selected-tab='CurrentTenpo',
          @switching='currentTenpo'
        )
      .settings.sticky(v-else)
        .fourth
          fourth-tab(
            fontSize='small',
            type='white',
            textFirst='店舗情報',
            textSecound='クチコミ',
            textThird='写真',
            textFourth='予約',
            :selected-tab='CurrentTenpo',
            @switching='currentTenpo'
          )
        .appType(v-show='CurrentTenpo === 4')
          two-switch-sub-tab(
            @switching='currentTakeout',
            textFirst='プラン',
            textSecond='テイクアウト',
            :ComingSoon='!$feature("phase1")',
            :selected-tab='CurrentTakeoutContents'
          )
      infomation.-content(
        v-if='(CurrentContents === 1 || $feature("phase1")) && CurrentTenpo === 1'
      )
      review-detail.-content.review(
        :reviews='reviews',
        :scroll-top='reviewScrollTop',
        v-if='(CurrentContents === 1 || $feature("review")) && CurrentTenpo === 2'
      )
      photograph.-content.picture(
        v-if='(CurrentContents === 1 || $feature("phase1")) && CurrentTenpo === 3'
      )
      .sidemenus(
        v-show='CurrentTakeoutContents === 2 && ((CurrentContents === 2 && !$feature("phase1")) || CurrentTenpo ===  4)'
      )
        .setsDateBox
          .container_bottom(
            v-show='CurrentTakeoutContents === 2 && ((CurrentContents === 2 && !$feature("phase1")) || CurrentTenpo ===  4)'
          )
            inner-title-restaurant-button.date(
              title='日付',
              @click='openDatepickerEvent',
              :value='pickUpDate'
            )
            calendar-icon.-icon
            .-picker
              date-picker(
                :is-show='isDatepickerShow',
                @update-dates='updateDateEvent',
                @close='closeDatepicker',
                :selected-start-date='sendDate'
              )
              clock-icon.-icon2
            select-restaurant#time(
              text='時間',
              @changehour='changetimeHour',
              @changemin='changetimeMin'
            )
        menu-list.child(:type='2', :storejudge='true')
      .planmenus(
        v-if='CurrentTakeoutContents === 1 && ((CurrentContents === 2 && !$feature("phase1")) || CurrentTenpo === 4)'
      )
        .plan-search-condition
          .plan-search-wrapper
            date-select(
              :selected-date='planSearch.visitDate',
              @change-date='updateDate'
            )
            time-button(
              :selected-time='planSearch.visitTime',
              :times='displayVacancyTime',
              :disabled='displayVacancyTime.length === 0',
              @change-time='updateTime'
            )
            people-select(
              :selected-people='planSearch.visitPeople',
              :peoples='displayHeadCount',
              :disabled='displayHeadCount.length === 0',
              @change-people='updatePeople'
            )
        .plan-list
          plan-restaurant(
            :loading='isPlanBlock',
            :restaurant-menu='planList && planList.restaurantMenu ? planList.restaurantMenu : []',
            @page-show='showModal',
            :maxPeople='maxPeople'
          )
      share-menu(@close='locationFlag = false', :isActive='locationFlag')
  .-footer(
    v-if='CurrentTakeoutContents === 2 && ((CurrentContents === 2 && !$feature("phase1")) || CurrentTenpo === 4)'
  )
    .inner
      .btn
        CTA-button-others(
          text='テイクアウトを注文',
          type='primary',
          fontSize='large',
          @click='pushOrder',
          :disabled='allPrice < 1'
        )
      .alerts(v-if='allPrice > 0 && priceshow')
        paragraph-bold.subtext 商品が追加されました（合計 ¥{{ $moneyFormat(Number(allPrice)) }})
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { format, add } from 'date-fns'
import ja from 'date-fns/locale/ja'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import { initVisitProperty } from '~/plugins/util'
import Access from '~/components/organisms/store/access.vue'
import CalendarIcon from '~/assets/icon/calendar.svg'
import CarouselSlider from '~/components/atoms/carousel/CarouselSlider.vue'
import ClockIcon from '~/assets/icon/clock.svg'
import CourseDetail from '~/components/organisms/menu/CourseDetail.vue'
import CTAButtonOthers from '~/components/atoms/button/CTAButtonOthers.vue'
import DatePicker from '~/components/atoms/form/DatePicker.vue'
import DateSelect from '~/components/molecules/select/DateSelect.vue'
import dayIcon from '~/assets/icon/day.svg'
import FavoriteIcon from '~/assets/icon/favorite.svg'
import FourthTab from '~/components/atoms/tab/FourthTab.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import FavoritePop from '~/components/molecules/tooltip/FavoritePop.vue'
import InfoButton from '~/assets/icon/info-button-fill.svg'
import Infomation from '~/components/organisms/store/infomation.vue'
import InnerTitleRestaurantButton from '~/components/atoms/button/InnerTitleRestaurantButton.vue'
import LocationIcon from '~/assets/icon/location.svg'
import MenuList from '~/components/organisms/menu/MenuList.vue'
import nightIcon from '~/assets/icon/night.svg'
import OthersTab from '~/components/atoms/tab/OthersTab.vue'
import Pagination from '~/components/molecules/pagination/Pagination.vue'
import PeopleSelect from '~/components/molecules/select/PeopleSelect.vue'
import Photograph from '~/components/organisms/store/photograph.vue'
import PlanRestaurant from '~/components/organisms/menu/PlanRestaurant.vue'
import ReviewDetail from '~/components/organisms/store/ReviewDetail.vue'
import SelectRestaurant from '~/components/molecules/select/SelectRestaurant.vue'
import ShareIcon from '~/assets/icon/share.svg'
import ShareMenu from '~/components/organisms/menu/ShareMenu.vue'
import SimpleTab from '~/components/atoms/tab/SimpleTab.vue'
import ThreeTab from '~/components/atoms/tab/ThreeTab.vue'
import TimeButton from '~/components/atoms/button/TimeButton.vue'
import TwoSwitchSubTab from '~/components/atoms/tab/TwoSwitchSubTab.vue'
import UserShapeIcon from '~/assets/icon/user-shape.svg'
import { StoreTypes } from '~/types/storeTypes'
import { RestaurantType } from '~/types/restaurantTypes'

@Component({
  components: {
    Access,
    CalendarIcon,
    CarouselSlider,
    ClockIcon,
    CourseDetail,
    CTAButtonOthers,
    DatePicker,
    DateSelect,
    dayIcon,
    FavoriteIcon,
    FourthTab,
    FullLoading,
    Heading,
    InfoButton,
    Infomation,
    InnerTitleRestaurantButton,
    LocationIcon,
    MenuList,
    nightIcon,
    OthersTab,
    Pagination,
    Paragraph,
    ParagraphBold,
    PeopleSelect,
    Photograph,
    PlanRestaurant,
    ReviewDetail,
    SelectRestaurant,
    ShareIcon,
    ShareMenu,
    SimpleTab,
    Span,
    SpanBold,
    ThreeTab,
    UserShapeIcon,
    TwoSwitchSubTab,
    TimeButton,
    FavoritePop
  }
})
export default class SidemenuIndex extends Vue {
  head() {
    return {
      title:
        this.appType !== 'take'
          ? ('『' + this.restaurantDetails?.name + '』' || '店舗') + 'を予約'
          : ('『' + this.restaurantDetails?.name + '』' || '店舗') + 'のテイクアウト・持ち帰りを予約',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.appType !== 'take'
              ? ('『' + this.restaurantDetails?.name + '』' || '店舗') +
              'を予約するならスカイチケット！近くの飲食店や、焼肉・イタリアン・中華・ハンバーガー・寿司・ステーキ・食べ放題・ご当地グルメなどの様々なジャンルの飲食店を掲載。テイクアウト可能なお店も。'
              : ('『' + this.restaurantDetails?.name + '』' || '店舗') +
              'のテイクアウト・持ち帰りを予約するならスカイチケットグルメ！多彩なメニューの中から選んで、事前に予約。お店ですぐに持ち帰り！地図や料理写真などの詳細情報も充実。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.appType !== 'take'
              ? ('『' + this.restaurantDetails?.name + '』' || '店舗') +
              'を予約するならスカイチケット！近くの飲食店や、焼肉・イタリアン・中華・ハンバーガー・寿司・ステーキ・食べ放題・ご当地グルメなどの様々なジャンルの飲食店を掲載。テイクアウト可能なお店も。'
              : ('『' + this.restaurantDetails?.name + '』' || '店舗') +
              'のテイクアウト・持ち帰りを予約するならスカイチケットグルメ！多彩なメニューの中から選んで、事前に予約。お店ですぐに持ち帰り！地図や料理写真などの詳細情報も充実。'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 8,
      headerTitle: 'グルメ'
    })
  }

  isDatepickerShow = false
  time = ''
  hour = this.nextTime
  min = '00'
  sendDate = this.todaySendDataGet
  pickUpDate = this.todayGet
  planSearch = { visitDate: '', visitTime: '', visitPeople: 0 } // プラン検索用
  isShow = false
  private locationFlag = false
  private CurrentContents = 1
  private CurrentTakeoutContents = this.$feature('phase1') ? 1 : 2
  private CurrentTenpo = 1
  private count = 0
  private isPlanBlock = true
  private message = ''
  private popFlag = false
  private setTimeId: null | ReturnType<typeof setTimeout> = null
  destroyedPage = false
  priceshow = false
  loadFlag = false
  isPreventUpdate = false
  favorite = false
  planId = 0
  topUrl = this.$feature('phase1') ? '/restaurant/' : '/takeout/'

  async asyncData({ store, route, app }) {
    const shopId = Number(route.params.id)
    // restaurant detail from store
    function restaurantDetail() {
      if (store.getters['modules/listStore/getStore'].name) {
        const data: StoreTypes.StoreDetail = store.getters['modules/listStore/getStore']
        return data
      }
    }
    // action
    await store.dispatch('modules/reservationGourmet/resetAllMenus')
    await store.dispatch('modules/listStore/InitStore', shopId)
    await store.dispatch('modules/listStore/InitImage', shopId)
    if (app.$feature('review')) {
      await store.dispatch('modules/listStore/InitReview', shopId)
    }
    const loadFlag = false
    const restaurantDetailData = restaurantDetail()

    // set component
    return {
      loadFlag,
      restaurantDetail: restaurantDetailData
    }
  }

  mounted() {
    setTimeout(() => {
      if (this.isLogin) {
        // ログイン情報があるか確認
        this.$store.dispatch('modules/user/getUserData')
      } else {
        // ログイン情報初期化
        this.$store.dispatch('modules/user/resetUserData')
      }
      this.planSearch = initVisitProperty(this.$store.getters['modules/search_store/getSearchBoxRS'])
      this.loadFlag = true
      this.$store.dispatch('modules/suggest_search/setSearchBoxSituation', {
        pickUpDate: this.sendDate,
        pickUpTime: this.gettime
      })
      this.pushMethod()
      this.restaurantMenu()
      this.loadFlag = false
      switch (this.appType) {
        case 'take':
          this.CurrentContents = 2
          this.CurrentTakeoutContents = 2
          if (this.$feature('phase1')) {
            this.CurrentTenpo = 4
          }
          this.topUrl = '/takeout/'
          break
        case 'plan':
          if (this.$feature('phase1')) {
            this.CurrentContents = 2
            this.CurrentTakeoutContents = 1
            this.CurrentTenpo = 4
            this.topUrl = '/restaurant/'
          }
          break
      }

      if (this.$route.query.tab !== undefined) {
        if (this.$route.query.tab === 'infos') {
          this.CurrentTenpo = 1
        } else if (this.$route.query.tab === 'reviews') {
          this.CurrentTenpo = 2
        } else if (this.$route.query.tab === 'photos') {
          this.CurrentTenpo = 3
        } else if (this.$route.query.tab === 'reservation') {
          this.CurrentTenpo = 4
        }
      }
    }, 0)
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }

  // 店舗TOP or プランテイクアウト
  current(isState: number): void {
    this.CurrentContents = isState
  }

  // プラン or テイクアウト
  currentTakeout(isState: number): void {
    this.CurrentTakeoutContents = isState
  }

  // 店舗情報 or クチコミ or 写真
  currentTenpo(isState: number): void {
    this.CurrentTenpo = isState
  }

  openDatepickerEvent() {
    this.isDatepickerShow = true
  }

  goodpush(storeId: number, flag: string) {
    this.favorite = !this.favorite
    const sendData = {
      judge: this.isLogin,
      id: storeId,
      appCd: 'RS'
    }
    if (flag === 'REGIST') {
      if (this.$store.getters['modules/favorite/getLocalRestaurantFavorite'].length > 99) {
        this.message = 'お気に入りの登録数が上限に達しているため、登録数を減らしてから再登録してください'
        this.timeOut()
        return
      }
      this.$store.dispatch('modules/listStore/setIsFavorite')
      this.$store
        .dispatch('modules/favorite/RegistFavorite', sendData)
        .then(() => {
          // 会員の場合はサーバーレスポンスで登録上限のバリデーションメッセージを取得する
          // eslint-disable-next-line prettier/prettier
          const res = this.$store.getters['modules/favorite/getRegistrationResponse']
          if (this.isLogin && !res.status) {
            this.$store.dispatch('modules/listStore/setIsNotFavorite')
            this.message = res.message
            this.timeOut()
          } else {
            this.message = 'お気に入りに追加しました'
            this.timeOut()
          }
        })
        .catch(() => {
          // ここで失敗したらハートの色を戻す
          this.$store.dispatch('modules/listStore/setIsNotFavorite')
          this.message = 'お気に入り登録に失敗しました。時間を置いてから再度お試しください'
          this.timeOut()
        })
    } else {
      this.$store.dispatch('modules/listStore/setIsNotFavorite')
      this.$store
        .dispatch('modules/favorite/DeleteFavorite', sendData)
        .then(() => {
          this.message = 'お気に入りを解除しました'
          this.timeOut()
        })
        .catch(() => {
          // ここで失敗したらハートの色を戻す
          this.$store.dispatch('modules/listStore/setIsFavorite')
          this.message = 'お気に入り登録に失敗しました。時間を置いてから再度お試しください'
          this.timeOut()
        })
    }
  }

  // 3秒後にお気に入り登録削除のトーストを消す
  timeOut() {
    this.popFlag = true
    clearTimeout(Number(this.setTimeId))
    const timeOutId = setTimeout(() => {
      this.popFlag = false
    }, 3000)
    this.setTimeId = timeOutId
  }

  get restaurantDetails() {
    if (this.$store.getters['modules/listStore/getStore'].name) {
      const data: StoreTypes.StoreDetail = this.$store.getters['modules/listStore/getStore']
      return data
    }
  }

  closeModal() {
    this.isPreventUpdate = false
    this.isShow = false
    this.planId = 0
  }

  showModal(_planId) {
    this.isPreventUpdate = true
    this.isShow = true
    this.planId = _planId
  }

  genreText(): string | void {
    const genreBox = this.restaurantDetails?.storeGenres
    let textdata = ''
    let count = 0
    if (!genreBox) {
      location.href = '/gourmet/takeout/'
    } else {
      for (let i = 0; i < genreBox.length; i++) {
        if (genreBox[i].path.startsWith('/b-cooking')) {
          if (count === 0) {
            textdata = textdata + genreBox[i].name
          } else {
            textdata = textdata + '/' + genreBox[i].name
          }
          count++
        }
        return textdata
      }
    }
  }

  reviewScrollTop() {
    window.scrollTo(0, 500)
  }

  get iconCheck(): boolean {
    const storeData: StoreTypes.StoreDetail = this.$store.getters['modules/listStore/getStore']
    if (this.isLogin) {
      return storeData.isFavorite
    } else {
      const array: number[] = this.$store.getters['modules/favorite/getLocalRestaurantFavorite']
      return array.includes(storeData.id)
    }
  }

  // Stockの最大人数
  get maxPeople() {
    let maxPeople = 0
    if (typeof this.planList?.stocks !== 'undefined' && this.planList.stocks.length > 0) {
      const peopleUniq: RestaurantType.RestaurantStock[] = uniqBy(this.planList.stocks, 'people')
      peopleUniq.forEach((stock) => {
        if (stock.people > maxPeople) {
          maxPeople = stock.people
        }
      })
      return maxPeople
    }
  }

  /**
   * 予約関連データ呼び出し
   */
  get planList(): RestaurantType.RestaurantPlanStatus | undefined {
    if (this.$store.getters['modules/plan/getPlan']) {
      const data: RestaurantType.RestaurantPlanStatus = this.$store.getters['modules/plan/getPlan']
      return data
    }
  }

  /**
   * 取得した時間を重複を削除しソートして返す
   */
  get displayVacancyTime() {
    if (this.planList?.stocks) {
      const stocks = this.planList.stocks
      const vacancyTimes = uniq(stocks.map((stock) => stock.vacancyTime)).sort()
      if (vacancyTimes.length && !vacancyTimes.includes(this.planSearch.visitTime)) {
        this.planSearch = Object.assign({}, this.planSearch, {
          visitTime: vacancyTimes[0]
        })
      }
      return vacancyTimes
    }
    return []
  }

  /**
   * 取得した人数を重複を削除しソートして返す
   */
  get displayHeadCount() {
    if (this.planList?.stocks) {
      const stocks = this.planList.stocks
      const headCount: number[] = uniq(stocks.map((stock) => Number(stock.people))).sort(
        (a: number, b: number) => a - b
      )
      if (headCount.length && !headCount.includes(this.planSearch.visitPeople)) {
        this.planSearch = Object.assign({}, this.planSearch, {
          visitPeople: headCount[0]
        })
      }
      return headCount
    }
    return []
  }

  get allPrice() {
    let prices = 0
    const menus = this.$store.getters['modules/reservationGourmet/getMenu']
    if (!menus) {
      location.href = '/gourmet/takeout/'
    }
    for (let i = 0; i < menus.length; i++) {
      let options = 0
      for (let j = 0; j < menus[i].options.length; j++) {
        if (Array.isArray(menus[i].options[j])) {
          for (let k = 0; k < menus[i].options[j].length; k++) {
            options = options + menus[i].options[j][k].price
          }
        } else {
          options = options + Number(menus[i].options[j].price)
        }
      }
      prices = prices + menus[i].menu.price * menus[i].menu.count + options * menus[i].menu.count
    }
    return prices
  }

  get reviews() {
    return this.$store.getters['modules/listStore/getReview']
  }

  /**
   * datepickerを閉じるイベント
   */
  closeDatepicker() {
    this.isDatepickerShow = false
  }

  /**
   * カレンダーからdateの更新
   */
  updateDateEvent(val) {
    this.pickUpDate = val.startDate
    this.sendDate = val.metaDate
    this.closeDatepicker()
    this.loadFlag = true
    this.pushMethod()
  }

  clickMap() {
    this.$router.push('/store/access/' + Number(this.$route.params.id))
  }

  changetimeHour(val: string): void {
    this.loadFlag = true
    this.hour = val
    this.pushMethod()
    // ここで叩く
  }

  changetimeMin(val: string): void {
    this.loadFlag = true
    this.min = val
    this.pushMethod()
    // ここで叩く
  }

  updateDate(visitDate) {
    this.planSearch = Object.assign({}, this.planSearch, { visitDate })
    this.restaurantMenu()
  }

  updateTime(visitTime) {
    this.planSearch = Object.assign({}, this.planSearch, { visitTime })
    this.restaurantMenu()
  }

  updatePeople(visitPeople) {
    this.planSearch = Object.assign({}, this.planSearch, { visitPeople })
    this.restaurantMenu()
  }

  get appType() {
    return this.$route.query.type
  }

  get gettime() {
    return this.hour + ':' + this.min
  }

  get nextTime() {
    const data = add(new Date(), { hours: 2 })
    return format(data, 'HH', { locale: ja })
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
    const date = add(new Date(), { hours: 2 })
    return format(date, 'yyyy-MM-dd', { locale: ja })
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

  async pushMethod() {
    const databox = {
      id: Number(this.$route.params.id),
      pickUpDate: this.sendDate,
      pickUpTime: this.gettime,
      year: new Date().getFullYear()
    }
    // 変更した時間をstateに保存
    await setTimeout(() => {
      this.$store.dispatch('modules/reservationGourmet/setTimeData', databox)
    }, 0)
    this.$store.dispatch('modules/suggest_search/setSearchBoxSituation', {
      pickUpDate: this.sendDate,
      pickUpTime: this.gettime
    })
    await this.$store.dispatch('modules/listStore/InitTakeoutMenu', databox)
    await this.$store.dispatch('modules/reservationGourmet/resetAllMenus')
    this.priceshow = true
    this.loadFlag = false
  }

  // plan初期化防止
  movedPage() {
    this.destroyedPage = true
  }

  async restaurantMenu() {
    if (!this.$feature('phase1')) {
      return
    }
    this.isPlanBlock = true
    const databox = {
      id: Number(this.$route.params.id),
      ...this.planSearch,
      dateUndecided: false // 日付未定の実装がされたら変動させる
    }
    this.$store.dispatch('modules/date/dateSetAction', databox.visitDate)
    await this.$store.dispatch('modules/plan/InitPlan', databox)
    this.isPlanBlock = false
  }

  pushOrder() {
    this.$store.dispatch('modules/common/setAppCd', 'TO')
    this.$router.push('/reservation/input_form')
  }

  beforeDestroy() {
    this.$store.dispatch('modules/plan/ResetPlan')
    this.movedPage()
  }
}
</script>
<style lang="sass" scoped>
.container
  max-width: none
  min-width: none
.page
  padding: 0 !important
  min-height: 0 !important
.otherspage
  min-width: 320px
  .-storename
    font-size: 18px
    line-height: 1.6
  .storedetails
    white-space: pre-line
  .breadcrumbs
    margin: 10px 0
    font-size: 14px
    .sectionLast
      margin: 5px calc(50% - 50vw)
      height: 1px
      background-color: #e4e4e4
    .-text
      margin-left: 16px
    .-text:hover
      opacity: 0.6
  .detail
    margin: 0 16px
    position: relative
    .genreText
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 1
      overflow: hidden
  .priceList
    position: relative
    margin: 0 16px
    .priceList-daytime
      display: flex
      align-items: center
    .priceList-nighttime
      display: flex
      align-items: center
    .pricesLunch
      padding-left: 4px
    .pricesNight
      padding-left: 4px
    .circle_share
      position: absolute
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 40px
      height: 40px
      outline: none
      margin: 3px
      top: 0
      right: 0%
      .-shareicon
        width: 20px
        height: 20px
        fill: $spare_gray
    .circle_location
      position: absolute
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 40px
      height: 40px
      outline: none
      margin: 3px
      top: 0
      right: 0%
      margin-right: 50px
      display: flex
      justify-content: center
      align-items: center
      .-locationicon
        width: 23px
        height: 23px
        fill: $spare_gray
    .favo
      position: absolute
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 40px
      height: 40px
      outline: none
      margin: 3px
      top: 0
      right: 0%
      cursor: pointer
      margin-right: 95px !important
      &:hover
        opacity: 0.6
      .-favolocationicon
        fill: $spare_gray
        width: 27px
        height: 27px
        position: absolute
        top: 25%
        left: 9px
      .hert
        fill: #ff7683 !important
        stroke: $white
    .-dayicon
      width: 12px
      height: 12px
    .-nighticon
      width: 12px
      height: 12px
    .-nighticonPosition2
      margin-left: 62px
      position: absolute
      top: 15%
      left: 0%
      width: 15px
  .-content
    margin-top: 20px
  .picture
    width: 100vw
    margin: 0px calc(50% - 50vw)
  .review
    padding: 0 16px 20px
  .carousel
    margin: 0px auto
    padding: 16px 0
    width: 100vw
    margin: 0px calc(50% - 50vw)
    position: relative
    .favo-pop
      position: absolute
      background-color: $black
      width: 100%
      opacity: 0.8
      z-index: 3
      color: $white
      text-align: center
      top: 37%
      padding: 16px
    .v-enter-active
      transition: opacity 1s
    .v-enter
      opacity: 0
    .v-enter-to
      opacity: 0.8
    .v-leave-active
      transition: opacity 1.3s
    .v-leave
      opacity: 0.8
    .v-leave-to
      opacity: 0
  .settings
    background-color: $light_gray
    width: 100vw
    margin: 0px calc(50% - 50vw)
    #simpleTab
      margin: -15px 0
    .fourth
      padding: 16px 0
  .sticky
    position: sticky
    top: 0
    z-index: 1
  .sidemenus
    margin-bottom: 40px
    .setsDateBox
      background-color: $light_gray
      width: 100vw
      height: 70px
      margin: 0px calc(50% - 50vw)
      margin-bottom: 16px
      .child
        // padding-bottom: 20px
        margin-top: 30px
        // min-height: 300px
      .container_bottom
        display: flex
        position: relative
        width: 320px
        margin: 0 auto
        background-color: $light_gray
        .date
          width: 60%
          margin-left: 20px
          background-color: $light_gray
          &:hover
            cursor: pointer
        #time
          width: 40%
          margin-right: 30px
          background-color: $light_gray
          &:hover
            cursor: pointer
        .-icon
          position: absolute
          margin-left: 20px
          top: 16px
          left: 0%
          width: 20px
          height: 26px
          fill: $dark_gray
        .-picker
          position: relative
          .-icon2
            position: absolute
            top: 16px
            width: 20px
            height: 26px
            fill: $dark_gray
  .-pagination
    margin: 0 auto
    padding-bottom: 100px
  .planmenus
    .plan-search-condition
      display: grid
      justify-content: center
      background-color: $light_gray
      padding: 8px 16px 16px 16px
      .plan-search-wrapper
        max-width: 400px
        display: grid
        grid-template-columns: max-content max-content max-content
        gap: 16px
        margin-top: 6px
        border-bottom: 1px solid rgba(0, 0, 0, 0.3)
    .plan-list
      min-height: 20vh
  .-pagination
    margin: 0 auto
    padding-bottom: 100px
.-footer
  position: sticky
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  bottom: 0
  width: 100%
  padding: 16px 0
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.24)
  background-color: white
  z-index: 1000
  .inner
    width: 100%
    .btn
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      width: 80%
      margin: 0 auto
    .alerts
      position: relative
      margin-top: 4px
      .subtext
        text-align: center
        color: #1c5db5
        padding-left: 20px
      .infotext
        fill: #1c5db5
        position: absolute
        top: -25%
        left: 10%
        width: 15px
@include pc_view
  .page
    min-height: 100vh
  .otherspage
    max-width: 1024px
    min-width: 768px
    margin: 0 auto
    .-storename
      font-size: 32px
    .storedetails
      white-space: pre-line
      font-size: 14px
    .settings
      background-color: $light_gray
      width: 100%
      margin: 0px auto
    .sidemenus
      margin-bottom: 40px
      .setsDateBox
        background-color: $light_gray
        width: 100%
        height: 70px
        margin: 0px auto
    .picture
      width: 100%
      margin: 0px auto
    .planmenus
      .plan-search-condition :deep()
        padding: 8px 0 24px
        .select-restaurant-top
          min-width: 400px
    .carousel
      margin: 0px auto
      padding: 16px 0
      width: 100%
      margin: 0px auto
    .graph
      width: 50%
    .-pagination
      width: 30%
      margin: 0 auto
      margin-top: 24px
      padding-bottom: 132px
    .child
      // padding-bottom: 20px
      margin-top: 30px
      // min-height: 300px
    .alerts
      position: relative
      .subtext
        text-align: center
        margin-bottom: 10px
        color: #1c5db5
        padding-left: 5px
      .infotext
        fill: #1c5db5
        position: absolute
        top: -25%
        left: 39% !important
        width: 15px
    .detail
      margin: 0 10px
      position: relative
    .priceList
      display: flex
      margin: 0 10px
      .priceList-nighttime
        margin-left: 16px
      .circle_share
        position: absolute
        border-radius: 50%
        background-color: white
        border: solid 1px #e4e4e4
        width: 40px
        height: 40px
        outline: none
        margin: 3px
        top: -100%
        right: 0%
        display: flex
        justify-content: center
        align-items: center
        .-shareicon
          width: 20px
          height: 20px
          fill: $spare_gray
      .circle_share:hover
        opacity: 0.6
        cursor: pointer
      .circle_location
        position: absolute
        border-radius: 50%
        background-color: white
        border: solid 1px #e4e4e4
        width: 40px
        height: 40px
        outline: none
        margin: 3px
        top: -100%
        right: 0%
        margin-right: 50px
        display: flex
        justify-content: center
        align-items: center
        .-locationicon
          width: 23px
          height: 23px
          fill: $spare_gray
      .favo
        position: absolute
        border-radius: 50%
        background-color: white
        border: solid 1px #e4e4e4
        width: 40px
        height: 40px
        outline: none
        margin: 3px
        top: -100%
        right: 0%
        margin-right: 95px !important
        .-favolocationicon
          width: 27px
          height: 27px
          position: absolute
          top: 25%
          left: 9px
          cursor: pointer
      .circle_location:hover
        opacity: 0.6
        cursor: pointer
  .-footer
    position: sticky
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 16px 0
    bottom: 0
    width: 100%
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.24)
    background-color: white
    z-index: 1000
    .inner
      width: 100%
      .btn
        text-align: center
        width: 80%
        margin: 0 auto
      .alerts
        position: relative
        margin-top: 4px
        .subtext
          text-align: center
          color: #1c5db5
          padding-left: 20px
        .infotext
          fill: #1c5db5
          position: absolute
          top: -25%
          left: 10%
          width: 15px
</style>
