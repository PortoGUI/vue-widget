<template>
  <app-widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appWidget from './views/widget/index.vue'

export default defineComponent({
  components: {
    appWidget
  }
})
</script>
