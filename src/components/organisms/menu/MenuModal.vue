<template lang="pug">
transition(name='modal')
  div
    .base-modal-wrapper(v-if='isActive')
      .-base-modal
        notification-pop(
          :isShown='isAlertPopShown',
          type='error',
          position='right',
          icon='warning',
          @closePop='closePop'
        )
          template
            | {{ $t("選択されていない項目があります") }}
        template(v-if='menuDetail')
          .-header(
            v-if='menuDetail.menuImage',
            :style='"background: url(" + menuDetail.menuImage.imageUrl + "?imwidth=320&imdensity=1" + ") center center no-repeat ; background-size: cover;"'
          )
            transition
              .pop(v-show='favoPopFlag')
                favorite-pop(:text='popMessage')
            .-close(@click.prevent='close')
              cross.-icon
            //- true(既にお気に入りされている時 -> お気に入り解除)
            template(v-if='!isFavorite')
              button.good(
                v-if='goodInfos',
                @click.prevent='goodpush("DELETE")'
              )
                favorite.-icon2.goodb
              //- false(非お気に入り -> おきにいりに登録)
              button.good(v-else, @click.prevent='goodpush("REGIST")')
                favorite.-icon2
          .-content
            paragraph-bold(fontSize='medium', v-if='menuDetail.date') {{ menuDetail.date }}
            .flex-pricebox
              #flexitem1
                paragraph-bold(
                  :number='1',
                  fontSize='medium',
                  v-if='menuDetail.name'
                ) {{ menuDetail.name }}
              #flexitem2
                paragraph-bold(fontSize='medium', v-if='menuDetail.menuPrice') ¥{{ $moneyFormat(Number(unitPrice)) }}
            plus-minus-circle.c_position(
              minCount=0,
              :maxCount='menuDetail.stockNumber',
              :currentCount='count',
              @change-count='countnum'
            )
            paragraph.-description(
              :number='1',
              fontSize='tiny',
              v-if='menuDetail.description'
            ) {{ menuDetail.description }}
            .scroll-contents
              .rectangle(v-if='optionDetail')
                paragraph-bold.top(
                  fontSize='small',
                  v-if='optionDetail.length > 1'
                ) オプションを選択
                .rows.inputselect(
                  v-for='(option, i) in optionDetail',
                  :key='i'
                )
                  paragraph#type
                    span-bold(fontSize='small', v-if='i == "null"') トッピング <br>
                    span-bold(fontSize='small', v-else) {{ i }} <br>
                    Span#optional(
                      fontSize='tiny',
                      v-if='option[0].required === 1'
                    ) 必須
                    Span#optional_gray(fontSize='tiny', v-else) 任意

                  select-box#option(
                    :value='option[0].contents',
                    @change='option1($event)',
                    v-if='option[0].optionCd === "OKONOMI"'
                  )
                    option(
                      v-if='option[0].required === 1',
                      :value='nonitemize(option[0].keyword)',
                      label='選択してください'
                    )
                    option(v-else, label='なし')
                    option(
                      v-for='(item, num) in option',
                      :label='item.contents',
                      :key='item.id',
                      :value='itemize(item)'
                    ) {{ item.contents }}

                  multiple-select#option(
                    :options='option',
                    @getSelect='option2($event, option)',
                    v-else
                  )
                  select-arrow.-selecticon

              .flex-addressbox(v-show='!judge')
                #flexitem1
                  button.maps(@click.prevent='mapbutton()')
                    location-icon.-icon
                #flexitem2
                  paragraph-bold.store-name(
                    :number='1',
                    fontSize='small',
                    v-if='menuDetail.store'
                  ) {{ menuDetail.store.name }}
              .locationmap(v-if='mapFlag')
                .framebox
                  api-loading(:loading='!isMapLoading')
                  iframe.frame(
                    v-show='isMapLoading',
                    @load='mapLoading',
                    :src='"https://www.google.com/maps/embed/v1/place?key=AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw&q=" + menuDetail.store.latitude + "," + menuDetail.store.longitude',
                    width='100%',
                    height='100%'
                  )
                paragraph.address(fontSize='tiny', v-if='menuDetail.store') {{ menuDetail.store.address }}
        .-footer
          slot(name='modal-footer')
            CTA-button-others#flexitem1(
              v-if='footerType === 1',
              fontSize='small',
              type='primary_sub',
              text='その他メニュー',
              @click='pushOther'
            )
            Amount-button#flexitem2(
              fontSize='medium',
              type='primary',
              @click='pushOrder',
              :text='buttonText',
              :price='priceCalc',
              :disabled='dirty'
            )
        paragraph.error(fontSize='tiny', v-if='!menuDetail.status.canSale') {{ menuDetail.status.message }}
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import keyBy from 'lodash/keyBy'
import groupBy from 'lodash/groupBy'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import Cross from '~/assets/icon/cross-gray.svg'
import Favorite from '~/assets/icon/favorite.svg'
import LocationIcon from '~/assets/icon/location.svg'
import LocationMark from '~/assets/icon/location-mark.svg'
import Heading from '~/components/atoms/typography/Heading.vue'
import CTAButtonOthers from '~/components/atoms/button/CTAButtonOthers.vue'
import AmountButton from '~/components/atoms/button/AmountButton.vue'
import PlusMinusCircle from '~/components/molecules/counter/PlusMinusCircle.vue'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import MultipleSelect from '~/components/molecules/select/MultipleSelect.vue'
import SelectArrow from '~/assets/icon/select-arrow.svg'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
import FavoritePop from '~/components/molecules/tooltip/FavoritePop.vue'

const MODAL_OVERLAY_CLASS = 'base-modal-overlay'

// type storeGenre = {
//   appCd: string
//   genreCd: string
//   id: number
//   name: string
//   path: string
// }

@Component({
  components: {
    Cross,
    Favorite,
    LocationIcon,
    LocationMark,
    Heading,
    CTAButtonOthers,
    AmountButton,
    Paragraph,
    ParagraphBold,
    PlusMinusCircle,
    Span,
    SpanBold,
    SelectBox,
    MultipleSelect,
    SelectArrow,
    NotificationPop,
    ApiLoading,
    FavoritePop
  },
  methods: {
    groupBy
  }
})
export default class MenuModal extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Prop({ default: 1 }) footerType!: number
  @Prop({ default: false }) judge!: boolean
  @Prop({ default: false }) isFavorite!: boolean
  @Prop({ default: true }) wrapperClosable?: boolean
  @Prop() comparisonDate!: string
  @Prop() comparisonTime!: string
  private count = 1
  private mapFlag = false
  isAlertPopShown = false
  toppingData: {
    contents: string
    contentsId: number
    id: number
    keyword: string
    keywordId
    string
    optionCd: string
    price: number
    required: string
  }[] = []

  private buttonText = this.footerType === 1 ? '注文する' : '追加する'
  private optionSum = 0
  private isMapLoading = false
  private favoPopFlag = false
  private popMessage = ''
  private menuCloseTimeId: null | ReturnType<typeof setTimeout> = null

  beforeDestroy() {
    document.body.style.overflow = 'auto'
    // body直下のオーバーレイを削除
    const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
  }

  mounted(): void {
    if (this.isLogin) {
      // ログイン情報があるか確認
      this.$store.dispatch('modules/user/getUserData')
    } else {
      // ログイン情報初期化
      this.$store.dispatch('modules/user/resetUserData')
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

      setTimeout(() => {
        if (document.getElementsByClassName('vs__search').length > 0) {
          const inputs: object = document.getElementsByClassName('vs__search')
          inputs[0].readOnly = true
        }
      }, 500)

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

  mapbutton(): void {
    this.mapFlag = !this.mapFlag
    this.isMapLoading = false
  }

  mapLoading(): void {
    this.isMapLoading = true
  }

  goodpush(flags: string) {
    const sendData = {
      judge: this.isLogin,
      id: this.menuDetail.id,
      appCd: 'TO'
    }
    if (flags === 'REGIST') {
      // 非会員時の登録件数上限にバリデーションをかける
      if (this.$store.getters['modules/favorite/getLocalFavorite'].length > 99) {
        this.popMessage = 'お気に入りの登録数が上限に達しているため、登録数を減らしてから再登録してください'
        this.timeOut()
        return
      }
      this.$store.dispatch('modules/menu/setIsFavorite')
      this.$store.dispatch('modules/favorite/RegistFavorite', sendData).then(() => {
        // 会員の場合はサーバーレスポンスで登録上限のバリデーションメッセージを取得する
        // eslint-disable-next-line prettier/prettier
        const res = this.$store.getters['modules/favorite/getRegistrationResponse']
        if (this.isLogin && !res.status) {
          this.$store.dispatch('modules/menu/setIsNotFavorite')
          this.popMessage = res.message
          this.timeOut()
        } else {
          this.popMessage = 'お気に入りに追加しました'
          this.timeOut()
        }
      })
    } else {
      this.$store.dispatch('modules/menu/setIsNotFavorite')
      this.$store
        .dispatch('modules/favorite/DeleteFavorite', sendData)
        .then(() => {
          this.popMessage = 'お気に入りを解除しました'
          this.timeOut()
        })
        .catch(() => {
          // ここで失敗したらハートの色を戻す
          this.$store.dispatch('modules/listStore/setIsFavorite')
          this.popMessage = 'お気に入り登録に失敗しました。時間を置いてから再度お試しください'
          this.timeOut()
        })
    }
  }

  // 3秒後にお気に入り登録削除のトーストを消す
  timeOut() {
    this.favoPopFlag = true
    clearTimeout(Number(this.menuCloseTimeId))
    const timeOutId = setTimeout(() => {
      this.favoPopFlag = false
    }, 3000)
    this.menuCloseTimeId = timeOutId
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  itemize(item) {
    const databox = [item.id, item.contentsId, item.contents, item.keywordId, item.keyword, item.price]
    return databox
  }

  nonitemize(keyword) {
    const databox = [0, 0, 0, 0, keyword, 0]
    return databox
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }

  countnum(newCount: number): void {
    this.count = newCount
  }

  get menuDetail() {
    return this.$store.getters['modules/menu/getTakeoutMenu']
  }

  get isCancel() {
    return this.count === 0
  }

  get optionDetail() {
    // eslint-disable-next-line prettier/prettier
    const optionList = this.$store.getters['modules/menu/getTakeoutMenu'].options
    if (optionList && Object.keys(optionList).length > 0) {
      const groupingList = groupBy(optionList, 'keyword')
      return groupingList
    }
    return null
  }

  get requiredOptionKeywords() {
    return this.optionDetail
      ? Object.keys(this.optionDetail).reduce((requireOptions: string[], option: string) => {
          if (this.optionDetail && this.optionDetail[option][0].required === 1) {
            const keyword: string = this.optionDetail[option][0].keyword
            requireOptions.push(keyword)
          }
          return requireOptions
        }, [])
      : []
  }

  get disables() {
    return Vue.observable({
      time: !this.menuDetail.status.canSale || this.isOutOfService(this.menuDetail),
      item: this.count === 0 && this.isFavorite,
      allSelectedRequired: this.requiredOptionKeywords.map((key) => {
        return !this.isCancel && (!this.selectedOptions[key] || this.selectedOptions[key].contentsId === '0')
      })
    })
  }

  get dirty() {
    return this.isDirty(this.disables)
  }

  isDirty(disables: { [key: string]: boolean[] | boolean }): boolean {
    return Object.values(disables).some((value) => {
      return Array.isArray(value) ? value.some((v) => !!v) : !!value
    })
  }

  isOutOfService({ salesLunchStartTime, salesLunchEndTime, salesDinnerStartTime, salesDinnerEndTime }) {
    if (this.isFavorite) {
      // ここにお気に入り一覧から送られる時間を入れて、店舗営業時間と比較する
      const time = this.comparisonTime + ':00'
      if (
        (salesLunchStartTime <= time && time <= salesLunchEndTime) ||
        (salesDinnerStartTime <= time && time <= salesDinnerEndTime)
      ) {
        return false
      } else {
        return true
      }
    } else {
      let now = this.$store.getters['modules/suggest_search/gettime']
      now = now + ':00'
      if (
        (salesLunchStartTime <= now && now <= salesLunchEndTime) ||
        (salesDinnerStartTime <= now && now <= salesDinnerEndTime)
      ) {
        return false
      } else {
        return true
      }
    }
  }

  @Watch('optionDetail')
  optionDetails(list) {
    if (list === null) {
      //
    } else {
      this.$store.dispatch('modules/reservationGourmet/resetOption')
      Object.keys(list).forEach((key) => {
        const pushData = {
          id: list[key][0].id,
          contents: list[key][0].contents,
          contentsId: list[key][0].contentsId,
          keywordId: list[key][0].keywordId,
          keyword: list[key][0].keyword,
          price: list[key][0].price
        }
        this.$store.dispatch('modules/reservationGourmet/setOption', pushData)
      })
    }
  }

  get goodInfos() {
    if (this.isLogin) {
      return this.menuDetail.isFavorite
    } else {
      return this.localArrayFlag
    }
  }

  get localArrayFlag() {
    // ローカルのarrayに入っているかどうか
    const localArray = this.$store.getters['modules/favorite/getLocalFavorite']
    let flagcounts = 0
    for (let i = 0; i < localArray.length; i++) {
      if (localArray[i] === this.menuDetail.id) {
        flagcounts++
      }
    }
    if (flagcounts !== 0) {
      return true
    } else {
      return false
    }
  }

  get getOptions() {
    return this.$store.getters['modules/reservationGourmet/getOptions']
  }

  get selectedOptions() {
    return keyBy(this.getOptions, 'keyword')
  }

  get priceCalc() {
    let toppingPrice = 0
    if (this.toppingData.length > 0) {
      for (let i = 0; i < this.toppingData.length; i++) {
        toppingPrice = toppingPrice + this.toppingData[i].price
      }
    }
    let calcSum = 0
    let optionPrice = 0
    if (this.getOptions) {
      for (let i = 0; i < this.getOptions.length; i++) {
        let price = 0
        if (this.getOptions[i].price != null) {
          price = Number(this.getOptions[i].price)
        }
        optionPrice = optionPrice + price
      }
    }
    if (this.menuDetail.menuPrice) {
      calcSum = (Number(this.menuDetail.menuPrice.price) + optionPrice + toppingPrice) * this.count
      return calcSum
    } else {
      return 0
    }
  }

  get unitPrice() {
    if (this.menuDetail.menuPrice) {
      return this.menuDetail.menuPrice.price
    } else {
      return 0
    }
  }

  @Emit()
  close(): void {
    this.favoPopFlag = false
    this.$store.dispatch('modules/reservationGourmet/resetOption')
    this.count = 1
    this.mapFlag = false
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

  closePop(): void {
    this.isAlertPopShown = false
  }

  async pushOrder() {
    if (this.isFavorite) {
      this.$store.dispatch('modules/reservationGourmet/resetAllMenus')
      const dataBox = {
        pickUpDate: this.comparisonDate,
        pickUpTime: this.comparisonTime
      }
      this.$store.dispatch('modules/suggest_search/setSearchBoxSituation', dataBox)
      this.$store.dispatch('modules/reservationGourmet/setTimeData', dataBox)
    }
    this.$store.dispatch('modules/common/setAppCd', 'TO')
    if (this.toppingData.length === 0) {
      // 空なら送らない
    } else {
      for (let i = 0; i < this.toppingData.length; i++) {
        const data = this.toppingData[i]
        await this.$store.dispatch('modules/reservationGourmet/changeToping', data)
      }
    }

    const menu = this.$store.getters['modules/menu/getTakeoutMenu']

    const sendData = {
      menu: {
        id: menu.id,
        count: this.count,
        price: menu.menuPrice.price,
        name: menu.name,
        maxCount: menu.stockNumber
      },
      options: this.$store.getters['modules/reservationGourmet/getOptions']
    }
    const allSelectedRequired = this.disables.allSelectedRequired.every((v) => !v)
    if (this.isCancel || allSelectedRequired) {
      const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
      document.body.style.overflow = 'auto'

      this.pushes(sendData)
      this.toppingData = []
    } else {
      this.isAlertPopShown = true
    }
  }

  async pushes(sendData) {
    this.$store.dispatch('modules/reservationGourmet/orderAdd', sendData)
    if (this.footerType === 1) {
      await this.$router.push('/reservation/input_form')
    } else {
      this.close()
    }
  }

  pushOther(): void {
    const storeID = this.$store.getters['modules/menu/getStoreId']
    const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
    document.body.style.overflow = 'auto'
    this.$store.dispatch('modules/reservationGourmet/resetOption')
    this.$router.push(`/restaurant/detail/takeout/${storeID}/?type=take`)
  }

  option2(val, data) {
    const sendData: {
      contents: string
      contentsId: number
      id: number
      keyword: string
      keywordId
      string
      optionCd: string
      price: number
      required: string
    }[] = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < val.length; j++) {
        if (data[i].id === val[j]) {
          sendData.push(data[i])
        }
      }
    }
    this.toppingData = sendData
  }

  option1(databox) {
    if (databox !== null || databox !== 'undefined') {
      const arrays = databox.split(',')
      if (arrays[5] != null) {
        this.optionSum = Number(this.optionSum) + Number(arrays[5])
      }
      const sendData = {
        id: arrays[0],
        contentsId: arrays[1],
        contents: arrays[2],
        keywordId: arrays[3],
        keyword: arrays[4],
        price: arrays[5]
      }
      this.$store.dispatch('modules/reservationGourmet/changeOption', sendData)
    }
  }
}
</script>
<style lang="sass">
.base-modal-overlay
  position: fixed
  left: 0
  top: 0
  bottom
  right: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 10020
</style>

<style lang="sass" scoped>
.scroll-contents
  height: 100%
  //overflow: auto
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
  top: -25%
  right: 0
  bottom: 0
  left: 0
  overflow: auto
  margin: 0 auto
  z-index: 10021
  max-width: 490px
  min-width: 320px
  margin-top: 32vh
  .-base-modal
    position: relative
    margin: 0 auto
    background: #fff
    border-radius: 4px
    box-shadow: 0 1px 3px rgba(0,0,0,.3)
    box-sizing: border-box
    @include sp_view
      width: 95%
    .-header
      height: 200px
      display: flex
      justify-content: space-between
      align-items: center
      padding: 16px 24px
      margin-bottom: 0px
      position: relative
      border-radius: 4px 4px 0 0
      .pop
        position: absolute
        background-color: $black
        width: 100%
        opacity: 0.8
        z-index: 3
        color: $white
        text-align: center
        top: 38%
        margin-left: -24px
        padding: 16px
      .v-enter-active
        transition: opacity 1s
      .v-enter
        opacity: 0
      .v-enter-to
        opacity: 0.8
      .v-leave-active
        transition: opacity 1.3s
      .v-leave
        opacity: 0.8
      .v-leave-to
        opacity: 0
      .-close
        background-color: rgba(255, 255, 255, 0.6)
        border-radius: 50%
        position: absolute
        top: 0%
        right: 0%
        margin-top: 10px
        margin-right: 10px
        height: 32px
        width: 32px
        padding: 6px
        &:hover
          opacity: 0.6
        .-icon
          fill: #4d4d4d
          width: 20px
          height: 20px
          cursor: pointer
    .-content
      padding: 20px 20px
      .flex-pricebox
        display: flex
        #flexitem1
          width: 65%
        #flexitem2
          width: 35%
          text-align: right
      .rectangle
        border-radius: 2px
        background-color: #f4f4f4
        margin: 0 0 20px 0
        padding: 10px 0 10px 0
        .top
          margin: 0 20px
        .rows
          display: flex
          margin: 10px 0
          #type
            width: 40%
            margin: 10px
            position: relative
            #optional
              position: absolute
              color: #f42500
            #optional_gray
              position: absolute
              color: #787878
          #option
            width: 60%
            margin-right: 10px
      .flex-addressbox
        display: flex
        justify-content: flex-start
        #flexitem1
          //width: 90%
          .-icon
            width: 23px
            fill: #4d4d4d
            cursor: pointer
        #flexitem2
          .store-name
            padding-top: 5px
            padding-left: 9px
    .address
      margin-top: 20px
    .locationmap
      position: relative
      margin-top: 9px
      .framebox
        display: flex
        align-itmes: center
        height: 150px
        .frame
          border: none
      .locationtext
        padding: 10px 0 10px 21px
        .-icon
          position: absolute
          top: 75%
          left: 0%
          width: 18px
          fill: #4d4d4d
          cursor: pointer
    .inputselect
      position: relative
      display: inline-block
      width: 100%
      .-selecticon
        position: absolute
        top: 50%
        right: 16px
        margin-top: -12px
        width: 16px
        height: 24px
        fill: $dark_gray
    .error
      color: red
      padding-left: 20px
      padding-bottom: 20px
      margin-bottom: 20px
    .-footer
      min-height: 75px
      padding: 0px 10px
      padding-bottom: 16px
      width: 100%
      z-index: 1
      text-align: center
      display: flex
      #flexitem1
        width: 48%
        margin: 0 auto
      #flexitem2
        width: 48%
        margin: 0 auto
    .c_position
      margin: 10px 0
      margin-left: auto
      margin-right: 0px
      width: 90px !important
    .maps
      border-radius: 50%
      background-color: white
      border: solid 1px #e4e4e4
      width: 35px
      height: 35px
      outline: none
    .-description
      white-space: pre-wrap
      padding-top: 16px
      padding-bottom: 16px
    .good
      border-radius: 50%
      outline: none
      background-color: white
      border: solid 1px #e4e4e4
      width: 35px
      height: 35px
      position: absolute
      top: 88.5%
      left: 0%
      margin-left: 10px
      margin-top: 5px
      &:hover
        opacity: 0.6
        @include sp_view
          opacity: 1
      &:active
        opacity: 0.6
      .-icon2
        fill: #4d4d4d
        width: 25px
        height: 25px
        position: absolute
        top: 25%
        left: 7px
        cursor: pointer
      .goodb
        fill: #ff7683
.base-modal-wrapper::-webkit-scrollbar
  display: none
</style>
