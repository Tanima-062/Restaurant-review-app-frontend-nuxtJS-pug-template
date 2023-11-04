<template lang="pug">
.plan-card(@click="clickHandler")
  img.plan-image(
    :src="menu.image.imageUrl"
  )
  .plan-info
    .top
      .title {{ menu.name }}
      .description {{ menu.description }}
    .bottom
      .price
        span.num ¥{{ $moneyFormat(Number(menu.price.price)) }}〜
        span (税込)
      .link
        .text プラン詳細を見る
        arrow-right.icon

</template>

<script lang="ts">
import { defineComponent, PropType, useContext, useStore, useRouter } from '@nuxtjs/composition-api'
import { initVisitProperty } from '~/plugins/util'
import { BuffetMenu } from '~/types/hotelRestaurantTypes'
import ArrowRight from '~/assets/icon/arrow-right.svg'

export default defineComponent({
  name: 'PlanCard',
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
        let HHmm = props.menu.shortestAvailableDate.time.substring(0, 5)
        if (!context.$isTime(HHmm)) {
          HHmm = '19:00'
        }
        store.dispatch('modules/search_store/setSearchBoxRS', {
          visitDate: props.menu.shortestAvailableDate.date,
          visitTime: HHmm,
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
.plan-card
  display: flex
  padding: 16px
  border-radius: 3px
  border: solid 1px #ccc
  min-height: 160px
  margin-bottom: 24px
  cursor: pointer
  &:hover
    opacity: 0.7
    .link
      .text
        color: $main_color_hover
  .plan-image
    min-width: 230px
    height: 128px
    margin-right: 24px
    object-fit: cover
  .plan-info
    display: flex
    flex-direction: column
    justify-content: space-between
    flex: 1
    .top
      .title
        margin-bottom: 8px
        font-weight: 600
      .description
        font-size: 14px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
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
        margin-top: 6px
        .text
          font-size: 14px
          color: $main_color
        .icon
</style>
