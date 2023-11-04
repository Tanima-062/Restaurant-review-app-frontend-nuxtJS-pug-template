<template lang="pug">
div.-menu
  div.-inner
    section.-service-menu
      h3.-title {{menu.title[0].search}}
      ul.-list.-menu-a
        li(v-for="(data, i) in menu.listsearch_a").-items
          a(:href="data.link" data-name="menu" tabindex="0").-link {{data.title}}
            next.-next
      ul.-list.-menu-b
        li(v-for="(data, i) in menu.listsearch_b")
          a(:href="data.link" data-name="menu" tabindex="0").-link {{data.title}}
            next.-next
    section.-support
      h3.-title {{menu.title[0].support}}
      ul.-list
        li(v-for="(data, i) in menu.listsupport").-items
          a(:href="data.link" data-name="menu" tabindex="0").-link
            component(:is="data.icon").-icon
            | {{data.title}}
            next.-next
    section
      h3.-title {{menu.title[0].booking}}
      ul(v-if="isLogin").-list
        li(v-for="(data, i) in menu.listbooking_login").-items
          button(v-if="data.icon === 'logout'" @mousedown.prevent="submitLogout" @touchstart.prevent="submitLogout" data-name="menu" tabindex="0").-link.-logout
            component(:is="data.icon").-icon
            | {{data.title}}
            next.-next
          a(v-else :href="data.link" data-name="menu" tabindex="0").-link
            component(:is="data.icon").-icon
            | {{data.title}}
            badge(v-if="data.icon === 'mail'" :badgeCount="userData.unreadCnt")
            next.-next
      ul(v-else).-list
        li(v-for="(data, i) in menu.listbooking").-items
          a(:href="data.link" data-name="menu" tabindex="0").-link
            component(:is="data.icon").-icon
            | {{data.title}}
            next.-next
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Next from '~/assets/icon/next.svg'
import Blocked from '~/assets/icon/blocked.svg'
import InfoButton from '~/assets/icon/info-button.svg'
import Question from '~/assets/icon/question.svg'
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
    Next,
    Blocked,
    InfoButton,
    Question,
    FileText,
    UserShape,
    Calendar,
    Mail,
    Cog,
    Logout,
    Badge
  }
})
export default class BlockMenuList extends Vue {
  @Prop() menu!: object
  @Prop() isLogin!: boolean
  @Prop() userData?: AuthTypes.UserData

  submitLogout(): void {
    location.href = '../user/logout.php'
  }
}
</script>

<style lang="sass" scoped>
.-menu
  position: absolute
  top: 6px
  width: 100%
  min-width: $container_max_width_pc
  background-color: $white
  padding: 24px 0 32px
  box-shadow: 0 2px 4px 1px rgba(0,0,0,.4)
  z-index: 100
  .-inner
    display: table
    width: 1000px
    margin: 0 auto
    .-title
      font-size: 12px
    .-list
      display: inline-block
      vertical-align: top
      width: 240px
    .-items
      padding-left: 8px
    .-link
      display: block
      position: relative
      padding: 16px
      font-size: $font_size_tiny
      border-bottom: solid 1px $light_gray
      &.-logout
        text-align: left
        width: 100%
        border-width: 0 0 1px 0
        background: #fff
        cursor: pointer
        z-index: 1
    .-icon
      display: inline-block
      margin-right: 8px
      width: 14px
      height: 14px
      vertical-align: text-top
      fill: $dark_gray
    .-next
      position: absolute
      top: 50%
      right: 12px
      width: 14px
      height: 14px
      margin-top: -7px
      font-size: 10px
  .-service-menu
    display: table-cell
    vertical-align: top
    width: 500px
  .-support
    display: table-cell
    vertical-align: top
    width: 240px
  .badge
    vertical-align: middle
</style>
