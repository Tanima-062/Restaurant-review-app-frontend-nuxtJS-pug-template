<template lang="pug">
base-drawer.-menu(
  :isActive='isOpenMenuDrawer',
  direction='ltr',
  :withHeader='false',
  @close='closeMenuDrawer'
)
  .-header
    h2.-title
      nuxt-link.-link(to='/')
        Skyticket.-logo
    button.-close(@click='closeMenuDrawer')
      cross.-cross
  .-contents
    section
      h4.-headline {{ menu.title[0].search }}
      el-collapse.-collapse
        template(v-slot:title)
          .-items
            Span(fontSize='small') スカイチケットのサービス
            next.-next.-dropdown
        ul.-service
          li(v-for='(data, i) in menu.listsearch_a')
            a.-items(:href='data.link')
              div
                component.-icon(:is='data.icon')
                Span(fontSize='tiny') {{ data.title }}
              next.-next
          span.-items(@click='down', v-show='moreRead') もっと見る
            next.-next
          li(v-for='(data, i) in menu.listsearch_b', v-show='secondList')
            a.-items(:href='data.link')
              div
                component.-icon(:is='data.icon')
                Span(fontSize='tiny') {{ data.title }}
              next.-next
          span.-items(@click='up', v-show='moreRead2') もっと見る
            next#up.-next
    section
      h4.-headline {{ menu.title[0].booking }}
      ul.-list(v-if='isLogin')
        li(v-for='(data, i) in menu.listbooking_login')
          button.-items.-logout(
            v-if='data.icon === "logout"',
            @mousedown.prevent='submitLogout',
            @touchstart.prevent='submitLogout',
            data-name='menu',
            tabindex='0'
          )
            | {{ data.title }}
            next.-next
          a.-items(v-else, :href='data.link')
            | {{ data.title }}
            next.-next
      el-collapse.-collapse(v-else)
        template(v-slot:title)
          .-items
            Span(fontSize='small') {{ menu.title[0].login }}
            next.-next.-dropdown
        ul.-service-admin
          li(v-for='(data, i) in menu.listbooking')
            a.-items(:href='data.link')
              div
                //- component.-icon(:is='data.icon')
                Span(fontSize='tiny') {{ data.title }}
                badge(
                  v-if='data.icon === "mail"',
                  :badgeCount='userData.unreadCnt'
                )
              next.-next
    section
      h4.-headline {{ menu.title[0].support }}
      ul.-list
        li(v-for='(data, i) in menu.listsupport')
          template(v-if='data.title == "よくある質問"')
            a.-items(href='/info/faq')
              | {{ data.title }}
              next.-next
          template(v-else-if='data.title == "キャンセルについて"')
            a.-items(href='/info/cancel')
              | {{ data.title }}
              next.-next
          template(v-else-if='data.title == "よくある質問"')
            a.-items(href='/info/flow')
              | {{ data.title }}
              next.-next
          template(v-else)
            a.-items(:href='data.link')
              | {{ data.title }}
              next.-next
    //-国際的な通貨や言語が必要になった場合、こちらのコメントを外す
      section(v-if='$slots.localization')
       slot(name='localization')
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import Skyticket from '~/components/atoms/logo/Skyticket.vue'
import { Span } from '~/components/atoms/typography'
import Next from '~/assets/icon/next.svg'
import Cross from '~/assets/icon/cross-white.svg'
import ServiceDomestic from '~/assets/icon/service-domestic.svg'
import ServiceInternationalFlights from '~/assets/icon/service-international-flights.svg'
import ServiceHotel from '~/assets/icon/service-hotel.svg'
import ServiceTourTrain from '~/assets/icon/service-tour-train.svg'
import ServiceDp from '~/assets/icon/service-dp.svg'
import ServiceDpIa from '~/assets/icon/service-dp-ia.svg'
import ServiceRentacar from '~/assets/icon/service-rentacar.svg'
import ServiceBus from '~/assets/icon/service-bus.svg'
import ServiceGourmet from '~/assets/icon/service-gourmet.svg'
import ServiceFerry from '~/assets/icon/service-ferry.svg'
import ServiceWifi from '~/assets/icon/service-wifi.svg'
import ServiceTour from '~/assets/icon/service-tour.svg'
import ServiceInsurance from '~/assets/icon/service-insurance.svg'
import ServicePremium from '~/assets/icon/service-premium.svg'
import ServiceGuide from '~/assets/icon/service-guide.svg'
import ServiceCars from '~/assets/icon/service-cars.svg'
import FileText from '~/assets/icon/file-text.svg'
import UserShape from '~/assets/icon/user-shape.svg'
import Calendar from '~/assets/icon/calendar.svg'
import Mail from '~/assets/icon/mail.svg'
import Cog from '~/assets/icon/cog.svg'
import Logout from '~/assets/icon/logout.svg'
import Badge from '~/components/atoms/icons/Badge.vue'
import { AuthTypes } from '~/types/authTypes'

@Component({
  components: {
    BaseDrawer,
    Skyticket,
    Span,
    Next,
    Cross,
    ServiceDomestic,
    ServiceInternationalFlights,
    ServiceHotel,
    ServiceTourTrain,
    ServiceDp,
    ServiceDpIa,
    ServiceRentacar,
    ServiceBus,
    ServiceGourmet,
    ServiceFerry,
    ServiceWifi,
    ServiceTour,
    ServiceInsurance,
    ServicePremium,
    ServiceGuide,
    ServiceCars,
    FileText,
    UserShape,
    Calendar,
    Mail,
    Cog,
    Logout,
    Badge
  }
})
export default class BlockMenuListSP extends Vue {
  @Prop() menu!: object
  @Prop() isOpenMenuDrawer!: boolean
  @Prop() isLogin!: boolean
  @Prop() userData?: AuthTypes.UserData

  currentActive = this.isOpenMenuDrawer
  secondList = false
  moreRead = true
  moreRead2 = false

  submitLogout(): void {
    location.href = '../user/logout.php'
  }

  @Watch('isOpenMenuDrawer')
  onIsActiveChange(newIsActive) {
    this.currentActive = newIsActive
  }

  @Emit('closeMenuDrawer')
  closeMenuDrawer(): void {
    // 親に伝えるだけ
  }

  down() {
    this.secondList = true
    this.moreRead = false
    this.moreRead2 = true
  }

  up() {
    this.secondList = false
    this.moreRead = true
    this.moreRead2 = false
  }
}
</script>

<style lang="sass" scoped>
.-menu :deep()
  .-content
    padding: 0
  .el-collapse-item__header
    height: auto
    line-height: 1
    .el-collapse-item__arrow
      display: none
.-menu
  width: 85%
  .-header
    padding: 12px
    background-color: $main_color
    .-link
      display: block
      position: relative
      text-decoration: none
      .-logo
        display: block
        margin: 0 auto
        width: 105px
        fill: $white
    .-close
      position: absolute
      top: 0
      left: 0
      height: 50px
      width: 50px
      text-align: center
      z-index: 1
      background-color: transparent
      border: none
      &:focus
        outline: none
    .-cross
      width: 20px
      height: 20px
      fill: $white
  .-contents
    .-headline
      padding: 8px 16px
      background-color: $light_gray
      font-size: $font_size_tiny
      font-weight: 100
      line-height: 1
    .-collapse
      .-dropdown
        transform: rotate(90deg)
      .is-active
        .-dropdown
          transform: rotate(-90deg)
    .-service
      padding-left: 20px
      .-icon
        width: 14px
        height: 14px
        margin-right: 8px
        fill: $sub_color
    .-items
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      height: 40px
      line-height: 40px
      padding: 0 16px
      border-bottom: 1px solid $light_gray
      &.-logout
        border: none
        background: #fff
        cursor: pointer
        font-size: $font_size_default_sp
      .-next
        width: 12px
        height: 12px
    .-list
      .-items
        border-bottom: none
#up
  transform: rotate(-90deg)
</style>
