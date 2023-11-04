<template lang="pug">
transition(name='modal')
  .base-modal-wrapper(v-if='isActive')
    .-base-modal
      .photo-count
        paragraph-bold(fontSize='medium', color='white') {{ carouselIndex + 1 }} / {{ menuList.length }}
        .-close(@click.prevent='close')
          cross.-icon
      template(v-if='menuList')
        no-ssr
          carousel(
            v-if='$window.width < 768',
            ref='carousel',
            :per-page='1',
            :navigateTo='[carouselIndex, false]',
            :loop='false',
            :centerMode='true',
            :paginationEnabled='false',
            @pageChange='onPageChange',
            :touchDrag='true',
            :mouseDrag='true',
            :key='false'
          )
            slide(v-for='(menus, index) in menuList', :key='index')
              .modal
                .modal-photo(ref='photo')
                  .modal-photo-image(v-if='menus.image')
                    .modal-photo-image-wrapper
                      img(
                        :src='menus.image.imageUrl + "?imwidth=320&imdensity=1"'
                      )
              .modal-menu(v-if='imageDetail.menu')
                .modal-menu-description
                .modal-menu-name(v-if='imageDetail.menu.name')
                  paragraph(fontSize='large', color='light_gray') {{ imageDetail.menu.name }}
                .modal-menu-price(v-if='imageDetail.menu.price')
                  paragraph-bold(fontSize='medium', color='light_gray') ¥{{ $moneyFormat(Number(imageDetail.menu.price.price)) }}
                  paragraph(fontSize='tiny', color='light_gray') (税込)
          carousel(
            v-else,
            ref='carousel',
            :per-page='1',
            :navigateTo='[carouselIndex, false]',
            :loop='false',
            :centerMode='true',
            :paginationEnabled='false',
            @pageChange='onPageChange',
            :touchDrag='false',
            :mouseDrag='false',
            :key='true'
          )
            slide(v-for='(menus, index) in menuList', :key='index')
              .modal
                .modal-photo(ref='photo')
                  .modal-photo-image(v-if='menus.image')
                    .modal-photo-image-wrapper
                      img(
                        :src='menus.image.imageUrl + "?imwidth=320&imdensity=1"'
                      )
                    .left-arrow(
                      ref='left',
                      v-if='index + 1 > 1',
                      @click='clickPrev'
                    )
                      next
                    .right-arrow(
                      ref='right',
                      v-if='index + 1 < menuList.length',
                      @click='clickNext'
                    )
                      next
        no-ssr
          .modal-menu(v-if='imageDetail.menu && $window.width > 767')
            .modal-menu-description
            .modal-menu-name(v-if='imageDetail.menu.name')
              paragraph(fontSize='large', color='light_gray') {{ imageDetail.menu.name }}
            .modal-menu-price(v-if='imageDetail.menu.price')
              paragraph-bold(color='light_gray') ¥{{ $moneyFormat(Number(imageDetail.menu.price.price)) }}
              paragraph(color='light_gray') (税込)
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import Cross from '~/assets/icon/cross-thin-white.svg'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import MultipleSelect from '~/components/molecules/select/MultipleSelect.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
import Next from '~/assets/icon/arrow-2.svg'
import CTAButton from '~/components/atoms/button/CTAButton.vue'

const MODAL_OVERLAY_CLASS = 'base-modal-overlay'

type Menu = {
  image: {
    id: number
    imageCd: string
    imageUrl: string
  }
  isPost: false
}

@Component({
  components: {
    Cross,
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    SelectBox,
    MultipleSelect,
    NotificationPop,
    ApiLoading,
    Next,
    CTAButton
  }
})
export default class PhotoModal extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Prop({ default: [] }) menuList!: Array<Menu>
  @Prop({ default: true }) wrapperClosable?: boolean

  beforeDestroy() {
    document.body.style.overflow = 'auto'
    // body直下のオーバーレイを削除
    const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
  }

  @Watch('isActive')
  onIsActiveChange(newIsActive) {
    this.$store.dispatch('modules/reservationGourmet/resetOption')
    if (newIsActive) {
      this.open()
      // モーダルの下の要素をスクロールさせないための処理
      document.body.style.overflow = 'hidden'
      // モーダル直下にオーバーレイを挿入
      const overlay = document.createElement('div')
      overlay.classList.add(MODAL_OVERLAY_CLASS)
      document.body.appendChild(overlay)
      overlay.addEventListener('click', () => {
        if (this.wrapperClosable) {
          this.close()
        }
      })
    } else {
      // モーダルの下の要素のスクロール禁止を解除
      document.body.style.overflow = 'auto'
    }
  }

  onPageChange(currentPage) {
    this.$store.dispatch('modules/listStore/ImageDetail', this.menuList[currentPage])
  }

  clickNext(): void {
    this.refs.carousel.goToPage(this.refs.carousel.getNextPage())
  }

  clickPrev(): void {
    this.refs.carousel.goToPage(this.refs.carousel.getPreviousPage())
  }
  // eslint-disable-next-line
  get refs(): any {
    return this.$refs
  }

  get imageMenus() {
    if (this.menuList) {
      return this.sliceByNumber(this.menuList, 3)
    }
  }

  get imageDetail() {
    return this.$store.getters['modules/listStore/getImageDetail']
      ? this.$store.getters['modules/listStore/getImageDetail']
      : {}
  }

  get carouselIndex() {
    let carouselOrder = 0
    this.menuList.forEach((menu, index) => {
      if (menu.image.id === this.imageDetail.image.id) {
        carouselOrder = index
      }
    })
    return carouselOrder
  }

  sliceByNumber(array, number: number) {
    if (array.length !== 0) {
      const length = Math.ceil(array.length / number)
      return new Array(length).fill(0, 0, array.length).map((_, i) => array.slice(i * number, (i + 1) * number))
    }
  }

  @Emit()
  close(): void {
    this.$store.dispatch('modules/reservationGourmet/resetOption')
    const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
    document.body.style.overflow = 'auto'
  }

  @Emit()
  open(): void {
    // 親に伝えるだけ
  }
}
</script>
<style lang="sass" scoped>
.scroll-contents
  height: 100%
  -ms-overflow-style: none
  scrollbar-width: none
.scroll-contents::-webkit-scrollbar
  display: none
.modal-enter-active,
.modal-leave-active
  transition: opacity .5s
.modal-enter,
.modal-leave-to
  opacity: 0
.base-modal-wrapper
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  overflow: auto
  margin: 0 auto
  z-index: 12021
  min-width: 320px
  background-color: $black
  .-base-modal
    position: relative
    margin: 0 auto
    .photo-count
      position: relative
      display: flex
      justify-content: center
      margin: 30px 0
    .modal
      position: relative
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      height: 100vh
      max-height: 250px
      margin: 0 auto
      margin-bottom: 0px
      .modal-photo
        position: relative
        display: flex
        justify-content: center
        width: 100%
        height: 100%
        margin-top: 32px
        .modal-photo-image
          display: flex
          justify-content: center
          width: 100%
          height: 100%
          .modal-photo-image-wrapper
            img
              width: 100%
              height: 100%
              object-fit: contain
    .modal-menu
      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      margin-top: 24px
      padding: 0 16px
      .modal-menu-price
        display: flex
        align-self: flex-end
        align-items: baseline
        p:nth-child(2)
          font-size: 10px
  .-close
    position: absolute
    top: 0
    right: 30px
@include pc_view
  .base-modal-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow: auto
    margin: 0 auto
    z-index: 12021
    min-width: 320px
    .-base-modal
      position: relative
      margin: 0 auto
      .modal
        position: relative
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100vh
        max-height: 500px
        margin-bottom: 0px
        .modal-count
          margin-top: 16px
        .modal-photo
          position: relative
          display: flex
          justify-content: center
          width: 100%
          height: 100%
          .modal-photo-image
            display: flex
            justify-content: center
            width: 100%
            .modal-photo-image-wrapper
              display: flex
              justify-content: center
              align-items: center
              height: auto
              img
                width: 100%
                height: 100%
                object-fit: contain
            .right-arrow
              position: absolute
              display: flex
              justify-content: center
              align-items: center
              width: 40px
              top: calc(50% - 32px)
              right: 64px
              height: 40px
              border-radius: 50%
              opacity: 0.6
              background: white
              &:hover
                opacity: 1.0
                cursor: pointer
              svg
                position: absolute
                height: 15px
                transform: rotate(-90deg)
                margin-left: 4px
            .left-arrow
              position: absolute
              display: flex
              justify-content: center
              align-items: center
              top: calc(50% - 32px)
              left: 64px
              width: 40px
              height: 40px
              border-radius: 50%
              background: white
              opacity: 0.6
              &:hover
                opacity: 1.0
                cursor: pointer
              svg
                position: absolute
                height: 15px
                transform: rotate(90deg)
                margin-right: 4px
    .modal-menu
      display: flex
      flex-direction: column
      align-items: center
      width: 80%
      margin: 16px auto 0 auto
      .modal-menu-price
        display: flex
        align-items: baseline
        align-self: flex-end
        p:first-child
          font-size: 18px
        p:nth-child(2)
          font-size: 12px
  .-close
    position: absolute
    top: 0
    right: 32px
    &:hover
      cursor: pointer
      opacity: 0.6
.base-modal-wrapper::-webkit-scrollbar
  display: none
</style>
