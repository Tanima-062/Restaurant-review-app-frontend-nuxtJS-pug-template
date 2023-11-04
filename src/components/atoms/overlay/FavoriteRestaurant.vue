<template lang="pug">
div(v-if='favoriteRestaurant')
  paragraph.alert(fontSize='large', v-if='favoriteRestaurant.length === 0') お探しの条件は見つかりませんでした。
  .favorite-restaurant(v-else)
    .box(v-for='(restaurantData, index) in favoriteRestaurant')
      nuxt-link.recommendcard(
        :to='`/restaurant/detail/takeout/${restaurantData.id}`'
      )
        .databox(:class='{ even: index % 2 !== 0 }')
          .imgarea
            img.imgs(
              v-if='restaurantData.storeImage.imageUrl',
              :src='restaurantData.storeImage.imageUrl + "?imwidth=180&imdensity=1"'
            )
            no-image.imgs(v-else)
          .description
            paragraph-bold.name(fontSize='small') {{ restaurantData.name }}
            paragraph.access(fontSize='tiny') {{ restaurantData.access }}
            .price
              .price-day(v-if='restaurantData.daytimeBudgetLowerLimit')
                day-icon.-dayicon
                paragraph(fontSize='tiny') {{ restaurantData.daytimeBudgetLowerLimit }}円 〜
              .price-day(v-else)
                day-icon.-dayicon
                paragraph(fontSize='tiny') ---
              .price-night(v-if='restaurantData.nightBudgetLowerLimit')
                night-icon.-nighticon
                paragraph(fontSize='tiny') {{ restaurantData.nightBudgetLowerLimit }}円 〜
              .price-night(v-else)
                night-icon.-nighticon
                paragraph(fontSize='tiny') ---
      .close(@click='removeFavorite(restaurantData.id)')
        cross.-icon
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Warning from '~/assets/icon/warning.svg'
import Info from '~/assets/icon/info-button-fill.svg'
import NoImage from '~/components/atoms/noImage/index.vue'
import dayIcon from '~/assets/icon/day.svg'
import nightIcon from '~/assets/icon/night.svg'
import Cross from '~/assets/icon/cross-gray.svg'
import { FavoriteTypes } from '~/types/FavoriteTypes'

import { Paragraph, ParagraphBold, SpanBold, Span } from '~/components/atoms/typography/'

@Component({
  components: {
    Span,
    Warning,
    Info,
    SpanBold,
    Paragraph,
    ParagraphBold,
    NoImage,
    dayIcon,
    nightIcon,
    Cross
  }
})
export default class FavoriteRestaurant extends Vue {
  @Prop() keys!: number
  @Prop() favoriteRestaurant!: Array<FavoriteTypes.RestaurantTypes>

  removeFavorite(restaurantId: number) {
    const sendData = {
      judge: this.isLogin,
      id: restaurantId,
      appCd: 'RS'
    }
    this.$store.dispatch('modules/favorite/DeleteFavorite', sendData)
    this.$store.dispatch('modules/favorite/removeRestaurant', restaurantId)
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }
}
</script>
<style lang="sass" scoped>
.alert
  text-align: center
.favorite-restaurant
  display: grid
  row-gap: 8px
  margin-bottom: 32px
  .box
    position: relative
    width: calc(100vw - 32px)
    &:active
      opacity: 0.6
    .recommendcard
      .databox
        display: flex
        width: 100%
        background-color: $light_gray
        gap: 8px
        .imgarea
          width: 123px
          min-width: 123px
          height: 92px
          .imgs
            width: 100%
            height: 100%
        .description
          width: calc(100vw - 187px)
          padding: 8px 0
          .name
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .access
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
            overflow: hidden
          .price
            display: flex
            flex-wrap: wrap
            gap: 4px
            .price-day
              display: flex
              align-items: center
              gap: 4px
              .-dayicon
                width: 12px
                height: 12px
            .price-night
              display: flex
              align-items: center
              gap: 4px
              .-nighticon
                width: 12px
                height: 12px
    .close
      position: absolute
      top: 8px
      right: 8px
      .-icon
        width: 12px !important
        height: 12px !important
@include pc_view
  .favorite-restaurant
    display: grid
    grid-template-columns: 1fr 1fr
    row-gap: 24px
    column-gap: 8px
    .alert
    .box
      position: relative
      width: 100%
      &:hover
        opacity: 0.6
      .recommendcard
        .databox
          display: flex
          background-color: $light_gray
          gap: 16px
          .imgarea
            width: 180px
            min-width: 180px
            height: 135px
            .imgs
              width: 100%
              height: 100%
          .description
            width: 100%
            padding: 8px 0
            .name
              width: 160px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
            .price
              display: flex
              align-items: center
              .-dayicon
                width: 12px
                height: 12px
              .dayMininum
              .-nighticon
                width: 12px
                height: 12px
              .dayMininum
      .close
        position: absolute
        top: 8px
        right: 8px
        .-icon
          width: 12px !important
          height: 12px !important
</style>
