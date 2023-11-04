<template lang="pug">
.inquiry
  full-loading(
    v-if='!completeStatus.reservation || isLoading',
    :isLoading='!completeStatus.reservation || isLoading'
  )
  template(v-else)
    .topimages
      heading.thema(:number='1', fontSize='m') skyticketグルメのご利用ありがとうございました
    .Rectbox
      .circleBox
        paragraph-bold.-question(fontSize='small') skyticketグルメはいかがでしたか？
      no-ssr
        paragraph-bold#questionnaire-details.-text(
          fontSize='small',
          v-if='$window.width > 767'
        ) サービス改善の為、お客様にアンケートをお願いしております。<br>お答えいただいた内容につきましては、今後のサービスへ向けた活動の大切な資料としてのみ利用させていただきます。
        paragraph-bold#questionnaire-details.-text(fontSize='tiny', v-else) サービス改善の為、お客様にアンケートをお願いしております。お答えいただいた内容につきましては、今後のサービスへ向けた活動の大切な資料としてのみ利用させていただきます。
    .ansBox(v-if='!completeStatus.reservation.hasReview && viewFlag')
      .takeout(v-if='appCd === "TO"')
        paragraph.smallquest(fontSize='medium')
          span-bold#emphasis-sentence ご注文いただいたメニューの中で、評価したいものを一つお選びください
          Span(color='error') （必須）
        template(v-if='foodList.length == 1')
          p {{ foodList[0].label }}
        template(v-else)
          select-box#option(:value='selectedMenu', @change='changemenu')
            option(
              v-for='item in foodList',
              :label='item.label',
              :key='item.value'
            ) {{ item.value }}
      //- レストラン用のプラン名
      .restaurant(v-else)
        paragraph.PlanBox(fontSize='medium')
          span-bold#emphasis-sentence ご注文いただいたプラン名
          .planName {{ "特別コース 全８種" }}
      paragraph#check.smallquest(fontSize='medium')
        template(v-if='appCd === "TO"')
          span-bold#emphasis-sentence 下記の内容の中から、このメニューに対する評価を1つお選びください
        template(v-else)
          span-bold#emphasis-sentence 下記の内容の中から、このプランに対する評価を1つお選びください
        Span(color='error') （必須）
      simple-radio(
        :initValue='questionnaire',
        :radioContents='radiolist',
        :isEither='true',
        @changeOption='result'
      )
      paragraph.smallquest(fontSize='medium')
        span-bold#emphasis-sentence(fontSize='medium') お店をご利用になったご感想など、差し支えない程度にお答えください
        Span （任意）
      validated-text-area(
        :value='review',
        name='レビューアンケート',
        height=140,
        maxlength='1000',
        :flag='false',
        placeholder='1000文字以内でご回答ください',
        @input='reviewinput'
      )
      paragraph.smallquest(fontSize='medium', v-if='isLogin')
        span-bold#emphasis-sentence お名前のご選択をお願いいたします
      name-radio(
        :initValue='nameOption[0].text',
        :radioContents='nameOption',
        :isEither='true',
        @changeOption='nameresult',
        :name='userName',
        v-if='isLogin'
      )
      .underbtn
        CTA-button(
          text='アンケートに協力する',
          type='secondary',
          fontSize='large',
          @click='submit()',
          :disabled='completeStatus.reservation.hasReview'
        )
      paragraph.mt-30(fontSize='tiny') 本アンケートの結果は、スカイチケットのコンテンツ等で公開・または活用させていただく事がございます。<br>また、本アンケートに記載いただいたコメントに関する著作権は、スカイチケットに帰属いたします。
    .thanksbox(v-else)
      paragraph-bold.thanks(fontSize='medium') アンケートにご協力ありがとうございました。
      paragraph.thanks(fontSize='tiny') 今後とも
        span-bold(color='main', fontSize='tiny') skyticketグルメ
        Span(fontSize='tiny') をご活用下さい！
      .underbtn
        CTA-button.btn(
          text='skyticketグルメを探す',
          type='secondary_sub',
          fontSize='large',
          @click='goTakeout()'
        )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import NameRadio from '~/components/molecules/radio/NameRadio.vue'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
import SimpleRadio from '~/components/molecules/radio/SimpleRadio.vue'
import ValidatedTextArea from '~/components/molecules/textarea/ValidatedTextArea.vue'
@Component({
  components: {
    CTAButton,
    FullLoading,
    Heading,
    NameRadio,
    Paragraph,
    ParagraphBold,
    SelectBox,
    SimpleRadio,
    Span,
    SpanBold,
    ValidatedTextArea
  }
})
export default class InquiryIndex extends Vue {
  head() {
    return {
      title: 'グルメ',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 0,
      headerTitle: 'グルメ'
    })
  }

  radiolist = [
    {
      label: '料理がおいしい',
      text: '料理がおいしい'
    },
    {
      label: 'コスパが良い',
      text: 'コスパが良い'
    },
    {
      label: '写真映えする',
      text: '写真映えする'
    },
    {
      label: 'リピートしたい',
      text: 'リピートしたい'
    }
  ]

  nameOption = [
    {
      label: '本名で投稿',
      text: '本名で投稿'
    },
    {
      label: '匿名で投稿',
      text: '匿名で投稿'
    }
  ]

  private questionnaire = this.radiolist[0].text
  private nameQuestionnaire = this.nameOption[0].text
  private review = ''
  private selectedMenu = 0
  private isLoading = true
  private viewFlag = true
  mounted() {
    setTimeout(() => {
      // ログイン情報があるか確認
      this.$store.dispatch('modules/user/getUserData')
      this.$store.dispatch('modules/reservationGourmet/LoginForm')

      this.isLoading = false
    }, 0)
  }

  result(data: string): void {
    this.questionnaire = data
  }

  nameresult(data: string): void {
    this.nameQuestionnaire = data
  }

  changemenu(data: number): void {
    this.selectedMenu = data
  }

  submit() {
    this.viewFlag = false
    let code = 'COOKING'
    let nameFlag = false
    if (this.questionnaire === '料理がおいしい') {
      code = 'COOKING'
    } else if (this.questionnaire === 'コスパが良い') {
      code = 'GOOD_DEAL'
    } else if (this.questionnaire === '写真映えする') {
      code = 'SHINE'
    } else {
      code = 'REPEAT'
    }
    if (this.isLogin) {
      if (this.nameQuestionnaire === '本名で投稿') {
        nameFlag = true
      } else {
        nameFlag = false
      }
    } else {
      nameFlag = false
    }
    const databox = {
      reservationNo: this.reservationNo,
      menuId: this.selectedMenu,
      evaluationCd: code,
      body: this.review,
      isRealName: nameFlag
    }
    this.$store.dispatch('modules/reservationGourmet/SendInquiry', databox)
  }

  goTakeout() {
    this.$router.push('/')
  }

  reviewinput(data: string): void {
    this.review = data
  }

  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve']
  }

  get isLogin(): boolean {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }

  get userName() {
    return this.$store.getters['modules/user/getUserName']
  }

  get foodList(): { value: number; label: string }[] {
    const foods: { value: number; label: string }[] = []
    const reservation = this.completeStatus.reservation ? this.completeStatus.reservation : {}
    const menus = reservation.reservationMenus ? reservation.reservationMenus : []
    if (menus.length > 0) {
      this.selectedMenu = menus[0].id
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].count > 0) {
          foods.push({ value: menus[i].id, label: menus[i].name })
        }
      }
    }
    return foods
  }

  get getLoginForm() {
    return this.$store.getters['modules/reservationGourmet/getloginForm']
  }

  get reservationNo() {
    return this.$store.getters['modules/reservationGourmet/getReservationNum']
  }

  // サービスコード取得
  get appCd() {
    return this.completeStatus.reservation.appCd
  }
}
</script>
<style lang="sass" scoped>
.inquiry
  width: 100%
  min-width: 320px
  position: relative
  min-height: auto
  .topimages
    height: 200px
    background: url('~@/static/img/take_img/bg_takeout.png')no-repeat
    background-size: cover
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
  #option
    -webkit-appearance: auto
  .thema
    color: white
    text-align: left
    padding-top: 20px
    width: 90%
    margin: 0 auto
  #questionnaire-details
    padding: 0 20px
  .Rectbox
    position: absolute
    top: 0%
    left: 0%
    right: 0%
    width: 343px
    margin: 0 auto
    padding-bottom: 12px
    border-radius: 6px
    background-color: #e4e4e4
    margin-top: 90px
    padding-top: 5px
    .circleBox
      margin: 10px auto
      width: 85%
      height: 30px
      border-radius: 15px
      background-color: #ffffff
      .-question
        text-align: center
        padding-top: 4px
    .-text
      text-align: left
      margin: 0 10px
  .ansBox
    width: 100%
    min-width: 320px
    margin: 0
    margin-top: 65px
    .smallquest
      margin: 10px auto
      position: relative
  .underbtn
    display: flex
    justify-content: center
    align-items: center
    text-align: center
  .btn
    margin: 10px 0
    &:hover
      opacity: 0.6
  .mt-30
    margin: 30px 0
  .thanksbox
    margin: 80px auto
    text-align: center
.planName
  margin-top: 15px
  background-color: #f4f4f4
  padding: 15px 17px
@include pc_view
  .inquiry
    #option
      width: 80%
    h1.thema
      font-size: 32px
      padding-top: 50px
      text-align: center
    .Rectbox
      width: 991px
      height: 130px
      border-radius: 6px
      background-color: #e4e4e4
      margin: 0 auto
      margin-top: 120px
      padding-top: 5px
      .circleBox
        margin: 10px auto
        width: 45%
        height: 40px
        border-radius: 20px
        background-color: #ffffff
        .-question
          text-align: center
          font-size: 20px
      .-text
        text-align: center
    .ansBox
      max-width: 991px
      width: 100%
    #check
      margin-top: 35px
    #emphasis-sentence
      font-size: 20px
    #questionnaire-details
      font-size: 14px
    .mt-30
      margin: 30px 0
      text-align: center
</style>
