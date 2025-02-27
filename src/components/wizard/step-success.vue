<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <i class="material-icons text-brand-success !text-8xl animate__animated animate__flipInY">check_circle</i>

    <p class="text=xl font-black text-center w-full mt-2">Obrigado, recebemos o seu Feedback.</p>

    <div class="flex justify-center items-center w-full mt-2">
      <button
        class="rounded-full font-regular text-sm flex flex-col justify-center items-center bg-brand-gray py-2 px-5 cursor-pointer focus:outline-none"
        @click="goBack">
        Enviar mais FeedBacks
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resetStore } from '../../store'

interface SetupReturn {
  goBack(): void
}

export default defineComponent({
  name: 'appSuccess',
  setup(): SetupReturn {
    function goBack(): void {
      resetStore()
    }
    return { goBack }
  }
})
</script>
