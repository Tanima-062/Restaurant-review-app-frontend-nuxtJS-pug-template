<template lang="pug">
nav.global-nav
  api-loading(:loading='List.length<0')
  .-menu(v-show='List.length>0')
    #menu_list.-slide
      ul.-main-menu
        li#circleAll.-items(
          @click='listclick("")',
          v-if='List',
          :class='[{ checked: selectedCd === "" }]',
        )
          span.-text.-link(:class='[{ checkedFont: selectedCd === "" }]') {{ "すべて" }}
        li.-items(
          v-for='item in List',
          @click='listclick(item.genreCd)',
          :id='item.name',
          :class='[{ checked: item.genreCd === selectedCd }]'
        )
          span.-text.-link(
            :class='[{ checkedFont: item.genreCd === selectedCd }]'
          ) {{ item.name }}
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Next from '~/assets/icon/next.svg'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
@Component({
  components: {
    Next,
    ApiLoading
  }
})
export default class CircleNav extends Vue {
  @Prop() List?: string[]
  private selectedCd = ''
  private allButton = false

  @Emit()
  listclick(item) {
    this.selectedCd = item
    //  親に教える
  }
  // 初期表示事に”すべて”だけが表示されてしまうので,items項目が描写されるまで非表示にする
  // mounted() {
  //   setTimeout(() => {
  //     this.allButton = true
  //   }, 1500)
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
  .-slide
    padding: 0px 8px
    width: 100%
    overflow-x: auto
    overflow-y: hidden
  .-main-menu
    display: flex
    flex-wrap: nowrap
    align-items: baseline
    box-pack: justify
    margin-bottom: 15px
    transition-duration: .5s
    transition-timing-function: ease-out
    .-items
      flex: 1 0 auto
      padding: 8px 16px
      margin-right: 8px
      border-radius: 20px
      background-color: $gray
      &:hover
        background-color: $main_color
        .-link
          color: $white
          font-size: 12px
          font-weight: 600
    .checked
      background-color: $main_color
      .-link
        color: $white
        font-size: 12px
        font-weight: 600
    .-link
      position: relative
      font-size: 12px
      color: $main_color
</style>
