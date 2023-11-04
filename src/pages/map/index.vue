<template lang="pug">
.mapsPage
  full-loading(:isLoading='nowLoading')
  geo-location(v-if='geoLocFlag', @denied='denied', @setLocation='setloc')
  notification-pop(
    :isShown='isAlertPopShown',
    :type='poptype',
    position='right',
    icon='warning',
    @closePop='closePop'
  )
    template
      | {{ alertMessage }}
  no-ssr
    .map-wrapper
      .map-info(v-if='$window.width > 1024')
        template(v-if='storeResponse')
          .map-store-wrapper
            paragraph.no-show(v-show='storeResponse.sumCount === 0') お近くの店舗は見つかりませんでした
            .map-store(
              v-for='(storeData, index) in storeResponse.stores',
              @mouseover='listMouseOver(index, { lat: storeData.latitude, lng: storeData.longitude })',
              @click='goDetail(storeData.id)'
            )
              .map-flex
                img.map-store__img(
                  v-if='(storeData.storeImage.imageUrl && !isTakeout) || (storeData.storeImage.imageUrl && storeData.openinghours && storeClosed(storeData.openinghours))',
                  :src='storeData.storeImage.imageUrl + "?imwidth=130&imdensity=1"',
                  width='130'
                )
                .-overlay(
                  v-else-if='isTakeout && storeData.openinghours && !storeClosed(storeData.openinghours)'
                )
                  //- 画幅をCSSではなくHTMLで直接修正する事で、画像のサイズが大きい場合で生じる崩れを防ぐ
                  img.-img(
                    v-if='storeData.storeImage.imageUrl',
                    :src='storeData.storeImage.imageUrl + "?imwidth=130&imdensity=1"',
                    width='130'
                  )
                  no-image.-img(v-else, size='xs')
                  .-onText(v-if='isTakeout')
                    paragraph(fontSize='tiny', color='white', v-if='') {{ onImageText(storeData.openinghours) }}
                no-image.map-store__img(v-else, size='xs')
                .map-store__description
                  .map-store__description-top
                    paragraph-bold.map-store__description-top-title.shrink(
                      fontSize='small'
                    ) {{ storeData.name }}
                  .map-store__description-middle
                    paragraph.genre(fontSize='tiny') {{ genreText(storeData.storeGenres) }}
                    template(v-if='storeData.distance !== null || undefined')
                      paragraph.map-store__description-middle-info(
                        fontSize='tiny'
                      ) {{ $distanceFormat(storeData.distance) }}
                  .map-store__description-bottom(v-if='isTakeout')
                    .-price(v-if='storeData.priceLevel')
                      .price-level(v-for='n of 4')
                        paragraph(
                          fontSize='tiny',
                          letterSpacing='none',
                          :class='{ gray: n > storeData.priceLevel }'
                        ) ¥
                    img.map-store__description-bottom-icons(
                      src='~@/assets/gif/cooking.gif',
                      alt='スカイチケット注文ステップ',
                      v-if='storeData.lowerOrdersTime'
                    )
                    paragraph.map-store__description-bottom-time(
                      fontSize='tiny',
                      letterSpacing='none',
                      v-if='storeData.lowerOrdersTime'
                    ) {{ storeData.lowerOrdersTime }}分
                  .-openTime(
                    v-for='item in openingHours(storeData.openinghours)',
                    v-if='isTakeout'
                  )
                    clock-icon.-icon
                    paragraph.-text(fontSize='tiny', letterSpacing='none') {{ item.openingTime.slice(0, -3) }} ~ {{ item.closeTime.slice(0, -3) }}
                  .-closeWeek(
                    v-if='isTakeout && storeData.openinghours && breakweek(storeData.openinghours).length > 0 && onImageText(storeData.openinghours) === "休業中"'
                  )
                    paragraph.-text.-mr(fontSize='tiny', letterSpacing='none') 休業日 :
                    paragraph.-text.-mr-2(
                      fontSize='tiny',
                      letterSpacing='none',
                      v-for='num in breakweek(storeData.openinghours)',
                      :key='num'
                    ) {{ NumtoWeek(num) }}
                  template(v-if='!isTakeout')
                    .-to-price
                      .-to-price-wrapper
                        day-icon
                        div {{ priceFormat(storeData.daytimeBudgetLowerLimit) }}
                      .-to-price-wrapper
                        night-icon
                        div {{ priceFormat(storeData.nightBudgetLowerLimit) }}
              .-restaurant-course(v-if='!isTakeout && storeData.recommendMenu')
                button.-course(@click.stop='courseClick(storeData.id)')
                  paragraph.-cname(fontSize='tiny') {{ storeData.recommendMenu.name }}
                  Span.-cprice(fontSize='tiny') {{ `${$moneyFormat(Number(storeData.recommendMenu.price.price))}円` }}
      .map
        GmapMap.mapsView(
          :center='nowHere',
          :zoom='16',
          map-type-id='terrain',
          ref='mapRef',
          :options='options'
        )
          template(v-if='storeResponse')
            GmapMarker(
              :key='index',
              v-for='(m, index) in storeResponse.stores',
              :position='{ lat: m.latitude, lng: m.longitude }',
              :clickable='true',
              :draggable='false',
              :icon='nowIcon(index)',
              @click='clickPin(index, { lat: m.latitude, lng: m.longitude })'
            )
        no-ssr
          carousel.bottomSlider(
            v-if='$window.width <= 1024',
            ref='carousel',
            :per-page='1',
            :paginationEnabled='false',
            :centerMode='true',
            @pageChange='onPageChange',
            :value='getsId',
            :class='[isTakeout ? "takeout-box" : "restaurant-box"]'
          )
            template(v-if='storeResponse')
              template(v-for='(storeData, index) in storeResponse.stores')
                slide
                  .mapflex(@click='goDetail(storeData.id)')
                    .map-sumaho
                      .flex1
                        img.-imgs(
                          v-if='(storeData.storeImage.imageUrl && !isTakeout) || (storeData.storeImage.imageUrl && storeData.openinghours && storeClosed(storeData.openinghours))',
                          :src='storeData.storeImage.imageUrl + "?imwidth=130&imdensity=1"',
                          width='130'
                        )
                        .-overlay(
                          v-else-if='isTakeout && storeData.openinghours && !storeClosed(storeData.openinghours)'
                        )
                          img.-img(
                            v-if='storeData.storeImage.imageUrl',
                            :src='storeData.storeImage.imageUrl + "?imwidth=130&imdensity=1"',
                            width='130'
                          )
                          no-image.-img(v-else, size='xs')
                          .-onText(v-if='isTakeout')
                            paragraph(fontSize='tiny', color='white') {{ onImageText(storeData.openinghours) }}
                        no-image.-noimg(v-else, size='xs')
                      .flex2
                        paragraph-bold.checktextTop.shrink(fontSize='small') {{ storeData.name }}
                        paragraph.checktext.genre(fontSize='tiny') {{ genreText(storeData.storeGenres) }}
                        template(
                          v-if='storeData.distance !== null || undefined'
                        )
                          paragraph.checktext(fontSize='tiny') {{ $distanceFormat(storeData.distance) }}
                        .-bottoms(v-if='isTakeout')
                          .-price(v-if='storeData.priceLevel')
                            .price-level(v-for='n of storeData.priceLevel')
                              paragraph(fontSize='tiny', letterSpacing='none') ¥
                            .price-level(
                              v-for='n of (4 - storeData.priceLevel)'
                            )
                              paragraph(
                                fontSize='tiny',
                                letterSpacing='none',
                                color='dark_gray'
                              ) ¥
                          img.-icons(
                            src='~@/assets/gif/cooking.gif',
                            alt='スカイチケット注文ステップ',
                            v-if='storeData.lowerOrdersTime'
                          )
                          .-cooktime
                            paragraph(
                              fontSize='tiny',
                              letterSpacing='none',
                              v-if='storeData.lowerOrdersTime'
                            ) {{ storeData.lowerOrdersTime }}分
                        .-openTime(
                          v-for='item in openingHours(storeData.openinghours)',
                          v-if='isTakeout'
                        )
                          clock-icon.-icon
                          paragraph.-text(
                            fontSize='tiny',
                            letterSpacing='none'
                          ) {{ item.openingTime.slice(0, -3) }} ~ {{ item.closeTime.slice(0, -3) }}
                        .-closeWeek(
                          v-if='isTakeout && storeData.openinghours && breakweek(storeData.openinghours).length > 0 && onImageText(storeData.openinghours) === "休業中"'
                        )
                          paragraph.-text.-mr(
                            fontSize='tiny',
                            letterSpacing='none'
                          ) 休業日 :
                          paragraph.-text.-mr-2(
                            fontSize='tiny',
                            letterSpacing='none',
                            v-for='num in breakweek(storeData.openinghours)',
                            :key='num'
                          ) {{ NumtoWeek(num) }}
                        template(v-if='!isTakeout')
                          .-to-price
                            .-to-price-wrapper
                              day-icon
                              div {{ priceFormat(storeData.daytimeBudgetLowerLimit) }}
                            .-to-price-wrapper
                              night-icon
                              div {{ priceFormat(storeData.nightBudgetLowerLimit) }}
                    .-restaurant-course(
                      v-if='!isTakeout && storeData.recommendMenu'
                    )
                      button.-course(@click.stop='courseClick(storeData.id)')
                        paragraph.-cname(fontSize='tiny') {{ storeData.recommendMenu.name }}
                        paragraph.-cprice(fontSize='tiny') {{ `${$moneyFormat(Number(storeData.recommendMenu.price.price))}円` }}
          .backgroundNext(
            v-if='$window.width <= 1024 && storeResponse && isNextCheck',
            v-show='storeResponse.sumCount !== 0'
          )
          .backgroundPrev(
            v-if='$window.width <= 1024 && storeResponse && isPrevCheck',
            v-show='storeResponse.sumCount !== 0'
          )
          next.navNext(
            v-if='$window.width <= 1024 && storeResponse && isNextCheck',
            @click='clickNext',
            v-show='storeResponse.sumCount !== 0'
          )
          next.navPrev(
            v-if='$window.width <= 1024 && storeResponse && isPrevCheck',
            @click='clickPrev',
            v-show='storeResponse.sumCount !== 0'
          )
        button.research(@click='getNowPosition()')
          .researchText
            reload-mark.-researchicon
            paragraph-bold.-text(fontSize='small') このエリアで再検索
        button.list_pin(@click='goList()')
          list-icon.-listicon
        button.circle_pin(@click='goNowLocation()')
          pin-icon.-pinicon
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import { format } from 'date-fns'
import { Heading, Paragraph, ParagraphBold, SpanBold } from '~/components/atoms/typography'
import { StoreTypes } from '~/types/storeTypes'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
import ClockIcon from '~/assets/icon/clock.svg'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import dayIcon from '~/assets/icon/day.svg'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import GeoLocation from '~/components/atoms/Location/GeoLocation.vue'
import ListIcon from '~/assets/icon/list.svg'
import LocationIcon from '~/assets/icon/location.svg'
import Next from '~/assets/icon/next.svg'
import nightIcon from '~/assets/icon/night.svg'
import NoImage from '~/components/atoms/noImage/index.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import PinIcon from '~/assets/icon/pin.svg'
import ReloadMark from '~/assets/icon/reload.svg'
import { ListStoreTypes } from '~/types/ListStoreTypes'
@Component({
  components: {
    ApiLoading,
    ClockIcon,
    CTAButton,
    dayIcon,
    FullLoading,
    GeoLocation,
    Heading,
    ListIcon,
    LocationIcon,
    Next,
    nightIcon,
    NoImage,
    NotificationPop,
    Paragraph,
    ParagraphBold,
    PinIcon,
    ReloadMark,
    SpanBold
  }
})
export default class NewTopIndex extends Vue {
  head() {
    return {
      title: '近くのレストラン・飲食店を予約するならスカイチケットグルメ',
      titleTemplate: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '近くのレストランを今すぐ検索・予約ならスカイチケット！近くで食事ができるお店の予約ができる。様々なジャンルの焼肉・イタリアン・中華や、ご当地グルメなど、様々な飲食店を掲載。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '近くのレストランを今すぐ検索・予約ならスカイチケット！近くで食事ができるお店の予約ができる。様々なジャンルの焼肉・イタリアン・中華や、ご当地グルメなど、様々な飲食店を掲載。'
        }
      ]
    }
  }

  async fetch({ store, query }) {
    // リロードした時だけqueryが入ってくるのでリロードされた場合はそれを使う
    // それ以外はcurrentRoute.pathを使う
    let path = ''
    if (query.pl) {
      const { pl, list } = query
      if (pl === 'res') {
        path = '/restaurant'
        await store.dispatch('modules/layout/setHeaderInfo', {
          layoutType: 6,
          headerTitle: '現在地から近い店舗一覧',
          returnPath: path
        })
      } else if (pl === 'take') {
        path = list ? '/takeout/search_result' : '/takeout'
        await store.dispatch('modules/layout/setHeaderInfo', {
          layoutType: 6,
          headerTitle: '現在地から近い店舗一覧',
          returnPath: path
        })
      }
      // レストランの検索一覧にも出す必要が出たら必要
      // else path = '/restaurant/search_result'
    } else {
      path = store.$router.currentRoute.path
      await store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 6,
        headerTitle: '現在地から近い店舗一覧',
        returnPath: path
      })
    }
  }

  nowLoading = true
  poptype = 'error'
  isPrevCheck = false
  isNextCheck = true
  private geoLocFlag = false
  price = 1
  pl = ''

  mounted() {
    this.nowLoading = true
    /* eslint-disable */
    const lat: any = this.$route.query.lat
    const lng: any = this.$route.query.lng
    const list: any = this.$route.query.list
    /* eslint-enable */
    this.pl = this.$route.query.pl ? String(this.$route.query.pl) : 'take'

    // レストランの場合検索条件をクリア
    if (this.pl === 'res') {
      this.$store.dispatch('modules/search_store/resetSearchBoxRS')
    }

    if (lat !== undefined && lng !== undefined) {
      if (list === 'true') {
        this.nowLoading = false
      } else {
        const firstata = {
          appCd: this.isTakeout ? 'TO' : 'RS',
          suggestCd: 'CURRENT_LOC',
          latitude: lat,
          longitude: lng
        }
        this.$store.dispatch('modules/search_store/storeSearch', firstata)
      }
    } else {
      this.geoLocFlag = true
    }
  }

  isAlertPopShown = false
  alertMessage = 'お近くの店舗が見つかりませんでした。'
  closePop(): void {
    this.isAlertPopShown = false
  }

  breakweek(list: StoreTypes.Openhours[]) {
    if (list) {
      const breakBox: number[] = []
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < 7; j++) {
          if (list[i].week.charAt(j) === '1') {
            breakBox.push(j)
          }
        }
      }
      // duplicateを弾いて戻す
      const a = Array.from(new Set(breakBox))
      const b = [0, 1, 2, 3, 4, 5, 6]
      const newData = this.getArraysDiff(a, b)
      return newData
    }
  }

  getArraysDiff = (array01, array02) => {
    const arr01 = [...new Set(array01)]
    const arr02 = [...new Set(array02)]
    return [...arr01, ...arr02].filter((value) => !arr01.includes(value) || !arr02.includes(value))
  }

  NumtoWeek(num: number) {
    if (num === 0) {
      return '月'
    } else if (num === 1) {
      return '火'
    } else if (num === 2) {
      return '水'
    } else if (num === 3) {
      return '木'
    } else if (num === 4) {
      return '金'
    } else if (num === 5) {
      return '土'
    } else {
      return '日'
    }
  }

  priceFormat(price: number | null) {
    if (price === null) {
      return '---'
    }
    return `${this.$moneyFormat(price)}円〜`
  }

  // Google map options
  get options() {
    return {
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
        gestureHandling: 'greedy',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels.icon',
            stylers: [
              {
                color: '#b3b3b3'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          }
        ]
      }
    }
  }

  get isTakeout() {
    return this.pl !== 'res'
  }

  nowIcon(num) {
    if (num !== this.getsId) {
      return { url: 'img/map/before-location.svg' }
    } else {
      return {
        url: 'img/map/after-location.svg',
        scaledSize: { width: 44, height: 48 }
      }
    }
  }

  onImageText(list: StoreTypes.Openhours[]) {
    let flag = false
    for (let i = 0; i < list.length; i++) {
      if (list[i].week.charAt(new Date().getDay() - 1) === '1') {
        flag = true
      }
    }
    if (flag) {
      return '準備中\n（予約可）'
    } else {
      return '休業中'
    }
  }

  async denied() {
    this.alertMessage = '位置情報が取得できませんでした。'
    this.poptype = 'error'
    this.isAlertPopShown = true
    this.nowLoading = false
    await this.$router.push({
      query: { lat: '35.681167', lng: '139.767052', pl: this.pl }
    })
    // .catch(() => {
    //   // promiseをキャッチ
    // })
    const firstata = {
      appCd: this.isTakeout ? 'TO' : 'RS',
      suggestCd: 'CURRENT_LOC',
      latitude: 35.681167,
      longitude: 139.767052
    }
    await this.$store.dispatch('modules/search_store/storeSearch', firstata)
  }

  async setloc() {
    this.alertMessage = '位置情報を取得しました。'
    this.poptype = 'success'
    this.isAlertPopShown = true
    this.nowLoading = false
    await this.$router.push({
      query: {
        lat: this.locationInfo.latitude,
        lng: this.locationInfo.longitude,
        pl: this.pl
      }
    })
    // .catch(() => {
    //   // promiseをキャッチ
    // })
    const firstata = {
      appCd: this.isTakeout ? 'TO' : 'RS',
      suggestCd: 'CURRENT_LOC',
      latitude: this.locationInfo.latitude,
      longitude: this.locationInfo.longitude
    }
    await this.$store.dispatch('modules/search_store/storeSearch', firstata)
  }

  private currentNum = 0
  // 位置情報をget
  get locationInfo() {
    return this.$store.getters['modules/user/getLocationInfo']
  }

  // 初期の位置情報をセット
  get nowHere() {
    /* eslint-disable */
    const querylat: any = this.$route.query.lat
    const querylng: any = this.$route.query.lng
    /* eslint-enable */
    if (querylat !== undefined && querylng !== undefined) {
      return {
        lat: Number(querylat),
        lng: Number(querylng)
      }
    } else if (this.locationInfo.latitude && this.locationInfo.longitude) {
      return {
        lat: this.locationInfo.latitude,
        lng: this.locationInfo.longitude
      }
    } else {
      // 無かったら東京の座標を
      return { lat: 35.681167, lng: 139.767052 }
    }
  }

  // 位置情報からデータを取得
  get storeResponse() {
    const data = this.$store.getters['modules/search_store/getStoreList']
    if (data) {
      this.nowLoading = false
      if (data.sumCount === 0) {
        this.poptype = 'error'
        this.alertMessage = 'お近くの店舗が見つかりませんでした。'
        this.isAlertPopShown = true
      } else if (data.sumCount === 1) {
        this.isNextCheck = false
      } else {
        this.isNextCheck = true
      }
    }
    return data
  }

  private isMapsFlag = false
  //   テストデータ
  onPageChange(num: number): void {
    const totalCount = this.refs.carousel.slideCount
    this.currentNum = num
    this.currentNum === totalCount - 1 ? (this.isNextCheck = false) : (this.isNextCheck = true)
    this.currentNum > 0 ? (this.isPrevCheck = true) : (this.isPrevCheck = false)
    if (this.refs.mapRef) {
      this.refs.mapRef.$mapPromise.then((map) => {
        map.panTo({
          lat: this.storeResponse.stores[this.currentNum].latitude,
          lng: this.storeResponse.stores[this.currentNum].longitude
        })
      })
      this.$store.dispatch('modules/search_store/setStoreId', this.currentNum)
    }
  }

  // 深夜対応
  openingHours(openingHours: ListStoreTypes.MapHourTypes[]) {
    const storeInfo: ListStoreTypes.MapHourTypes[] = cloneDeep(openingHours)
    const isToday = storeInfo.filter((openingHour) => {
      if (this.isHoliday && openingHour.week.charAt(7) === '1') {
        return openingHour.week.charAt(7) === '1'
      } else if (!this.isHoliday && new Date().getDay() === 0 && openingHour.week.charAt(6) === '1') {
        return openingHour.week.charAt(6) === '1'
      } else if (!this.isHoliday && openingHour.week.charAt(new Date().getDay() - 1) === '1') {
        return openingHour.week.charAt(new Date().getDay() - 1) === '1'
      }
    })

    const midNightFormatter: ListStoreTypes.MapHourTypes = {
      id: 0,
      openingTime: '',
      code: '',
      lastOrderTime: '',
      closeTime: '',
      week: ''
    }
    isToday.forEach((openingHour) => {
      if (openingHour.openingTime === '00:00:00') {
        Object.assign(midNightFormatter, {
          id: openingHour.id,
          code: openingHour.code,
          week: openingHour.week,
          lastOrderTime: openingHour.lastOrderTime
        })
        Object.assign(midNightFormatter, { closeTime: openingHour.closeTime })
      }
      if (openingHour.closeTime === '23:59:00') {
        Object.assign(midNightFormatter, {
          id: openingHour.id,
          code: openingHour.code,
          week: openingHour.week,
          lastOrderTime: openingHour.lastOrderTime
        })
        Object.assign(midNightFormatter, {
          openingTime: openingHour.openingTime
        })
      }
    })

    if (midNightFormatter.openingTime && !midNightFormatter.closeTime) {
      isToday.forEach((store) => {
        if (store.id === midNightFormatter.id) {
          midNightFormatter.closeTime = store.closeTime
        }
      })
    } else if (!midNightFormatter.openingTime && midNightFormatter.closeTime) {
      isToday.forEach((store) => {
        if (store.id === midNightFormatter.id) {
          midNightFormatter.openingTime = store.openingTime
        }
      })
    }

    const hasDailyHours = isToday.filter((hours) => {
      return hours.openingTime !== '00:00:00' && hours.closeTime !== '23:59:00'
    })
    const midNightHour: ListStoreTypes.MapHourTypes[] = []

    if (midNightFormatter.id) {
      midNightHour.push(midNightFormatter)
    }

    const result = hasDailyHours.concat(midNightHour)

    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].code === result[j].code) {
          result.splice(i, 1)
        }
      }
    }

    return result
  }

  storeClosed(list: StoreTypes.Openhours[]) {
    if (list) {
      let flag = false // 1度でも当てはまれば良いのでflag判定
      for (let i = 0; i < list.length; i++) {
        const listOpeningTime = list[i].openingTime.split(':') // resのopening時間を分解
        const listOpenEva = Number(listOpeningTime[0]) * 60 + Number(listOpeningTime[1]) // 時間を分に
        const listClosingTime = list[i].closeTime.split(':') // resのclosing時間を分解
        const listCloseEva = Number(listClosingTime[0]) * 60 + Number(listClosingTime[1]) // 時間を分に
        const nowTimeEva = new Date().getHours() * 60 + new Date().getMinutes() // 現在時刻(分)
        const listWeek = list[i].week.charAt(new Date().getDay() - 1) // resのweek内で今日の曜日を見る
        if (listOpenEva < nowTimeEva && nowTimeEva < listCloseEva && listWeek === '1') {
          flag = true
        }
      }
      return flag
    }
  }

  /**
   * Google mapのピンのクリックイベント
   * @param {number} num お店の順番
   * @param {string} status お店の情報
   */
  clickPin(num, status): void {
    if (this.refs.mapRef) {
      this.refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: status.lat, lng: status.lng })
      })
      this.storeListOnLine(num, 'click')
      this.$store.dispatch('modules/search_store/setStoreId', num)
    }
  }

  /**
   * リストの中選択されたお店の枠に線をつける
   * @param {number} num お店の表示されている順番
   * @param {string} event クリックかオンマウスを判別
   */
  storeListOnLine(num: number, event?: string): void {
    const store = document.querySelector('.map-store-wrapper')
    if (store) {
      document.querySelectorAll('.map-store').forEach((x) => x.setAttribute('style', 'border: 1px solid #ffffff'))
      store.children[num + 1].setAttribute('style', 'border: 1px solid #a6a6a6;')
      const html = document.querySelector('html')
      if (html && event === 'click') {
        html.setAttribute('style', 'position: fixed')
        store.children[num + 1].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        html.setAttribute('style', 'position: static')
      }
    }
  }

  /**
   * お店リストマウスオンイベント
   * @param {number} num お店の表示されている順番
   * @param {string} status クリックかオンマウスを判別
   */
  listMouseOver(num, status): void {
    if (this.refs.mapRef) {
      this.refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: status.lat, lng: status.lng })
      })
      this.storeListOnLine(num)
      this.$store.dispatch('modules/search_store/setStoreId', num)
    }
  }

  get getsId() {
    return this.$store.getters['modules/search_store/getStoreId']
  }

  private clickNext(): void {
    this.refs.carousel.goToPage(this.refs.carousel.getNextPage())
  }

  private clickPrev(): void {
    this.refs.carousel.goToPage(this.refs.carousel.getPreviousPage())
  }

  // リスト表示をするための関数
  private goList(): void {
    let url = '/takeout/search_result/map_result'
    if (this.isTakeout) {
      this.$store.dispatch('modules/search_store/resetSearchBoxTO')
    } else {
      this.$store.dispatch('modules/search_store/resetSearchBoxRS')
      url = '/restaurant/search_result/map_result'
    }
    this.$router.push(url)
  }

  // 現在地にpantoするための関数
  private goNowLocation(): void {
    if (this.refs.mapRef) {
      this.refs.mapRef.$mapPromise.then((map) => {
        // 位置情報取得出来たら
        if (this.locationInfo.latitude && this.locationInfo.longitude) {
          map.panTo({
            lat: this.locationInfo.latitude,
            lng: this.locationInfo.longitude
          })
        } else {
          //  できなかったら
          map.panTo({ lat: 35.681167, lng: 139.767052 })
        }
      })
    }
  }

  // 中央値の緯度経度もらう(このエリアで再検索)
  private async getCenter() {
    if (this.refs.mapRef) {
      await this.refs.mapRef.$mapPromise.then(async (map) => {
        const newCenter = {
          appCd: this.isTakeout ? 'TO' : 'RS',
          suggestCd: 'CURRENT_LOC',
          latitude: map.getCenter().lat(),
          longitude: map.getCenter().lng()
        }
        if (this.isTakeout) {
          await this.$router.push({
            query: {
              lat: map.getCenter().lat(),
              lng: map.getCenter().lng(),
              pl: 'take'
            }
          })
          // .catch(() => {
          //   // promiseをキャッチ
          // })
        } else {
          await this.$router.push({
            query: {
              lat: map.getCenter().lat(),
              lng: map.getCenter().lng(),
              pl: 'res'
            }
          })
          // .catch(() => {
          //   // promiseをキャッチ
          // })
        }

        await this.$store.dispatch('modules/search_store/storeSearch', newCenter)
      })
    }
  }

  goDetail(id) {
    this.isTakeout
      ? this.$router.push(`/restaurant/detail/takeout/${id}/?type=take`)
      : this.$router.push(`/restaurant/detail/takeout/${id}/`)
  }

  async getNowPosition() {
    this.nowLoading = true
    await this.getCenter()
  }
  // eslint-disable-next-line
  get refs(): any {
    return this.$refs
  }

  genreText(genreBox: StoreTypes.StoreGenres[]) {
    let textdata = ''
    let count = 0
    if (genreBox) {
      for (let i = 0; i < genreBox.length; i++) {
        if (genreBox[i].isDelegate === 1) {
          if (count === 0) {
            textdata = textdata + genreBox[i].name
          } else {
            textdata = textdata + '/' + genreBox[i].name
          }
          count++
        }
      }
      return textdata
    }
  }

  courseClick(storeId: number): void {
    this.$router.push(`/restaurant/detail/takeout/${storeId}/?type=plan`)
  }

  // 祝日確認
  get isHoliday(): boolean {
    return Object.keys(this.getHolidayList).includes(this.dayFormatter)
  }

  // 年月日xxxx-0x(xx)-0x(xx)のフォーマット
  get dayFormatter(): string {
    const today = new Date()
    return format(today, 'yyyy-MM-dd')
  }

  // 祝日取得
  get getHolidayList() {
    return this.$store.getters['modules/date/getHoliday']
  }
}
</script>
<style lang="sass" scoped>
html,body
  overflow: hidden
.mapsPage
  position: relative
  max-height: calc(100vh - 115px - 48px)
  min-height: none
  .research
    position: absolute
    border-radius: 3px
    background-color: white
    border: solid 1px #e4e4e4
    width: 200px
    height: 40px
    outline: none
    margin: 3px
    top: 1%
    right: 0%
    left: 0%
    margin: 0 auto
    cursor: pointer
    .-text
      color: #4d4d4d
    .-researchicon
      fill: #4d4d4d
      margin-right: 5px
      width: 20px
      height: 20px
    &:active
      background-color: #1BA1FF
      fill: white
      color: white
      .-text
        color: white
      .-researchicon
        fill: white
    .researchText
      display: flex
      justify-content: center
      align-items: center
      color: white
  .list_pin
    position: absolute
    border-radius: 50%
    background-color: white
    border: solid 1px #e4e4e4
    width: 40px
    height: 40px
    outline: none
    margin: 3px
    top: 0%
    margin-top: 5px
    right: 0%
    margin-right: 10px
    cursor: pointer
    .-listicon
      width: 20px
      height: 20px
      margin-top: 3px
      fill: #4d4d4d
    &:active
      background-color: #1BA1FF
      .-listicon
        fill: white
  .circle_pin
    position: absolute
    border-radius: 50%
    background-color: white
    border: solid 1px #e4e4e4
    width: 40px
    height: 40px
    outline: none
    margin: 3px
    top: 0%
    right: 0%
    margin-right: 10px
    margin-top: 60px
    cursor: pointer
    .-pinicon
      width: 20px
      height: 24px
      margin-top: 5px
      fill: #4d4d4d
    &:active
      background-color: #1BA1FF
      .-pinicon
        fill: white
  .map
    .backgroundNext
      position: fixed
      bottom: 0%
      right: calc(3% - 14px)
      margin-bottom: 80px
      width: 49px
      height: 52px
      background: white
      border-radius: 50%
      opacity: 0.7
    .backgroundPrev
      position: fixed
      bottom: 0%
      left: calc(3% - 14px)
      margin-bottom: 80px
      width: 49px
      height: 52px
      background: white
      border-radius: 50%
      opacity: 0.7
    .navNext
      position: fixed
      bottom: 0%
      margin-bottom: 90px
      right: 3%
      width: 20px
      stroke: black
      stroke-width: 0.5px
      z-index: 6
      cursor: pointer
    .navPrev
      position: fixed
      bottom: 0%
      margin-bottom: 90px
      transform: rotate(180deg)
      left: 3%
      width: 20px
      stroke: black
      stroke-width: 0.5px
      z-index: 6
      cursor: pointer
    .mapsView
      width: 100vw
      margin-left: calc(-50vw + 50%)
      margin-right: calc(-50vw + 50%)
      height: calc(100vh - 48px)
    .bottomSlider
      position: fixed
      cursor: pointer
      bottom: 0%
      left: 0
      z-index: 5
      left: 0
      right: 0
      margin-bottom: 25px
      width: 100%
      .mapflex
        justify-content: center
        width: 80vw
        margin: 0 auto
        background-color: white
        padding-bottom: 16px
        .map-sumaho
          display: flex
        .flex1
          width: 150px
          min-width: 150px
          background: white
          .-imgs
            padding: 12px 0 0 16px
            height: 130px
            width: 100%
            object-fit: cover
          .-noimg
            margin: 10px 15px 10px 10px
            height: 97.5px
            width: 130px
            object-fit: cover
          .-overlay
            position: relative
            margin: 10px 15px 10px 10px
            height: 97.5px
            width: 130px
            &:before
              content: ''
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              background-color: rgba(0, 0, 0, 0.6)
            .-onText
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
              color: #fff
              width: 100%
              text-align: center
              white-space: pre-line
            .-img
              max-width: 100%
              max-height: 100%
              height: 100%
              width: 100%
              object-fit: cover
        .flex2
          margin-left: 10px
          .genre
            line-height: 1.5
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
            overflow: hidden
          .checktextTop
            margin-top: 8px
          .-price
            display: flex
            align-items: center
            .-value
              margin-right: 2px
          .-bottoms
            display: flex
            .-price
              width: 40px
            .-icons
              margin-left: 10px
              margin-right: 4px
              width: 20px
              height: 20px
            .-cooktime
              width: 100px
          .-openTime
            position: relative
            .-icon
              position: absolute
              left: 0
              width: 12px
              top: -30%
              fill: #a6a6a6
            .-text
              padding-left: 15px
          .-closeWeek
            .-text
              float: left
            .-mr
              padding-right: 1em
            .-mr-2
              padding-right: 2px
          .-to-price
            display: grid
            gap: 2px
            .-to-price-wrapper
              display: grid
              grid-template-columns: max-content max-content
              gap: 5px
              font-size: 12px
              align-items: center
              svg
                width: 12px
                height: 12px
        .-course
          width: calc(100% - 32px)
          margin: 4px 16px 0
          padding: 8px
          outline: none
          cursor: pointer
          background-color: #f4f4f4
          border: none
          display: flex
          .-cname
            color: #1ba1ff
            text-align: left
            width: 70%
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
            overflow: hidden
          .-cprice
            width: 30%
            font-weight: bold
            text-align: right
          &:hover
            background-color: #1BA1FF
            .-cname
              color: white
            .-cprice
              color: white
.-price
  display: flex
  align-items: center
  .gray
    color: 'dark-gray'
  #gray
    color: $gray
.shrink
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 1
  overflow: hidden
@include pc_view
  .mapsPage.page
    padding: 0 !important
    position: relative
    max-width: none
    .research
      position: absolute
      border-radius: 3px
      background-color: white
      border: solid 1px #e4e4e4
      width: 200px
      height: 40px
      outline: none
      margin: 3px
      top: 1%
      right: 0%
      left: 0%
      margin: 0 auto
      cursor: pointer
      .-text
        color: #4d4d4d
      .-researchicon
        fill: #4d4d4d
        margin-right: 5px
        width: 20px
        height: 20px
      &:hover
        background-color: #1BA1FF
        fill: white
        color: white
        .-text
          color: white
        .-researchicon
          fill: white
      .researchText
        display: flex
        justify-content: center
        align-items: center
        color: white
    .list_pin
      position: absolute
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 40px
      height: 40px
      outline: none
      margin: 3px
      top: 5px
      right: 7px
      cursor: pointer
      .-listicon
        width: 20px
        height: 20px
        margin-top: 3px
        fill: #4d4d4d
      &:hover
        background-color: #1BA1FF
        .-listicon
          fill: white
    .circle_pin
      position: absolute
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 40px
      height: 40px
      outline: none
      margin: 3px
      top: 60px
      right: 7px
      cursor: pointer
      .-pinicon
        width: 20px
        height: 24px
        margin-top: 5px
        fill: #4d4d4d
      &:hover
        background-color: #1BA1FF
        .-pinicon
          fill: white
    .map-wrapper
      display: flex
      .genre
        line-height: 1.5
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 1
        overflow: hidden
      .map-info
        width: 434px
        min-width: 434px
        .map-condition
          display: flex
          flex-direction: column
          justify-content: center
          min-height: 140px
          border-bottom: 1px solid $light_gray
          &__here
            display: flex
            padding: 0 12px
            &--icon
              width: 24px
              height: 24px
              fill: $dark_gray
          &__btn
            display: flex
            justify-content: space-between
            margin-top: 24px
            padding: 0 12px
            &--filter
              flex: 1 1 auto
              min-height: 40px
              border-radius: 4px
              padding: 0
              max-width: 172px
            &--search
              flex: 1 1 auto
              min-height: 40px
              border-radius: 4px
              padding: 0
              max-width: 224px
        .map-store-wrapper
          padding: 0 24px
          overflow: scroll
          max-height: 90vh
          .no-show
            margin-top: 50px
            border: none!important
            text-align: center
          .map-store
            margin-top: 24px
            border: 1px solid $light_gray
            cursor: pointer
            padding-right: 8px
            padding-left: 8px
            .map-flex
              display: flex
            &__img
              width: 130px
              min-width: 130px
              max-width: 130px
              height: 110px
              margin: 10px 0 10px 10px
            .-overlay
              position: relative
              width: 33%
              min-width: 33%
              height: 90px
              margin: 10px 0 10px 10px
              &:before
                content: ''
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background-color: rgba(0, 0, 0, 0.6)
              .-onText
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                color: #fff
                width: 100%
                text-align: center
                white-space: pre-line
              .-img
                max-width: 100%
                max-height: 100%
                height: 100%
                width: 100%
                object-fit: cover
            &__description
              flex-grow: 1
              padding-left: 10px
              &-top
                display: flex
                padding-top: 8px
              &-bottom
                display: flex
                &-price
                  margin-right: 4px
                &-icons
                  width: 20px
                  height: 20px
                  margin-right: 2px
                  margin-left: 10px
                &-time
              .-openTime
                position: relative
                .-icon
                  position: absolute
                  left: 0
                  width: 12px
                  top: -30%
                  fill: #a6a6a6
                .-text
                  padding-left: 15px
              .-closeWeek
                .-text
                  float: left
                .-mr
                  padding-right: 1em
                .-mr-2
                  padding-right: 2px
              .-to-price
                display: grid
                gap: 2px
                .-to-price-wrapper
                  display: grid
                  grid-template-columns: max-content max-content
                  gap: 5px
                  font-size: 12px
                  align-items: center
                  svg
                    width: 12px
                    height: 12px
            .-course
              width: 97%
              margin: 0 8px 8px 8px
              padding: 8px
              outline: none
              cursor: pointer
              background-color: #f4f4f4
              border: none
              display: flex
              .-cname
                color: #1ba1ff
                text-align: left
                width: 70%
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 1
                overflow: hidden
              .-cprice
                width: 30%
                text-align: right
              &:hover
                background-color: #1BA1FF
                .-cname
                  color: white
                .-cprice
                  color: white
          .navNext
            position: absolute
            top: 83.5%
            right: 18%
            filter: drop-shadow(4px 3px 5px #000)
            fill: black
            width: 20px
            z-index: 6
      .map
        position: relative
        width: 100%
        .mapsView
          width: 100%
          height: calc(100vh - 60px)
          margin: 0 auto
        .backgroundNext
          position: absolute
          top: calc(100vh - 180px)
          right: calc(3% - 14px)
          width: 49px
          height: 52px
          background: white
          border-radius: 50%
          opacity: 0.7
        .backgroundPrev
          position: absolute
          top: calc(100vh - 180px)
          left: calc(3% - 14px)
          width: 49px
          height: 52px
          background: white
          border-radius: 50%
          opacity: 0.7
        .navNext
          position: absolute
          top: calc(100vh - 169px)
          right: 3%
          width: 20px
          stroke: black
          stroke-width: 0.5px
          z-index: 6
          cursor: pointer
        .navPrev
          position: absolute
          transform: rotate(180deg)
          top: calc(100vh - 169px)
          left: 3%
          width: 20px
          stroke: black
          stroke-width: 0.5px
          z-index: 6
          cursor: pointer
        .bottomSlider
          display: flex
          left: 0
          z-index: 5
          width: 100%
          right: 0
          left: 0
          margin: 0 auto
        .takeout-box
          top: calc(100vh - 170px)
        .restaurant-box
          top: calc(100vh - 220px)
</style>
