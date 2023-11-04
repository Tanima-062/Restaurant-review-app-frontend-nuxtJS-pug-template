<template lang="pug">
.ImageStoreBlock
  .grid-container(:class='[type === 2 ? "grid-texts" : ""]')
    template(v-for='(menu, i) in ImageMenus')
      .area.-img(v-if='ImageMenus[i][0]', @click='clickimg(ImageMenus[i][0])')
        img.img-data.-img(
          :data-src='ImageMenus[i][0].image.imageUrl + "?imwidth=220&imdensity=1"',
          :alt='ImageMenus[i][0].name',
          loading='lazy',
          width='100%',
          height='123px'
        )
      .area.-img(v-if='ImageMenus[i][1]', @click='clickimg(ImageMenus[i][1])')
        img.img-data.-img(
          :data-src='ImageMenus[i][1].image.imageUrl + "?imwidth=220&imdensity=1"',
          :alt='ImageMenus[i][1].name',
          loading='lazy',
          width='100%',
          height='123px'
        )
      .area.-img(v-if='ImageMenus[i][2]', @click='clickimg(ImageMenus[i][2])')
        img.img-data.-img(
          :data-src='ImageMenus[i][2].image.imageUrl + "?imwidth=220&imdensity=1"',
          :alt='ImageMenus[i][2].name',
          loading='lazy',
          width='100%',
          height='123px'
        )
  menu-modal(
    :isActive='isModalVisible',
    @close='isModalVisible = false',
    v-if='(type === 1) | (type === 2)'
  )
  image-modal(
    :isActive='isModalVisible',
    @close='isModalVisible = false',
    @searchPush='searchpush',
    v-if='type === 3 && !$feature("phase1")'
  )
  photo-modal(
    :isActive='isModalVisible',
    @close='isModalVisible = false',
    @searchPush='searchpush',
    :menuList='menus',
    v-if='type === 3 && $feature("phase1")'
  )
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import MenuModal from '~/components/organisms/menu/MenuModal.vue'
import ImageModal from '~/components/organisms/menu/ImageModal.vue'
import PhotoModal from '~/components/organisms/menu/PhotoModal.vue'
import CrossIcon from '~/assets/icon/modal-close.svg'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    MenuModal,
    ImageModal,
    PhotoModal,
    CrossIcon
  }
})
export default class ImageStoreBlock extends Vue {
  @Prop({ default: 2 }) type
  @Prop() stating
  private isModalVisible = false
  private menuDetail = []
  isShow = false

  mounted() {
    const watchDomArray = document.querySelectorAll('.img-data')
    const options = {
      root: null,
      rootMargin: '0px 0px 100px 0px',
      threshold: 0.1
    }
    const crossingMethod = function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
        }
      })
    }
    const observer = new IntersectionObserver(crossingMethod, options)
    for (let i = 0; i < watchDomArray.length; i++) {
      observer.observe(watchDomArray[i])
    }
  }

  async clickimg(menu) {
    await this.$store.dispatch('modules/listStore/ImageDetail', menu)
    this.isModalVisible = true
  }

  searchpush(): void {
    this.isModalVisible = false
    // this.$router.push('/takeout')
    location.reload()
  }

  get menus() {
    if (this.$store.getters['modules/listStore/getImage']) {
      if (this.stating === 1) {
        return this.$store.getters['modules/listStore/getImage']
      } else if (this.stating === 2) {
        return this.foodList
      } else if (this.stating === 3) {
        return this.naikanList
      } else {
        return this.otherList
      }
    }
  }

  sliceByNumber(array, number: number) {
    if (array.length !== 0) {
      const length = Math.ceil(array.length / number)
      return new Array(length).fill(0, 0, array.length).map((_, i) => array.slice(i * number, (i + 1) * number))
    }
  }

  get ImageMenus() {
    if (this.menus) {
      return this.sliceByNumber(this.menus, 3)
    }
  }

  get foodList() {
    const newlists: string[] = []
    const lists = this.$store.getters['modules/listStore/getImage']
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].image.imageCd === 'MENU_MAIN') {
        newlists.push(lists[i])
      }
    }
    return newlists
  }

  get naikanList() {
    const newlists: string[] = []
    const lists = this.$store.getters['modules/listStore/getImage']
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].image.imageCd === 'STORE_INSIDE' || lists[i].image.imageCd === 'STORE_OUTSIDE') {
        newlists.push(lists[i])
      }
    }
    return newlists
  }

  get otherList() {
    const newlists: string[] = []
    const lists = this.$store.getters['modules/listStore/getImage']
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].image.imageCd === 'OTHER') {
        newlists.push(lists[i])
      }
    }
    return newlists
  }

  get menulength() {
    return this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus.length
  }

  deleteFav(selectID) {
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
.grid-container
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 8px
  justify-content: center
  @media screen and (min-width: 376px) and (max-width: 1024px)
    grid-template-columns: repeat(auto-fill,184px)
  .-img
    width: 100%
    height: 138px
    object-fit: cover
    @media screen and (min-width: 376px) and (max-width: 1024px)
      width: 184px
      height: 138px
  .-img:hover
    opacity: 0.6
@media screen and (min-width: 1024px)
  .grid-container
    display: grid
    grid-template-columns: repeat(auto-fill,220px)
    grid-gap: 8px
    .-img
      width: 220px
      height: 165px
      object-fit: cover
</style>
