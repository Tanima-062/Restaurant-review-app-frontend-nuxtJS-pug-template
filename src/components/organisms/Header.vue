<i18n src="~/locales/locale/mixin.yml"></i18n>

<template lang="pug">
  skyticket-header(:is-login='isLogin', :show-app-promotion="showAppPromotion", :show-banner="showBanner", :show-line-menu="showLineMenu", :service="service", language='japanese', country='japan', currency="", :notice="userData.unreadCnt")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Header extends Vue {
  @Prop({ default: 'restaurant' }) service?: string
  @Prop({ default: true }) showBanner?: boolean
  @Prop({ default: true }) showAppPromotion?: boolean
  @Prop({ default: true }) showLineMenu?: boolean
  get isLogin() {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }
}
</script>
<style lang="sass" scoped></style>
