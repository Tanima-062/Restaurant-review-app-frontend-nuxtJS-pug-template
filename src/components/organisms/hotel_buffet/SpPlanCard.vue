<template lang="pug">
.sp-plan-card(@click="clickHandler")
  .sp-plan-image
    img(
      :src="menu.image.imageUrl"
    )
    .title {{ menu.name }}
    .shadow
  .sp-plan-info
    .description {{ menu.description }}
    .bottom
      .price
        span.num ¥{{ $moneyFormat(Number(menu.price.price)) }}〜
        span (税込)
      .link
        .text 詳細を見る
        arrow-right.icon

</template>

<script lang="ts">
import { defineComponent, PropType, useContext, useRouter, useStore } from '@nuxtjs/composition-api'
import { initVisitProperty } from '~/plugins/util'
import { BuffetMenu } from '~/types/hotelRestaurantTypes'
import ArrowRight from '~/assets/icon/arrow-right.svg'

export default defineComponent({
  name: 'SpPlanCard',
  components: {
    ArrowRight
  },
  props: {
    menu: {
      type: Object as PropType<BuffetMenu>,
      required: true
    },
    storeId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const context = useContext()
    const router = useRouter()

    const clickHandler = () => {
      if (Object.keys(props.menu?.shortestAvailableDate).length > 0) {
        let hhmm = props.menu.shortestAvailableDate.time.substring(0, 5)
        if (!context.$isTime(hhmm)) {
          hhmm = '19:00'
        }
        store.dispatch('modules/search_store/setSearchBoxRS', {
          visitDate: props.menu.shortestAvailableDate.date,
          visitTime: hhmm,
          visitPeople: props.menu.shortestAvailableDate.headcount
        })
      } else {
        store.dispatch(
          'modules/search_store/setSearchBoxRS',
          initVisitProperty({ visitDate: undefined, visitTime: undefined, visitPeople: undefined })
        )
      }
      router.push(`/restaurant/detail/takeout/${props.storeId}/?type=plan`)
    }

    return {
      clickHandler
    }
  }
})
</script>

<style lang="sass" scoped>
.sp-plan-card
  border-radius: 3px
  box-shadow: 0 0 4px 0 rgba(166, 166, 166, 0.4)
  background-color: $white
  .sp-plan-image
    width: 100%
    height: 150px
    background-color: $dark_gray
    margin-right: 24px
    position: relative
    border-top-left-radius: 3px
    border-top-right-radius: 3px
    img
      width: 100%
      height: 100%
      object-fit: cover
      border-top-left-radius: 3px
      border-top-right-radius: 3px
    .title
      position: absolute
      color: $white
      font-weight: 600
      padding: 0 16px
      bottom: 8px
      z-index: 1
    .shadow
      box-sizing: border-box
      border-top-left-radius: 3px
      border-top-right-radius: 3px
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, #222)
  .sp-plan-info
    padding: 0 16px 16px 16px
    border-bottom-left-radius: 3px
    border-bottom-right-radius: 3px
    .description
      font-size: 14px
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-line-clamp: 3
      -webkit-box-orient: vertical
      margin: 8px 0 16px 0
    .bottom
      display: flex
      align-items: center
      justify-content: space-between
      .price
        font-size: 14px
        .num
          color: #ff1d1c
          font-size: 20px
          font-weight: 600
      .link
        display: flex
        line-height: 1
        margin-top: 8px
        .text
          font-size: 14px
          color: $main_color
        .icon
          color: $black
</style>
