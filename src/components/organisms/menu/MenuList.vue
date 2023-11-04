<template lang="pug">
.MenuList
  .grid-container(:class='[type === 2 ? "grid-texts" : ""]')
    full-loading(:isLoading='isLoading')
    template(v-for='(menu, i) in takeoutMenus', v-if='takeoutMenus')
      .area.-img
        .img-wrapper
          img.-img.photos(
            v-if='takeoutMenus[i][0]',
            :src='takeoutMenus[i][0].thumbImage.imageUrl + "?imwidth=320&imdensity=1"',
            @click='clickimg(takeoutMenus[i][0].id)',
            :alt='takeoutMenus[i][0].name',
            width='100%',
            height='140px',
            :class='judgeInList(takeoutMenus[i][0].id) ? "not" : "hoverTrue"'
          )
          check-icon.-checkicon(v-if='judgeInList(takeoutMenus[i][0].id)')
          .checkedMark(v-if='judgeInList(takeoutMenus[i][0].id)')
        div(v-if='textFlag && takeoutMenus[i][0]')
          paragraph-bold#onImgText(fontSize='tiny') {{ takeoutMenus[i][0].name }}
          paragraph-bold#onImgPrice(fontSize='tiny') ¥{{ $moneyFormat(Number(takeoutMenus[i][0].price.price)) }}
      .area.-img(v-if='takeoutMenus[i][1]')
        .img-wrapper
          img.-img.photos(
            v-if='takeoutMenus[i][1].thumbImage && takeoutMenus[i][1].thumbImage.imageUrl',
            :src='takeoutMenus[i][1].thumbImage.imageUrl + "?imwidth=320&imdensity=1"',
            @click='clickimg(takeoutMenus[i][1].id)',
            :alt='takeoutMenus[i][1].name',
            width='100%',
            height='140px',
            :class='judgeInList(takeoutMenus[i][1].id) ? "not" : "hoverTrue"'
          )
          check-icon.-checkicon(v-if='judgeInList(takeoutMenus[i][1].id)')
          .checkedMark(v-if='judgeInList(takeoutMenus[i][1].id)')
        div(v-if='textFlag && takeoutMenus[i][1]')
          paragraph-bold#onImgText(fontSize='tiny') {{ takeoutMenus[i][1].name }}
          paragraph-bold#onImgPrice(fontSize='tiny') ¥{{ $moneyFormat(Number(takeoutMenus[i][1].price.price)) }}
      .area.-img(v-if='takeoutMenus[i][2]')
        .img-wrapper
          img.-img.photos(
            v-if='takeoutMenus[i][2].thumbImage && takeoutMenus[i][2].thumbImage.imageUrl',
            :src='takeoutMenus[i][2].thumbImage.imageUrl + "?imwidth=320&imdensity=1"',
            @click='clickimg(takeoutMenus[i][2].id)',
            :alt='takeoutMenus[i][2].name',
            width='100%',
            height='140px',
            :class='judgeInList(takeoutMenus[i][2].id) ? "not" : "hoverTrue"'
          )
          check-icon.-checkicon(v-if='judgeInList(takeoutMenus[i][2].id)')
          .checkedMark(v-if='judgeInList(takeoutMenus[i][2].id)')
        div(v-if='textFlag && takeoutMenus[i][2]')
          paragraph-bold#onImgText(fontSize='tiny') {{ takeoutMenus[i][2].name }}
          paragraph-bold#onImgPrice(fontSize='tiny') ¥{{ $moneyFormat(Number(takeoutMenus[i][2].price.price)) }}
  menu-modal(
    :isActive='isModalVisible',
    :footerType='type',
    :judge='storejudge',
    @close='isModalVisible = false',
    v-if='(type === 1) | (type === 2)'
  )
  image-modal(
    :isActive='isModalVisible',
    @close='isModalVisible = false',
    @searchPush='searchpush',
    v-if='type === 3'
  )
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import MenuModal from '~/components/organisms/menu/MenuModal.vue'
import ImageModal from '~/components/organisms/menu/ImageModal.vue'
import CrossIcon from '~/assets/icon/modal-close.svg'
import CheckIcon from '~/assets/icon/checkmark.svg'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    MenuModal,
    ImageModal,
    FullLoading,
    CrossIcon,
    CheckIcon
  }
})
export default class MenuList extends Vue {
  @Prop({ default: 2 }) type
  @Prop({ default: true }) textFlag
  @Prop({ default: false }) storejudge
  private isModalVisible = false
  isShow = false
  isLoading = false
  async clickimg(id) {
    this.isLoading = true
    const a = this.$store.getters['modules/reservationGourmet/getApplicationTO']
    const param = {
      id,
      query: {
        pickUpDate: a.pickUpDate,
        pickUpTime: a.pickUpTime
      }
    }
    await this.$store.dispatch('modules/menu/getTakeoutMenu', param)
    this.isLoading = false
    this.isModalVisible = true
  }

  get takeoutMenus() {
    const takeout = this.$store.getters['modules/listStore/getTakeout']
    if (takeout) {
      return this.sliceByNumber(takeout, 3)
    }
  }

  sliceByNumber(array, number: number) {
    if (array.length !== 0) {
      const length = Math.ceil(array.length / number)
      return new Array(length).fill(0, 0, array.length).map((_, i) => array.slice(i * number, (i + 1) * number))
    }
  }

  get cartList() {
    const selectedBox: string[] = []
    const mL = this.$store.getters['modules/reservationGourmet/getMenu']
    for (let i = 0; i < mL.length; i++) {
      selectedBox.push(mL[i].menu.id)
    }
    return selectedBox
  }

  judgeInList(id) {
    const data = this.cartList
    let flag = false
    for (let i = 0; i < data.length; i++) {
      if (id === this.cartList[i]) {
        flag = true
      }
    }
    return flag
  }
}
</script>
<style lang="sass" scoped>
.grid-container
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-gap: 8px
  justify-content: center
  @media screen and (min-width: 376px) and (max-width: 1024px)
    grid-template-columns: repeat(auto-fill,184px)
  .area
    position: relative
    .checkedMark
      position: absolute
      left: 0
      top: 0
      border-style: solid
      border-width: 45px 45px 0 0
      border-color: #ffdd00 transparent transparent transparent
    .-checkicon
      position: absolute
      left: 5px
      top: 0
      width: 20px
      z-index: 1
      fill: white
  .-img
    width: 100%
    min-height: 140px
    object-fit: cover
    @media screen and (min-width: 376px) and (max-width: 1024px)
      width: 184px
      min-height: 138px
  .hoverTrue:hover
    opacity: 0.6
  .photos
    z-index: 1
  #onImgCount
    margin: 10px auto
  #onImgText
    color: black
    padding-left: 2px
  #onImgPrice
    color: black
    text-align: right
    padding-right: 2px
    margin-bottom: 16px
  .filter
    filter: invert(25%)
.grid-texts
  display: grid
  grid-template-areas: "area1 area2"
  grid-gap: 0px 8px
  overflow: scroll
  -ms-overflow-style: none
  scrollbar-width: none
  .area1
    grid-area: area1
  .area2
    grid-area: area2
  .-img
    width: 100%
    object-fit: cover
  #onImgCount
    margin: 10px auto
  #onImgText
    color: black
    padding-left: 2px
    line-height: 1.3
  #onImgPrice
    color: black
    text-align: right
    padding-right: 2px
  .filter
    filter: invert(25%)
.grid-texts::-webkit-scrollbar
  display: none
@media screen and (min-width: 1024px)
  .grid-container
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-gap: 10px 10px
    .-img
      width: 100%
      min-height: 186px
      object-fit: cover
      cursor: pointer
  .grid-texts
    display: grid
    grid-template-areas: "area1 area2 area3 area4"
    grid-gap: 10px 10px
    .area1
      grid-area: area1
    .area2
      grid-area: area2
    .area3
      grid-area: area3
    .area4
      grid-area: area4
    .-img
      width: 100%
    #onImgCount
      margin: 10px auto
    #onImgText
      color: black
      padding-left: 2px
      line-height: 1.5
    #onImgPrice
      color: black
      text-align: right
      padding-right: 2px
    .filter
      filter: invert(25%)
</style>
