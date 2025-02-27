<template>
  <div class="box animate__animated animate__fadeInUp animate__faster">
    <div class="relative w-full flex" :class="{ 'justify-between': canShowInfo, 'justify-end': !canShowInfo }">
      <button v-if="canShowInfo" class="text-xl text-gray-800 focus:outline-none" :class="{ invisible: canGoBack }"
        :disabled="canGoBack" @click="back()">
        <i class="material-icons invert-icon text-gray-800">arrow_right_alt</i>
      </button>
      <p v-if="canShowInfo" class="text-xl font-black text-center text-brand-main">
        {{ label }}
      </p>
      <button class="text-xl text-gray-800 focus:outline-none" @click="() => $emit('close-box')">
        <i class="material-icons text-gray-800">close</i>
      </button>
    </div>

    <wizard />

    <div class="text-gray-800 text-sm flex" v-if="canShowInfo">
      <i class="material-icons text-brand-graydark invert-icon">feedback</i>
      <p class="ml-1">Widget by <b>Feedbacker</b></p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'

import useStore from '../../hooks/store'
import useNavigation, { Inavigation } from '../../hooks/navegation'

import wizard from '../../components/wizard/index.vue'

type SetupReturn = {
  label: ComputedRef<string>
  canGoBack: ComputedRef<boolean>
  canShowInfo: ComputedRef<boolean>
  back: Inavigation['back']
}

export default defineComponent({
  name: 'appBox',
  emits: ['close-box'],
  components: { wizard },
  setup(): SetupReturn {
    const store = useStore()
    const { back } = useNavigation()

    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema'
      }

      if (store.feedbackType === 'IDEA') {
        return 'Nos conte sua ideia'
      }

      if (store.feedbackType === 'OTHER') {
        return 'Solte sua criatividade'
      }

      return 'O que tem em mente?'
    })

    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'step-select-type'
    })

    const canShowInfo = computed<boolean>(() => {
      return store.currentComponent !== 'step-success' && store.currentComponent !== 'step-error'
    })

    return {
      back,
      label,
      canGoBack,
      canShowInfo
    }
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 m-4 p-4 bg-white rounded-xl flex flex-col items-center shadow select-none;
  width: 400px;
}

.invert-icon {
  @apply transform scale-x-[-1]
}
</style>
