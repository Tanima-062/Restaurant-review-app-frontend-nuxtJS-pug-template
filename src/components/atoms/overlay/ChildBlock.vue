<template lang="pug">
.ChildBlock
  paragraph.notfound(fontSize='large', v-if='favoriteMenus.length === 0') お探しの条件は見つかりませんでした。
  .grid-container(v-else, :class='[type === 2 ? "grid-texts" : ""]')
    .box(v-for='(menu, i) in favoriteMenus')
      .area.-img
        img.img-data.-img.photos(
          v-if='menu.thumbImage.imageUrl',
          :src='menu.thumbImage.imageUrl + "?imwidth=240&imdensity=1"',
          @click='clickimg(menu.id)',
          :alt='menu.name',
          loading='lazy',
          width='100%',
          height='130px'
        )
        .white
          cross-icon.icons(@click='deleteFav(menu.id)')
  menu-modal(
    v-if='(type === 1) | (type === 2)',
    :is-active='isModalVisible',
    :is-favorite='isFavorite',
    :comparison-date='date',
    :comparison-time='time',
    @close='isModalVisible = false'
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
import CrossIcon from '~/assets/icon/cross-gray.svg'
import { FavoriteTypes } from '~/types/FavoriteTypes'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    MenuModal,
    ImageModal,
    CrossIcon
  }
})
export default class ChildBlock extends Vue {
  @Prop() date!: string
  @Prop() time!: string
  @Prop({ default: 2 }) type
  @Prop({ default: false }) isFavorite!: boolean
  @Prop() favoriteMenus!: Array<FavoriteTypes.TakeoutTypes>
  private isModalVisible = false
  isShow = false

  async clickimg(id) {
    const param = {
      id,
      query: {
        pickUpDate: this.date,
        pickUpTime: this.time
      }
    }
    await this.$store.dispatch('modules/menu/getTakeoutMenu', param)
    this.isModalVisible = true
  }

  searchpush(): void {
    this.isModalVisible = false
    this.$router.push('/takeout')
  }

  deleteFav(selectID: number) {
    const sendData = {
      judge: this.isLogin,
      id: selectID,
      appCd: 'TO'
    }
    this.$store.dispatch('modules/favorite/DeleteFavorite', sendData)
    this.$store.dispatch('modules/favorite/removeMenus', selectID)
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
.ChildBlock
  .notfound
    text-align: center
    margin: 50px 0
  .grid-container
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 1px
    .area
      position: relative
      .white
        position: absolute
        top: 5px
        right: 0
        margin-right: 7px
        width: 30px
        background-color: #ffffff
        border-radius: 50px
        &:hover
          opacity: 0.6
      .icons
        top: 6px
        right: 0
        width: 20px
        fill: $white
        z-index: 2
        margin-left: 5px
        padding-top: 5px
    .-img
      width: 100%
      height: 130px
      object-fit: cover
      cursor: pointer
      &:hover
        opacity: 0.9
    .photos
      z-index: 1
@media screen and (min-width: 1024px)
  .ChildBlock
    .grid-container
      display: grid
      grid-template-columns: 1fr 1fr 1fr 1fr
      grid-gap: 10px 10px
      .-img
        width: 100%
        height: 200px
</style>
