<template lang="pug">
  .skeleton-item(:style="styles")
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    margin: {
      type: String,
      default: ''
    },
    padding: {
      type: String,
      default: ''
    },
    borderRadius: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const styles = computed(() => {
      return {
        width: props.width,
        height: props.height,
        margin: props.margin,
        padding: props.padding,
        borderRadius: props.borderRadius
      }
    })

    return {
      styles
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes skeltonLoading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skeleton-item {
  position: relative;
  overflow: hidden;
  background-color: #e4e4e4;
  &::before {
    content: '';
    display: block;
    width: inherit;
    height: inherit;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    position: absolute;
    top: 0;
    left: 0;
    animation: skeltonLoading 1.2s linear infinite;
  }
}
</style>
