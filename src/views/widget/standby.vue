<template>
  <div class="fixed z-50 right-0 bottom-0 m-4 flex justify-center items-center bg-brand-main rounded-full h-12 w-12 shadow cursor-pointer select-none
    animate__animated animate__fadeInUp animate__faster" title="Deixe um FeedBack" @click="() => $emit('open-box')">
    <img src="../../../public/favicon.svg" alt="widget-icon">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'appStandby',
  emits: ['open-box'],
  setup() {
    return {}
  }
})
</script>
