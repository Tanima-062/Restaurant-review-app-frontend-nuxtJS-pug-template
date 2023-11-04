<template lang="pug">
div
  div.reservation-number-card(:class="`-${bgColor}-bg`")
    section.-message-card.-center(v-if="messageType !==''")
      template(v-if="messageType === 'complete'")
        div.-checkmark-circle
          checkmark.-check-icon
        paragraph-bold.-message.-center.mt-l(fontSize="large" color="main") 予約が完了いたしました！
        paragraph.-message {{companyName}}により、予約が承認されました。<br/>
          |{{email}}宛に詳細を記載したメールをお送りしています。
      template(v-if="messageType === 'almost'")
        warning.-warning-icon
        paragraph-bold.-message.-center.mt-l(color="error") 予約完了まであと少し！
        paragraph.-message {{companyName}}による予約確定待ちです。最大48時間かかる場合がありますので、ご了承ください。
          |48時間以内に確定の連絡がない場合は、弊社よりご連絡させていただきます。
    div.-number-list
      div.-inner
        paragraph(fontSize="tiny") お客様の予約番号
        paragraph-bold(fontSize="big" v-text="'IR'+reservationNumber")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography/'
import Checkmark from '~/assets/icon/checkmark.svg'
import Warning from '~/assets/icon/warning.svg'
@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Checkmark,
    Warning
  }
})
export default class ReservationNumberCard extends Vue {
  @Prop() reservationNumber!: string
  @Prop({ default: '' }) status?: string
  @Prop({ default: 'sampleCompany' }) companyName?: string
  @Prop({ default: 'sample@gmail.com' }) email?: string

  private bgColor: 'success' | 'warning' = 'success'
  private messageType: 'complete' | 'almost' | '' = ''

  mounted() {
    if (this.status === 'TMP_RESERVE') {
      this.bgColor = 'warning'
      this.messageType = 'almost'
    } else if (this.status === 'RESERVE') {
      this.bgColor = 'success'
      this.messageType = 'complete'
    }
  }
}
</script>

<style lang="sass" scoped>
$checkmark_icon_height: 29px
$checkmark_icon_width: 37px
$warning_icon_height: 23px
$warning_icon_width: 23px
.reservation-number-card
  border-radius: 3px
  &.-success-bg
    background-color: $notice_color
  &.-warning-bg
    background-color: $warning_color
  .-message-card
    @include pc_view
      padding: 32px 168px 0
    @include sp_view
      padding: 32px 8px 0
  .-message
    width: fit-content
    margin: 24px auto 0
  .-inner
    background-color: $white
    text-align: center
    padding: 8px 32px
    border-radius: 3px
    width: 100%
  .-center
    text-align: center
  .-check-icon
    fill: $main_color
    height: $checkmark_icon_height
    width: $checkmark_icon_width
    position: absolute
    top: -5px
    left: -3px
  .-checkmark-circle
    background-color: $white
    width: 30px
    height: 30px
    border-radius: 50%
    margin: 0 auto
    position: relative
  .-warning-icon
    height: $warning_icon_height
    width: $warning_icon_width
    fill: $error_color
  .-number-list
    display: grid
    padding: 32px 40px
    @include pc_view
      grid-template-columns: 1fr 1fr
      grid-gap: 40px
    @include sp_view
      grid-template-columns: 1fr
      grid-gap: 16px
</style>
