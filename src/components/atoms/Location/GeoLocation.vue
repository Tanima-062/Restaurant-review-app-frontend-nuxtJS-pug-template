<template lang="pug">
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
@Component
export default class GeoLocation extends Vue {
  public mounted(): void {
    this.GeolocationSearch()
  }

  async GeolocationSearch() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        // success処理
        async (res) => {
          const dataLocation = {
            latitude: res.coords.latitude,
            longitude: res.coords.longitude
          }
          await this.$store.dispatch('modules/user/setLocation', dataLocation)
          await this.setLocation()
          // this.$router.push('/map/').catch(() => {
          //   // promiseをキャッチ
          // })
        },
        // err処理
        async (err) => {
          console.log(err)
          await this.$store.dispatch('modules/user/resetLocation')
          await this.denied()
        },
        // option
        {
          enableHighAccuracy: false,
          timeout: 3000,
          maximumAge: 0
        }
      )
    } else {
      // console.log('拒否されました')
    }
  }

  @Emit('denied')
  denied() {
    // 親に教える
  }

  @Emit('setLocation')
  setLocation() {
    // 親に教える
  }
}
</script>

<style scoped lang="sass"></style>
