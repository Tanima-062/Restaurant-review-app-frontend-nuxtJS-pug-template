<template lang="pug">
.adminpage
  .tab
    admin-tab(
      fontSizeLeft='small',
      typeLeft='default',
      :textLeft='todayGet',
      fontSizeRight='small',
      typeRight='default',
      :textRight='tomorrowGet',
      @switching='current'
    )
    .tabs(v-show='CurrentContents===1')
      paragraph-bold.tabcontent(color='white') 本日{{ todayGet }}のご予約/合計
        Span(fontSize='large', color='accent') {{ reserveNum }}
          Span(color='white') 件
    .tabs(v-show='CurrentContents===2')
      paragraph-bold.tabcontent(color='white') 明日{{ tomorrowGet }}のご予約/合計
        Span(fontSize='large', color='accent') {{ reserveNum }}
          Span(color='white') 件
  .contentpage
    paragraph-bold.time 【お客様ご来店時間】
    .timehead
      #flex1
        paragraph-bold.-text(fontSize='tiny') 30分以内
          Span.l-space(fontSize='tiny', color='error') {{ typeJudge("A") }}
            Span.-smalltext 件
      #flex2
        paragraph-bold.-text 1時間以内
          Span.l-space(fontSize='tiny', color='error') {{ typeJudge("B") }}
            Span.-smalltext 件
      #flex3
        paragraph-bold.-text 1時間以上
          Span.l-space(fontSize='tiny', color='error') {{ typeJudge("C") }}
            Span.-smalltext 件
      #flex4
        paragraph-bold.-text2 超過
          Span.l-space(fontSize='tiny', color='error') {{ typeJudge("D") }}
            Span.-smalltext2 件
  .timeline
    admin-menu-list(:CurrentContents='CurrentContents')
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { format, addDays, differenceInMinutes, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'
import AdminTab from '~/components/atoms/tab/AdminTab.vue'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import AdminMenuList from '~/components/organisms/menu/AdminMenuList.vue'
@Component({
  layout: 'AdminSmallLayout',
  components: {
    Heading,
    Span,
    SpanBold,
    Paragraph,
    ParagraphBold,
    AdminTab,
    AdminMenuList
  }
})
export default class AdminSmallIndex extends Vue {
  head() {
    return {
      title: '予約確認ページ',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  today_reserve_count = 20
  tomorrow_reserve_count = 19
  CurrentContents = 1
  mounted() {
    if (!this.isLogin) {
      this.$router.push('/dishup/login/')
    }
    this.$store.dispatch('modules/client/getListTodayData', this.sendTodayGet)
    setTimeout(function () {
      location.reload()
    }, 1000 * 300)
  }

  get todayGet() {
    return format(new Date(), 'MM/d (eee)', { locale: ja })
  }

  get sendTodayGet() {
    return format(new Date(), 'yyyy-MM-dd', { locale: ja })
  }

  get tomorrowGet() {
    return format(addDays(new Date(), 1), 'MM/d (eee)', { locale: ja })
  }

  get sendTomorrowGet() {
    return format(addDays(new Date(), 1), 'yyyy-MM-dd', { locale: ja })
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/client/getClientLoginInfo']
  }

  @Watch('loginInfo')
  getBack() {
    // console.log(this.isLogin)
  }

  current(isState: number): void {
    this.CurrentContents = isState
    if (this.CurrentContents === 1) {
      this.$store.dispatch('modules/client/getListTodayData', this.sendTodayGet)
    } else {
      this.$store.dispatch('modules/client/getListTomorrowData', this.sendTomorrowGet)
    }
  }

  get todayList() {
    // adminListmenuに飛ばす
    return this.$store.getters['modules/client/getListTodayData']
  }

  get tomorrowList() {
    return this.$store.getters['modules/client/getListTomorrowData']
  }

  get reserveNum() {
    // 予約件数,条件はどこでいれるか
    if (this.CurrentContents === 1) {
      return this.$store.getters['modules/client/getListTodayData'].length
    } else {
      return this.$store.getters['modules/client/getListTomorrowData'].length
    }
  }

  get LogoutStatus() {
    return this.$store.getters['modules/client/getClientLogoutStatus']
  }

  @Watch('LogoutStatus')
  GoLogin(val) {
    if (val.data != null) {
      if (val.data.status === true) {
        this.$router.push('/dishup/login/')
      }
    }
  }

  typeJudge(type) {
    let countA = 0
    let countB = 0
    let countC = 0
    let countD = 0
    if (this.CurrentContents === 1) {
      for (let i = 0; i < this.todayList.length; i++) {
        const dating = parseISO(this.todayList[i].pickUpDateTime)
        const result = differenceInMinutes(dating, new Date())
        if (result > 1 && result <= 30) {
          countA++
        } else if (result > 30 && result < 60) {
          countB++
        } else if (result >= 60) {
          countC++
        } else {
          countD++
        }
      }
    } else {
      for (let i = 0; i < this.tomorrowList.length; i++) {
        const dating = parseISO(this.tomorrowList[i].pickUpDateTime)
        const result = differenceInMinutes(dating, new Date())
        if (result > 1 && result <= 30) {
          countA++
        } else if (result > 30 && result < 60) {
          countB++
        } else if (result >= 60) {
          countC++
        } else {
          countD++
        }
      }
    }
    if (type === 'A') {
      return countA
    } else if (type === 'B') {
      return countB
    } else if (type === 'C') {
      return countC
    } else {
      return countD
    }
  }
}
</script>
<style lang="sass" scoped>
.tab
  position: relative
.tabs
  position: absolute
  background-color: #1ba1ff
  top: 61%
  left: 0%
  width: 100%
  text-align: center
  height: 50px
  border-radius: 2px
  .tabcontent
    padding-top: 12px
.contentpage
  padding-top: 25px
  .time
    text-align: center
  .timehead
    display: flex
    height: 30px
    #flex1
      width: 27%
      border-bottom: solid 8px
      border-color: #ffc11c
      margin-right: 2px
    #flex2
      width: 27%
      border-bottom: solid 8px
      border-color: #66c0ff
      margin-right: 2px
    #flex3
      width: 27%
      border-bottom: solid 8px
      border-color: #6eca75
      margin-right: 2px
    #flex4
      width: 19%
      border-bottom: solid 8px
      border-color: #ff1d1c
    .-text
      padding-left: 5px
      padding-top: 4px
      font-size: 10px
    .-smalltext
      font-size: 10px
    .-smalltext2
      font-size: 10px
    .-text2
      padding-left: 5px
      padding-top: 4px
      font-size: 10px
    .l-space
      padding-left: 5px
.timeline
  margin: 15px calc(50% - 50vw)
  width: 100vw
  background-color: $gray
@include pc_view
  .timeline
    background-color: white
</style>
