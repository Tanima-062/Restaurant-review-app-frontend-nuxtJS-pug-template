<template lang="pug">
.hotel-restaurant-skeleton
  skeleton-item(width="100%", :height="'52px'" margin="24px 0")
  skeleton-item(width="100%", :height="'60px'" margin="24px 0")
  .skeleton-item(v-for="i in 2" :key="i")
    skeleton-item(width="50%", :height="'36px'" :margin="$device.isDesktop ? '0 0 24px 0' : '0 16px 24px 16px'")
    .flex
      skeleton-item(width="24px", height="24px", borderRadius="24px", margin="0 0 16px 16px")
      skeleton-item(width="20%", height="24px" margin="0 0 16px 8px")
      skeleton-item(width="24px", height="24px", borderRadius="24px", margin="0 0 16px 16px")
      skeleton-item(width="20%", height="24px" margin="0 0 16px 8px")
    skeleton-item(width="100%", :height="'200px'" margin="0 0 16px 0")

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SkeletonItem from '@/components/atoms/skeleton/SkeletonItem.vue'

export default defineComponent({
  name: 'HotelRestaurantSkeleton',
  components: { SkeletonItem }
})
</script>
<style lang="sass" scoped>
.flex
  display: flex
</style>
