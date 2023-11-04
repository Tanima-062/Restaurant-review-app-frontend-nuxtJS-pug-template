<i18n src="~/locales/locale/mixin.yml"></i18n>

<template lang="pug">
  skyticket-footer(:is-login='isLogin')
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Footer extends Vue {
  get isLogin() {
    return Object.keys(this.userData).length > 0
  }

  get userData() {
    return this.$store.getters['modules/user/getUserInfo']
  }
}
</script>
<style lang="sass" scoped></style>
