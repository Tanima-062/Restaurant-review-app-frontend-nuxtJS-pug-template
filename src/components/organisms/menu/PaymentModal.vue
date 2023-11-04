<template lang="pug">
base-drawer(:isActive='isActive', @close='closeDrawer', title='お支払い金額')
  .paymentModal
    .orderbox
      ul(
        v-if='orderedMenu',
        v-for='(item, num) in orderedMenu',
        :key='orderedMenu.menu'
      )
        li
          .orderflex
            #flexitem1
              paragraph(fontSize='medium', v-if='orderedMenu') {{ item.menu.name }} <br>
              paragraph-bold(fontSize='medium') ¥{{ $moneyFormat(Number(item.menu.price)) }}
                Span(fontSize='tiny') ×{{ item.menu.count }}
          .optionflex(v-if='item.options.length > 0')
            #flexitem1
              paragraph.fs-14(fontSize='tiny') オプション
              paragraph
                span-bold.fs-14(fontSize='tiny') ¥{{ optionTotalPrice(item.options) }}
                Span(fontSize='tiny') ×{{ item.menu.count }}
            #flexitem2
              div(v-for='opt in item.options')
                //- トッピングの時の処理
                paragraph.leftBorder.fs-14(
                  fontSize='tiny',
                  v-if='Array.isArray(opt)'
                ) トッピング:
                  div(v-for='topping in opt')
                    Span(fontSize='tiny') {{ topping.contents }} （¥{{ $moneyFormat(Number(topping.price)) }}）
                //- オプションの時の処理
                paragraph.leftBorder.fs-14(fontSize='tiny', v-else) {{ opt.keyword }} : {{ opt.contents }}（¥{{ $moneyFormat(Number(opt.price)) }}）
    hr.sectionLast
    .paymentAmount
      paragraph.text(fontSize='small') お支払い合計
      paragraph-bold.amount(fontSize='tiny') ¥
        span-bold(fontSize='medium') {{ $moneyFormat(Number(totalPrice(orderedMenu))) }}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit, Watch } from 'nuxt-property-decorator'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'

import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    CTAButton,
    BaseDrawer
  }
})
export default class PaymentModal extends Vue {
  @Prop({ default: false }) isActive!: boolean
  CurrentTab = 1
  @Emit('close')
  closeDrawer() {
    // 親に伝えるだけ
  }

  @Watch('isActive')
  async ConnectDetail() {
    if (this.isActive === true) {
      const menuList = this.$store.getters['modules/reservationGourmet/getMenu']
      // eslint-disable-next-line prettier/prettier
      const { pickUpDate, pickUpTime } = this.$store.getters['modules/reservationGourmet/getApplicationTO']
      for (let i = 0; i < menuList.length; i++) {
        const param = {
          id: menuList[i].menu.id,
          query: {
            pickUpDate,
            pickUpTime
          }
        }
        await this.$store.dispatch('modules/menu/getTakeoutMenu', param)
      }
    }
  }

  get menuNum() {
    return this.$store.getters['modules/reservationGourmet/getMenu'] // 個数とID
  }

  get menuDetail() {
    return this.$store.getters['modules/menu/getTakeoutMenu'] // 名前と金額
  }

  get orderedMenu() {
    if (this.$store.getters['modules/reservationGourmet/getMenu']) {
      return this.$store.getters['modules/reservationGourmet/getMenu']
    }
  }

  optionTotalPrice(list) {
    let allPrice = 0
    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) {
        for (let j = 0; j < list[i].length; j++) {
          allPrice = allPrice + Number(list[i][j].price)
        }
      } else {
        allPrice = allPrice + Number(list[i].price)
      }
    }
    return allPrice
  }

  totalPrice(orderedMenu) {
    let totalPrices = 0
    for (let i = 0; i < orderedMenu.length; i++) {
      totalPrices =
        totalPrices +
        Number(orderedMenu[i].menu.price) * orderedMenu[i].menu.count +
        Number(this.optionTotalPrice(orderedMenu[i].options)) * orderedMenu[i].menu.count
    }
    return totalPrices
  }

  switching(isState: number) {
    this.CurrentTab = isState
  }

  search() {
    this.$router.push('/takeout')
  }
}
</script>

<style lang="sass" scoped>
.paymentModal
  .paymentAmount
    display: flex
    align-items: center
    .text
      width: 60%
    .amount
      width: 30%
      text-align: right
    .icon
      width: 10%
      margin-left: auto
      margin-right: 0px
      width: 20px
      transform: rotate(90deg)
      fill: #e4e4e4
  .orderflex
    display: flex
    #flexitem1
      width: 70%
      margin: 15px 0px
      margin-left: 20px
    #flexitem2
      width: 30%
      margin: 15px 0
  .optionflex
    display: flex
    margin-left: 20px
    margin-bottom: 30px
    #flexitem1
      margin: 0px 10px 5px 20px
      width: 50%
    #flexitem2
      margin: 0px 0
      .leftBorder
        border-left: solid 2px $gray
        padding: 0 10px
  .sectionLast
    margin: 10px calc(50% - 46vw)
    height: 1px
    background-color: #e4e4e4
</style>
