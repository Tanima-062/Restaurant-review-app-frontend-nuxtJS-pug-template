<template lang="pug">
.hotel-buffet
  .header
    .breadcrumbs
      nuxt-link(to='/restaurant/')
        .-text TOP
      span.divide /
      nuxt-link(to='/restaurant/campaign/hotel_buffet/')
        h1.-text.-active ホテルビュッフェ特集
    .key-visual
      .-image
        img(:src="bannerImgSrc" alt="ホテルビュッフェ,アフタヌーンディー特集")
      .-info 洗練された優雅なひとときが楽しめるホテルレストラン。ワンランク上の美味しい料理をお腹いっぱい楽しめるビュッフェプランや写真映え間違いなしのアフタヌーンティーをご紹介します。
  .divide-line
  .main
    hotel-restaurant-skeleton(v-if="isLoading")
    .tab(v-else)
      a.tab-item(
        v-for="(hotelsInfo, i) in editedHotelsInfoList",
        :class='[isActiveTapId === hotelsInfo.prefectureCode ? "active": ""]',
        @click.prevet="smoothScroll('#' + hotelsInfo.prefectureCode, -60)") {{ hotelsInfo.prefectureName }}
    .hotel-list
      .hotel-item(v-for="(hotelsInfo, i) in editedHotelsInfoList", :id="hotelsInfo.prefectureCode", :key="i")
        h2.title {{ hotelsInfo.prefectureName }}
        hotel-restaurant(:hotels-info="hotelsInfo")
  .divide-line(v-show="$device.isDesktop")
  .carousel
    //- Heading.carousel-title(fontSize='m', :number="3") 関連記事を読む
    //- carousel-nav.article(:List='test', :is-takeout='false')
    Heading.carousel-title(fontSize='m', :number="3") おすすめのホテルレストラン
    carousel-nav.popular-area-restaurant(:List='recommendHotelRestaurantList', :is-takeout='false')
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  useStore,
  useFetch,
  useContext,
  Ref,
  watch,
  nextTick
} from '@nuxtjs/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import {
  hotelsInfoList,
  devHotelsInfoList,
  recommendHotelRestaurantMetaInfoList,
  devRecommendHotelRestaurantMetaInfoList
} from '~/utils/hotelBuffet'
import HotelRestaurantSkeleton from '~/components/atoms/skeleton/HotelRestaurantSkeleton.vue'
import HotelRestaurant from '~/components/organisms/hotel_buffet/HotelRestaurant.vue'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import { Heading } from '~/components/atoms/typography'
import { useScroll } from '~/composables/useScroll'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'
import { HotelRestaurantList, HotelsInfo } from '~/types/hotelRestaurantTypes'

export default defineComponent({
  name: 'HotelBuffet',
  components: {
    HotelRestaurant,
    HotelRestaurantSkeleton,
    CarouselNav,
    Heading
  },
  setup() {
    const tempHotelsInfoList = process.env.NODE_ENV === 'production' ? hotelsInfoList : devHotelsInfoList
    const tempRecommendHotelRestaurantMetaInfoList =
      process.env.NODE_ENV === 'production'
        ? recommendHotelRestaurantMetaInfoList
        : devRecommendHotelRestaurantMetaInfoList
    const store = useStore()
    const ctx = useContext()
    const isLoading = ref(false)
    const { smoothScroll } = useScroll()
    const { addIntersectHandler, removeIntersectHandler } = useIntersectionObserver()
    const isActiveTapId = ref('tokyo')

    const editedHotelsInfoList: Ref<HotelsInfo[]> = ref([])
    const bannerImgSrc = ctx.app.$device.isDesktop
      ? require('~/static/img/lp/buffet_banner_pc.jpg')
      : require('~/static/img/lp/buffet_banner_sp.jpg')

    useFetch(async () => {
      if (Object.keys(store.getters['modules/hotelRestaurant/getHotelRestaurantList']).length > 0) {
        onEditHotelRestaurantList(store.getters['modules/hotelRestaurant/getHotelRestaurantList'])
        return
      }
      isLoading.value = true
      try {
        store.dispatch('modules/layout/setHeaderInfo', {
          layoutType: 9,
          headerTitle: 'グルメ'
        })
        const storeIds = tempHotelsInfoList.map((hotelsInfo) => {
          const temp = hotelsInfo.hotels.map((hotel) => {
            return hotel.storeInfo.id
          })
          return temp
        })
        await store.dispatch('modules/hotelRestaurant/fetchBuffetStoreList', { ids: storeIds.flat(), genreId: 1281 })
        onEditHotelRestaurantList(store.getters['modules/hotelRestaurant/getHotelRestaurantList'])
      } catch (err) {
        console.log(err)
      } finally {
        isLoading.value = false
      }
    })

    // ビュッフェが登録されてなかったらそのホテル表示しない
    // 表示されているホテルがない場合、そのprefectureも表示しない
    const onEditHotelRestaurantList = (value: HotelRestaurantList) => {
      editedHotelsInfoList.value = cloneDeep(tempHotelsInfoList)
      const isNotExistedBuffetMenuPrefectureCodes: string[] = []
      tempHotelsInfoList.forEach((hotelsInfo) => {
        hotelsInfo.hotels.forEach((hotel) => {
          if (!value[hotel.storeInfo.id]?.menus?.length) {
            const deleteTargetHotelsInfoIdx = editedHotelsInfoList.value.findIndex(
              (editedHotelsInfo) => editedHotelsInfo.prefectureCode === hotelsInfo.prefectureCode
            )
            const deleteTargetHotelIdx = editedHotelsInfoList.value[deleteTargetHotelsInfoIdx]?.hotels.findIndex(
              (targetHotel) => targetHotel.storeInfo.id === hotel.storeInfo.id
            )
            if (deleteTargetHotelIdx !== -1) {
              editedHotelsInfoList.value[deleteTargetHotelsInfoIdx]?.hotels.splice(deleteTargetHotelIdx, 1)
            }
            if (editedHotelsInfoList.value[deleteTargetHotelsInfoIdx]?.hotels.length === 0) {
              isNotExistedBuffetMenuPrefectureCodes.push(
                editedHotelsInfoList.value[deleteTargetHotelsInfoIdx].prefectureCode
              )
            }
          }
        })
      })
      isNotExistedBuffetMenuPrefectureCodes.forEach((prefectureCode) => {
        const idx = editedHotelsInfoList.value.findIndex(
          (editedHotelsInfo) => editedHotelsInfo.prefectureCode === prefectureCode
        )
        editedHotelsInfoList.value.splice(idx, 1)
      })
    }

    watch(
      // Hydrationの場合、fetch処理の内にある非同期処理を待たずにmountedが実行され
      // addIntersectHandlerがうまく登録できないのでwatchで対応
      [isLoading, editedHotelsInfoList],
      ([a, b]) => {
        if (!a && b.length > 0) {
          nextTick(() => {
            const targets: Element[] = []
            editedHotelsInfoList.value.forEach((hotelsInfo) => {
              const node = document.querySelector(`#${hotelsInfo.prefectureCode}`)
              if (node) {
                targets.push(node)
              }
            })
            addIntersectHandler(targets, (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  isActiveTapId.value = entry.target?.id
                }
              })
            })
          })
        }
      },
      {
        deep: true
      }
    )

    onMounted(async () => {
      const targets: Element[] = []
      editedHotelsInfoList.value.forEach((hotelsInfo) => {
        const node = document.querySelector(`#${hotelsInfo.prefectureCode}`)
        if (node) {
          targets.push(node)
        }
      })
      addIntersectHandler(targets, (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isActiveTapId.value = entry.target?.id
          }
        })
      })
      const storeIds = tempRecommendHotelRestaurantMetaInfoList.map((metaInfo) => metaInfo.storeId.toString())
      await store.dispatch('modules/hotelRestaurant/fetchRecommendHotelRestaurantList', { ids: storeIds })
    })
    onUnmounted(() => {
      removeIntersectHandler()
    })

    const recommendHotelRestaurantList = computed(
      () => store.getters['modules/hotelRestaurant/getRecommendHotelRestaurantList'] || []
    )

    return {
      isLoading,
      hotelsInfoList,
      isActiveTapId,
      smoothScroll,
      editedHotelsInfoList,
      recommendHotelRestaurantList,
      bannerImgSrc
    }
  },
  head: {
    title: 'ホテルビュッフェ・アフタヌーンティー特集',
    titleTemplate: '%s | スカイチケット',
    meta: [
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'ビュッフェ,ブッフェ,アフタヌーンティー,スイーツビュッフェ,ホテルビュッフェ,ホテルレストラン,ランチ,ディナー,バイキング,食べ放題,グルメ,デート,記念日,女子会,国内ホテル, スカイチケット, skyticket'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '絶品ビュッフェ・アフタヌーンティーが楽しめる全国のホテルレストランを厳選！記念日や女子会、デートでのご利用におすすめな有名ホテルのランチビュッフェ、スイーツビュッフェをスカイチケットで予約・検索。'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '絶品ビュッフェ・アフタヌーンティーが楽しめる全国のホテルレストランを厳選！記念日や女子会、デートでのご利用におすすめな有名ホテルのランチビュッフェ、スイーツビュッフェをスカイチケットで予約・検索。'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ホテルビュッフェ・アフタヌーンティー特集 | スカイチケット'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'ホテルビュッフェ・アフタヌーンティー特集 | スカイチケット'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://skyticket.jp/gourmet/restaurant/campaign/hotel_buffet'
      }
    ]
  }
})
</script>

<style lang="sass" scoped>
.hotel-buffet
  padding: 0 0 32px 0 !important
  .divide-line
    display: block
    height: 8px
    background-color: $light_gray
  .header
    .breadcrumbs
      display: flex
      margin: 16px
      .-text
        color: $main_color
        font-size: $font_size_tiny
        text-decoration: underline
        font-weight: normal
        &.-active
          color: $black
          text-decoration: none
        &:hover
          opacity: 0.6
      .divide
        display: inline-block
        margin: 0 8px
    .key-visual
      .-image
        height: 200px
        img
          width: 100%
          height: 100%
          object-fit: cover
      .-info
        margin: 16px
  .main
    margin-bottom: 16px
    -ms-overflow-style: none
    scrollbar-width: none
    ::-webkit-scrollbar
      height: 0px
    .tab
      display: flex
      margin-bottom: 16px
      border-bottom: solid 1px #ccc
      overflow-x: scroll
      position: sticky
      top: 0
      z-index: 999
      background-color: $white
      .tab-item
        cursor: pointer
        flex: 1
        display: flex
        align-items: center
        justify-content: center
        font-size: $font_size_small
        min-width: 80px
        height: 52px
        &.active
          font-weight: 600
          color: $sub_color
          border-bottom: 3px solid $sub_color
          padding-top: 3px
    .hotel-list
      .hotel-item
        .title
          display: flex
          background-color: rgba(220, 240, 255, 1)
          padding-left: 24px
          align-items: center
          height: 52px
          font-size: 22px
          margin-bottom: 24px
  .carousel
    padding-left: 16px
    .carousel-title
      margin: 24px 0 16px 0
@include pc_view
  .hotel-buffet
    padding: 0 0 40px 0 !important
    max-width: none
    .header
      .breadcrumbs
        width: 1000px
        margin: 16px auto
        font-size: 14px
      .key-visual
        .-image
          height: 440px
        .-info
          width: 1000px
          margin: 16px auto
          padding: 0 16px
    .main
      width: 1000px
      margin: 0 auto 16px auto
      .tab
        .tab-item
          font-size: 16px
          &.active
            color: $black
      .hotel-list
        .hotel-item
          .title
            height: 60px
            font-size: 28px
            margin: 24px 0
    .carousel
      width: 1000px
      margin: auto
      .carousel-title
        margin: 40px 0 16px 0
</style>
