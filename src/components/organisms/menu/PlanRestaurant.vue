<template lang="pug">
.sideMenusContents
  api-loading.planLoading(:loading='loading')
  template(v-if='restaurantMenu && restaurantMenu.length')
    paragraph-bold.texts(fontSize='large') プランを選ぶ
    .planCard(v-for='(plan, i) in restaurantMenu')
      .planTop
        .planImg
          img(:src='plan.thumbImage.imageUrl', width='130', height='auto')
        .planDetail
          .courseStatus(v-if='plan.freeDrinks')
            paragraph(fontSize='tiny', letterSpacing='none') 飲み放題
          paragraph.planname-wrapper
            span-bold.planname(fontSize='small') {{ plan.name }}
            Span.menucount(fontSize='tiny', v-if='plan.numberOfCourse > 0 && !plan.onlySeat') 全{{ plan.numberOfCourse }}品
          .course-info-top
            paragraph.infomations
              user-shape-icon#-icon
              Span#ml(fontSize='tiny') {{ isMinCheck(plan.availableNumberOfLowerLimit) }}~{{ isMaxCheck(plan.availableNumberOfUpperLimit) }}名様
            paragraph.price-wrapper(v-if='!plan.onlySeat')
              span-bold.price(fontSize='medium') ¥{{ $moneyFormat(Number(plan.price.price)) }}
              Span.tax(fontSize='tiny') （税込）
            paragraph.price-wrapper(v-else)
              span-bold.price(fontSize='medium') 当日会計
          no-ssr
            .planDescription-wrapper(v-if='$window.width > 767')
              paragraph.planDescription(fontSize='tiny') {{ plan.description }}
          no-ssr
            .planBottom(v-if='$window.width > 767 && !plan.onlySeat')
              CTA-color-button.reservationBtn(
                color='primary',
                type='primary',
                radius='3px',
                text='このプランを選択',
                @click='pageShow(plan.id)'
              )
            .planBottom(v-else-if='$window.width > 767 && plan.onlySeat')
              CTA-color-button.reservationBtn(
                color='primary',
                type='primary',
                radius='3px',
                text='席のみを予約',
                @click='pageShow(plan.id)'
              )
      no-ssr
        .planDescription-wrapper(v-if='$window.width < 768')
          paragraph.planDescription(fontSize='tiny') {{ plan.description }}
      no-ssr
        .planBottom(v-if='$window.width < 768 && !plan.onlySeat')
          CTA-color-button.reservationBtn(
            color='primary',
            type='primary',
            radius='3px',
            text='このプランを選択',
            @click='pageShow(plan.id)'
          )
        .planBottom(v-else-if='$window.width < 768 && plan.onlySeat')
          CTA-color-button.reservationBtn(
            color='primary',
            type='primary',
            radius='3px',
            text='席のみを予約',
            @click='pageShow(plan.id)'
          )
      hr.sectionLast(v-if='i !== restaurantMenu.length - 1')
  template(v-else-if='!loading && restaurantMenu && !restaurantMenu.length')
    hr.sectionLast
    .noPlans
      paragraph-bold.-head.title(fontSize='small') Web予約できるプランがございません。
      paragraph.-head.description.secondDesc(fontSize='small' v-if='restaurantInfo.telOrder') 電話にて予約ができる場合がございますので、店舗へお問い合わせください。
      hr.sectionLast(v-if='restaurantInfo.telOrder')
      paragraph-bold.-head.title(fontSize='small' v-if='restaurantInfo.telOrder') 予約専用電話番号
      a(:href='restaurantInfo.telOrder' v-if='restaurantInfo.telOrder') {{ restaurantInfo.telOrder }}
      paragraph-bold.-head.title.secondTel(fontSize='small' v-if='restaurantInfo.telOrder') その他の問い合わせ
      a(:href='restaurantInfo.telOrder' v-if='restaurantInfo.telOrder') {{ restaurantInfo.tel }}
      paragraph.-head.description.secondDesc(fontSize='small' v-if='!restaurantInfo.telOrder') 電話にて予約ができる場合がございますので、店舗へお問い合わせください。
      hr.sectionLast(v-if='!restaurantInfo.telOrder')
      paragraph-bold.-head.title(fontSize='small' v-if='!restaurantInfo.telOrder') お問い合わせ
      a(:href='restaurantInfo.tel' v-if='!restaurantInfo.telOrder') {{ restaurantInfo.tel }}
    hr.sectionLast
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import CTAColorButton from '~/components/atoms/button/CtaColorButton.vue'
import ItemNav from '~/components/organisms/ItemNav.vue'
import AmountButton from '~/components/atoms/button/AmountButton.vue'
import ClockIcon from '~/assets/icon/clock.svg'
import UserShapeIcon from '~/assets/icon/user-shape.svg'
import { RestaurantType } from '~/types/restaurantTypes'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'

@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    CTAButton,
    CTAColorButton,
    ItemNav,
    AmountButton,
    ClockIcon,
    UserShapeIcon,
    ApiLoading
  }
})
export default class PlanRestaurant extends Vue {
  @Prop() restaurantMenu!: RestaurantType.RestaurantMenu
  @Prop() loading!: boolean
  @Prop() maxPeople?: number

  // 店舗情報
  get restaurantInfo() {
    return this.$store.getters['modules/listStore/getStore']
  }

  @Emit()
  pageShow(_planId: number) {
    // 親に伝える
  }

  // 最小人数nullチェック
  isMinCheck(lowerLimit) {
    if (!lowerLimit) {
      return 1
    }
    return lowerLimit
  }

  // 最大人数nullチェック
  isMaxCheck(maxLimit) {
    if (!maxLimit) {
      if (this.maxPeople) {
        return this.maxPeople
      } else {
        return '-'
      }
    }
    return maxLimit
  }
}
</script>
<style lang="sass" scoped>
.noPlans
  display: flex
  flex-flow: column
  justify-content: center
  align-items: center
.secondTel
  margin-top: 10px
.secondDesc
  margin-top: 5px
.sideMenusContents
  position: relative
  padding: 0 16px
  min-height: inherit
  .-warn
    display: flex
    justify-content: center
    align-items: center
    min-height: inherit
    color: #4d4d4d
  .texts
    width: 100%
    margin-top: 20px
  .planLoading
    position: absolute
    left: 0
    width: 100%
    height: 100%
  .planCard
    margin-top: 24px
    .planTop
      display: flex
      .planImg
        min-width: 123px
        height: 92px
        img
          object-fit: cover
          min-width: 123px
          max-width: 100%
          height: inherit
      .planDetail
        padding-left: 8px
        width: 100%
        .courseStatus
          display: flex
          justify-content: center
          align-items: center
          border-radius: 2px
          border: solid 1px #a6a6a6
          height: 20px
          width: 55px
          text-align: center
          margin-left: 0
        .menucount
          margin-left: 4px
        #ml
        .infomations
          display: flex
          align-items: center
          #-icon
            width: 12px
            height: 12px
            margin-right: 4px
            fill: #4d4d4d
        .price-wrapper
          display: flex
          justify-content: flex-end
          align-items: flex-end
    .course-info-top
    .planDescription-wrapper
      margin-top: 8px
      .planDescription
        white-space: pre-wrap
        font-size: 12px
    .planBottom
      display: flex
      justify-content: flex-end
      margin-top: 16px
      margin-bottom: 24px
      .reservationBtn
        width: 200px
        height: 45px
        text-align: center
    .sectionLast
      width: 100%
      background-color: #e4e4e4
@include pc_view
  .sideMenusContents
    .-warn
      font-size: 16px
    .texts
      width: 100%
      margin-top: 30px
    .planCard
      margin-top: 24px
      .planTop
        display: flex
        .planImg
          min-width: 241px
          height: 181px
          img
            min-width: 241px
            height: 181px
        .planDetail
          padding-left: 8px
          width: 100%
          .courseStatus
            display: flex
            justify-content: center
            align-items: center
            border-radius: 2px
            border: solid 1px #a6a6a6
            height: 20px
            width: 55px
            text-align: center
            margin-left: 0
          .planname-wrapper
            margin-top: 8px
            .planname
              margin-top: 8px
              font-size: 16px
          .menucount
            font-size: 12px
            margin-left: 4px
          #ml
            margin-left: 6px
            font-size: 12px
          .infomations
            display: flex
            align-items: center
            #-icon
              width: 16px
              height: 16px
              fill: #4d4d4d
          .price-wrapper
            text-align: right
            .price
              font-size: 20px
            .tax
              font-size: 12px
      .course-info-top
        display: flex
        justify-content: space-between
      .planDescription-wrapper
        min-height: 54px
        margin-top: 16px
        .planDescription
          font-size: 16px
      .planBottom
        display: flex
        justify-content: flex-end
        margin-top: 24px
        margin-bottom: 52px
        .reservationBtn
          width: 200px
          height: 45px
          font-size: 20px
          text-align: center
      .sectionLast
        width: 100%
        background-color: #e4e4e4
</style>
