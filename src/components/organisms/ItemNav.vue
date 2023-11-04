<template lang="pug">
nav.global-nav
  .-menu(v-show='List.length>1')
    #menuList.-slide
      no-ssr
        .backs(v-if='$window.width > 767', @click='goLefts')
          next.arrows-left
      no-ssr
        .nexts(v-if='$window.width > 767', @click='goRights')
          next.arrows-right
      ul.-main-menu
        li#all.-items(
          @click='listclick("")',
          v-if='List',
          :class='[{ checked: selectedCd === "" || initialize === "all" }]'
        )
          span.-text.-link(
            :class='[{ checkedFont: selectedCd === "" || initialize === "all" }]'
          ) {{ "すべて" }}
        li.-items(
          v-for='item in List',
          @click='listclick(item.genreCd)',
          :id='item.id',
          :class='[{ checked: item.genreCd === selectedCd && initialize === "" }]'
        )
          span.-text.-link(
            :class='[{ checkedFont: item.genreCd === selectedCd && initialize === "" }]'
          ) {{ item.name }}
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Next from '~/assets/icon/next.svg'
@Component({
  components: {
    Next
  }
})
export default class ItemNav extends Vue {
  @Prop() List?: string[]
  @Prop() initialize?: string[]
  private selectedCd = ''
  private allButton = false

  @Emit()
  listclick(item) {
    this.selectedCd = item
    //  親に教える
  }

  private goRights(): void {
    const scroll = document.getElementById('menuList')
    if (scroll) {
      scroll.scrollLeft += 350
    }
  }

  private goLefts(): void {
    const scroll = document.getElementById('menuList')
    if (scroll) {
      scroll.scrollLeft -= 350
    }
  }
  // 初期表示事に”すべて”だけが表示されてしまうので,items項目が描写されるまで非表示にする
  // mounted() {
  //   setTimeout(() => {
  //     this.allButton = true
  //   }, 3000)
  // }
}
</script>

<style lang="sass" scoped>
.global-nav
  text-align: center
  position: relative
  width: 100%
  background-color: $white
  ::-webkit-scrollbar
    height: 0px
  button
    cursor: pointer
    border: none
    &:focus
      outline: none
  .backs
    position: absolute
    left: -2%
    top: 15%
    z-index: 10
    border-radius: 50px
    background-color: #ffffff
    .arrows-left
      margin-left: 10px
      margin-top: 15px
      height: 17px
      transform: rotate(180deg)
  .nexts
    position: absolute
    right: -1%
    top: 15%
    z-index: 1
    border-radius: 50px
    background-color: #ffffff
    .arrows-right
      margin-left: 10px
      margin-top: 15px
      height: 17px
  .-menu
    border-bottom: 1px solid gray
  .-slide
    width: 100%
    overflow-x: auto
    overflow-y: hidden
  .-main-menu
    display: flex
    flex-wrap: nowrap
    align-items: baseline
    justify-content: space-between
    box-pack: justify
    transition-duration: .5s
    transition-timing-function: ease-out
    .-items
      flex: 1 0 auto
      padding-bottom: 10px
    .checked
      color: #1c5db5
      font-weight: bold
      border-bottom: 3px solid #1c5db5
    .-link,
      position: relative
      height: 20px
      line-height: .8em
      margin: 20px
      background-color: $white
      font-size: 16px
      text-align: center
      &:hover
        color: #1c5db5
        font-weight: bold
    .checkedFont
      color: #1c5db5
      font-weight: bold
</style>
