<template lang="pug">
.AreaForm
  .container_top
    paragraph-bold#top-text エリアから検索
    .icon-right
      area-here-button#hereBtn(@push-btn='changeHereStatus')
      .commitment(
        @mouseover='mouseOverAction("commitment")',
        @mouseleave='mouseLeaveAction'
      )
        .out-line(@click='showModal')
          .side
            list-icon.-commitment-icon.default(
              v-if='genreCheck',
              :class='[commitmentOver ? "fillBule" : ""]'
            )
            list-check-icon.-commitment-icon.check-design.fillBule(v-else)
            paragraph.text(
              fontSize='small',
              color='dark_gray',
              :class='[commitmentOver ? "fillBule" : ""]'
            ) こだわり

      .favorite(
        @mouseover='mouseOverAction("favorite")',
        @mouseleave='mouseLeaveAction'
      )
        nuxt-link.out-line(to='/favorite')
          .side
            favorite-icon.-favoriteicon-top(
              :class='[favoriteOver ? "fillBule" : ""]',
              v-if='!favoriteCheckFlag'
            )
            favorite-check-icon.-favoriteicon-check(v-else)
            paragraph.text(
              fontSize='small',
              color='dark_gray',
              :class='[favoriteOver ? "fillBule" : ""]'
            ) お気に入り
    take-out-search(
      :isShow='isShowSearch',
      @close='isShowSearch = false',
      title='こだわり検索'
    )
  .serch-are
    area-select(
      v-if='$feature("phase1")',
      :area-list='areaLists',
      :selected-area-cd='getSearchBox.suggestText ? getSearchBox.suggestText : ""',
      @select-area='changeArea'
    )
    area-select-box(
      v-else,
      :area-list='areaLists',
      :selected-area-cd='getSearchBox.suggestText',
      @change='changeArea'
    )
    .middle
      #flexbox1(
        @mouseover='mouseOverAction("favorite")',
        @mouseleave='mouseLeaveAction'
      )
        nuxt-link.out-line(to='/favorite')
          paragraph-bold.-favoritetext-sp(
            fontSize='tiny',
            :class='[favoriteOver ? "fillBule" : ""]'
          ) お気に入り
          favorite-icon.-favoriteicon-sp(
            :class='[favoriteOver ? "fillBule" : ""]',
            v-if='!favoriteCheckFlag'
          )
          favorite-check-icon.-favoriteicon-check-sp(v-else)
      #flexbox2
        CTAButton(
          text='テイクアウトを検索',
          type='primary',
          fontSize='large',
          lineHeight='1',
          @click='searchPushes()'
        )
</template>
<script lang="ts">
import { Component, Vue, Watch, Emit } from 'nuxt-property-decorator'
import { AreaTypes } from '~/types/areaTypes'
import { Paragraph, ParagraphBold, Span } from '~/components/atoms/typography'
import AreaHereButton from '~/components/atoms/button/AreaHereButton.vue'
import AreaSelect from '~/components/molecules/select/AreaSelect.vue'
import AreaSelectBox from '~/components/molecules/select/AreaSelectBox.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FavoriteIcon from '~/assets/icon/favorite.svg'
import FavoriteCheckIcon from '~/assets/icon/favorite-check.svg'
import ListCheckIcon from '~/assets/icon/filter-check.svg'
import ListIcon from '~/assets/icon/filter.svg'
import LocationIcon from '~/assets/icon/location.svg'
import SelectArrow from '~/assets/icon/select-arrow.svg'
import TakeOutSearch from '~/components/molecules/select/TakeOutSearch.vue'
@Component({
  components: {
    AreaHereButton,
    AreaSelect,
    AreaSelectBox,
    CTAButton,
    FavoriteIcon,
    ListCheckIcon,
    ListIcon,
    LocationIcon,
    Paragraph,
    ParagraphBold,
    SelectArrow,
    Span,
    TakeOutSearch,
    FavoriteCheckIcon
  }
})
export default class AreaForm extends Vue {
  nowLoading = false
  isShowSearch = false
  commitmentOver = false
  favoriteOver = false
  favoriteCheckFlag = false

  mounted() {
    setTimeout(() => {
      // this.$store.dispatch('modules/suggest_search/InitSearch')
      // ここでお知らせのactionトリガーを書く
      this.$store.dispatch('modules/notification/InitNotificationTO')
      this.$store.dispatch('modules/area/SearchBoxTO')
      this.favoriteCheck()
    }, 0)
  }

  favoriteCheck() {
    if (this.isLogin !== true) {
      this.favoriteCheckFlag = this.$store.getters['modules/favorite/getLocalFavorite'].length > 0
    } else {
      const { visitDate, visitTime } = this.searchBox
      const databox = {
        pickUpDate: visitDate,
        pickUpTime: visitTime,
        appCd: 'TO'
      }
      this.$store.dispatch('modules/favorite/IndexFavorite', databox).then(() => {
        this.favoriteCheckFlag = this.$store.getters['modules/favorite/getTakeoutMenus'].takeoutMenus.length > 0
      })
    }
  }

  get searchBox() {
    return this.$store.getters['modules/search_store/getSearchBoxRS']
  }

  mouseOverAction(name) {
    switch (name) {
      case 'commitment': {
        this.commitmentOver = true
        break
      }
      case 'favorite': {
        this.favoriteOver = true
        break
      }
    }
  }

  mouseLeaveAction() {
    this.commitmentOver = false
    this.favoriteOver = false
  }

  changeArea(updateData): void {
    if (this.$feature('phase1')) {
      const { areaCd: suggestText, name: suggestTextName } = updateData
      const suggestCd = suggestText && suggestTextName ? 'AREA' : ''
      this.$store.dispatch('modules/search_store/setSearchBoxTO', {
        suggestCd,
        suggestText,
        suggestTextName
      })
    } else {
      this.$store.dispatch('modules/search_store/setSearchBoxTO', updateData)
    }
  }

  @Emit('searchPushes')
  searchPushes(): void {
    // 親に伝える
  }

  showModal(): void {
    this.isShowSearch = true
  }

  favoriteBtn() {
    this.$store.dispatch('modules/route/InBeforeURL', this.$route.path)
    this.$router.push('/favorite')
  }

  get locationInfo() {
    return this.$store.getters['modules/user/getLocationInfo']
  }

  get genreCheck() {
    const genre = this.$store.getters['modules/search_store/getSearchBoxTO']
    return genre.cookingGenreCd === ''
  }

  changeHereStatus() {
    this.nowLoading = true
  }

  @Watch('locationInfo')
  checks() {
    this.nowLoading = false
  }

  // area取得getter
  get areas(): AreaTypes.SelectAreaTypes[] {
    return this.$store.getters['modules/area/getSearchBoxTO'].areas
      ? this.$store.getters['modules/area/getSearchBoxTO'].areas
      : []
  }

  get getSearchBox() {
    // 選択されているデータ
    return this.$store.getters['modules/search_store/getSearchBoxTO']
  }

  get areaLists() {
    // レストランリリース前のテイクアウトではlevel1のデータは出さないようにする
    const areas = this.$feature('phase1') ? this.areas : this.areas.filter((area) => area.level !== 1)
    if (this.getSearchBox.suggestCd !== 'AREA' || !areas) {
      return areas
    }
    if (areas.every((area) => area.areaCd !== this.getSearchBox.suggestText)) {
      return areas.concat({
        areaCd: this.getSearchBox.suggestText,
        id: 0,
        name: this.getSearchBox.suggestTextName,
        level: 0,
        path: '',
        weight: 0,
        sort: 0
      })
    } else {
      return areas
    }
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0 && this.userData.email !== ''
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }
}
</script>
<style lang="sass" scoped>
.AreaForm
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  padding: 0 16px
  border-radius: 4px
  background-color: #ffffff
  margin: 0 auto
  height: 200px !important
  .container_top
    display: flex
    justify-content: space-between
    padding-top: 8px
  #top-text
    font-size: 16px
    margin: 8px 0
    color: black
    width: 100%
.middle
  display: flex
  justify-content: space-evenly
  margin-top: 7px
.-favoritetext-sp
  padding-left: 0px
  padding-top: 5px
  color: #a6a6a6
.-favoriteicon-sp
  width: 24px
  margin-left: 18px
  fill: white
  stroke: #a6a6a6
  stroke-width: 1.5px
.-favoriteicon-check-sp
  width: 24px
  height: 26px
  margin-left: 18px
.icon-right
  display: flex
.favorite
  display: none
#hereBtn
  width: 90px
  cursor: pointer
  font-size: 14px
  justify-content: center
  align-items: center
.side
  display: flex
  align-items: center
  min-width: 90px
  cursor: pointer
  .-commitment-icon
    fill: #a6a6a6
    margin-right: 0px
    width: 30px
    height: 20px
.commitment
  display: flex
  align-items: center
.tokyo
  display: none
.fillBule
  fill: #1c5db5 !important
  color: #1c5db5
  font-weight: bold
.check-design
  margin-top: 2px !important
  height: 23px
.area-select-box
  margin: 15px 0 24px 0
@include pc_view
  .AreaForm
    height: 124px !important
    padding: 0 16px
    #-label
      padding-left: 40px
    .container_top
      padding-top: 0px
      .icon-right
        font-size: 14px
      #top-text
        font-size: 14px
        font-weight: normal
        color: black
        margin: 16px 0
        width: 100%
        margin-right: 5px
      .commitment
        width: 100px
        margin-left: 7px
      .favorite
        width: 110px
        display: flex
        align-items: center
        justify-content: center
      .side
        display: flex
        align-items: center
        .-commitment-icon
          fill: #a6a6a6
          height: 22px
          margin-right: 0px
          margin-top: -1px
        .default
          height: 20px
          margin-top: 0
        .-favoriteicon-top
          fill: white
          height: 20px
          width: 20px
          margin-top: 5px
          stroke: #a6a6a6
          stroke-width: 1.5px
          vertical-align: bottom
        .-favoriteicon-check
          height: 26px
          width: 20px
          margin-right: 2px
          vertical-align: bottom
    #hereBtn
      width: 90px
      // padding-left: 80px
      cursor: pointer
      // margin-right: 10px
    .container_bottom
      padding-bottom: 30px
      display: flex
      position: relative
    #date
      position: absolute
      top: -180%
      left: 55%
      width: 20%
    #time
      position: absolute
      top: -180%
      left: 75%
      width: 20%
    #flexbox1
      display: none
  .serch-are
    display: flex
    justify-content: space-between
    #flexbox2
      display: flex
      justify-content: flex-end
      width: 400px
      margin-left: 30px
      .cta-button
        max-width: none
        padding: 0
  .middle
    margin-top: 0
  .tokyo
    display: inline-block
  .area-select-box
    margin: 0
@media screen and (max-width: 1023px) and (min-width: 767px)
  .AreaForm
    height: 124px !important
  .icon-right
  #hereBtn
    // width: 160px !important
    // padding-left: 0px !important
    cursor: pointer
  #top-text
    font-size: 24px
    color: black
    margin: 10px 0
    width: 100%
    margin-right: 50px !important
  .btn
    margin-left: 5% !important
    margin-right: 5% !important
  .serch-are
    display: flex
    margin-left: 0
    margin-right: 0
    #flexbox2
      display: flex
      justify-content: flex-end
      margin-left: 30px
      width: 37.109vw
</style>
