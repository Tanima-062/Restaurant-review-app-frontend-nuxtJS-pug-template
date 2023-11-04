<template lang="pug">
.hotel-restaurant
  .hotel-info(v-for="(hotel, idx) in hotelsInfo.hotels" :key="hotel.name")
    .pc(v-if="$device.isDesktop")
      buffet-store-carousel-slider.store-image(
        :image-list='hotelRestaurantList[hotel.storeInfo.id].store.images'
        :is-show-nav-button="$device.isDesktop && hotelRestaurantList[hotel.storeInfo.id].store.images.length > 0"
        :is-show-pagination="hotelRestaurantList[hotel.storeInfo.id].store.images.length > 0"
        :on-auto-play="true"
        :per-page="1"
      )
      h3.store-info
        .store-name {{ hotel.storeInfo.name }}
        .hotel-name
          span
            service-hotel.hotel-icon
            span {{ hotel.name }}
          span
            location-icon.location-icon
            span {{ hotelRestaurantList[hotel.storeInfo.id]?.store?.area.middleAreaName }}
    .sp(v-else)
      h3.store-info
        .store-name {{ hotel.storeInfo.name }}
        .hotel-name
          span
            service-hotel.hotel-icon
            span {{ hotel.name }}
          span
            location-icon.location-icon
            span {{ hotelRestaurantList[hotel.storeInfo.id]?.store?.area.middleAreaName }}
      buffet-store-carousel-slider.store-image(
        :image-list='hotelRestaurantList[hotel.storeInfo.id].store.images'
        :is-show-nav-button="$device.isDesktop && hotelRestaurantList[hotel.storeInfo.id].store.images.length > 0"
        :is-show-pagination="hotelRestaurantList[hotel.storeInfo.id].store.images.length > 0"
        :on-auto-play="true"
        :per-page="1"
      )
    template(v-if="$device.isDesktop")
      plan-card(v-for="menu in hotelRestaurantList[hotel.storeInfo.id].menus" :menu="menu" :store-id="hotel.storeInfo.id")
    template(v-else)
      .sp-plan-card-wrapper
        sp-plan-card(v-for="menu in hotelRestaurantList[hotel.storeInfo.id].menus" :menu="menu" :store-id="hotel.storeInfo.id")
    .hotel-link-wrapper(v-if="hotel.id")
      a(
        target="_blank",
        rel="noopener noreferrer"
        :href="'https://skyticket.jp/hotel/detail/property_' + hotel.id"
      ) {{ `${hotel.name}の宿泊を予約する` }}
    .recommend-store(v-if="hotelRestaurantList[hotel.storeInfo.id].recommend && hotelRestaurantList[hotel.storeInfo.id].recommend.length > 0")
      h4.title このホテルのおすすめレストラン
      recommend-buffet-carousel-slider(
        :recommend-store-list='hotelRestaurantList[hotel.storeInfo.id].recommend'
        :is-show-pagination="!$device.isDesktop && hotelRestaurantList[hotel.storeInfo.id].store.images.length > 2"
        :on-auto-play="true"
        :per-page="1"
    )

</template>

<script lang="ts">
import { defineComponent, computed, PropType, useStore } from '@nuxtjs/composition-api'
import ServiceHotel from '~/assets/icon/service-hotel.svg'
import LocationIcon from '~/assets/icon/location.svg'
import PlanCard from '~/components/organisms/hotel_buffet/PlanCard.vue'
import SpPlanCard from '~/components/organisms/hotel_buffet/SpPlanCard.vue'
import BuffetStoreCarouselSlider from '~/components/atoms/carousel/BuffetStoreCarouselSlider.vue'
import RecommendBuffetCarouselSlider from '~/components/atoms/carousel/RecommendBuffetCarouselSlider.vue'
import { HotelRestaurantList, HotelsInfo } from '~/types/hotelRestaurantTypes'

export default defineComponent({
  name: 'HotelRestaurant',
  components: {
    ServiceHotel,
    LocationIcon,
    PlanCard,
    SpPlanCard,
    BuffetStoreCarouselSlider,
    RecommendBuffetCarouselSlider
  },
  props: {
    hotelsInfo: {
      type: Object as PropType<HotelsInfo>,
      required: true
    }
  },
  setup() {
    const store = useStore()

    const hotelRestaurantList = computed((): HotelRestaurantList => {
      return store.getters['modules/hotelRestaurant/getHotelRestaurantList']
    })

    return {
      hotelRestaurantList
    }
  }
})
</script>

<style lang="sass" scoped>
.hotel-restaurant
  .hotel-info
    border-bottom: 8px solid #f4f4f4
    .sp
      .store-info
        margin: 24px 0 8px 0
        padding: 0 16px
        .store-name
          font-size: 18px
        .hotel-name
          display: flex
          align-items: center
          font-size: $font_size_small
          font-weight: normal
          margin: 8px 0
          flex-wrap: wrap
          column-gap: 16px
          span
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            vertical-align: super
          .hotel-icon
            width: 24px
            height: 24px
            padding: 4px
            border-radius: 24px
            margin-right: 4px
            background-color: $light_gray
          .location-icon
            width: 24px
            height: 24px
            fill: $spare_gray
            padding: 4px
            border-radius: 24px
            margin-right: 4px
            background-color: $light_gray
      .store-image
        width: 100%
        height: 210px
        background-color: $light_gray
    .sp-plan-card-wrapper
      background-color: $light_gray
      padding: 24px 16px
      .sp-plan-card
        &:not(:first-child)
          margin-top: 24px
    .hotel-link-wrapper
      display: flex
      justify-content: end
      margin: 24px 0
      padding: 0 16px
      a
        font-size: $font_size_tiny
        text-decoration: underline
        color: $main_color
    .recommend-store
      margin: 32px 0
      padding: 0 16px
      .title
        margin-bottom: 16px

@include pc_view
  .hotel-restaurant
    .hotel-info
      border-bottom: none
      &:not(:first-child)
        border-top: 2px solid #f4f4f4 !important
        padding-top: 32px
      .pc
        display: flex
        margin-bottom: 24px
        .store-image
          width: 320px
          height: 180px
        .store-info
          margin-left: 32px
          .store-name
            font-size: $font_size_big
            line-height: 1
            margin-top: 8px
          .hotel-name
            display: flex
            flex-direction: column
            font-size: $font_size_medium
            font-weight: normal
            margin-top: 16px
            flex-wrap: wrap
            span
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              vertical-align: super
            .hotel-icon
              width: 28px
              height: 28px
              padding: 6px
              border-radius: 28px
              margin-right: 4px
              background-color: $light_gray
            .location-icon
              width: 28px
              height: 28px
              fill: $spare_gray
              padding: 6px
              border-radius: 28px
              margin-right: 4px
              background-color: $light_gray
      .hotel-link-wrapper
        margin: 32px 0
        padding: 0
        a
          width: fit-content
          font-size: $font_size_medium
      .recommend-store
        padding: 0
        .title
          font-size: 18px
</style>
