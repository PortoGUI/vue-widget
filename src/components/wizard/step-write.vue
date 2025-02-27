<template>
  <div class="flex flex-col items-center justify-center w-full my-5">
    <textarea v-model="state.feedback"
      class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none" name=""
      id="">
    </textarea>
    <button
      class="rounded-lg font-black mt-3 flex felx-col justify-center items-center py-2 w-full cursor-pointer focus:outline-none transition-all duration-200"
      :disabled="submitButtonEnabled" :class="{
        'opacity-50': state.isLoading,
        'bg-brand-main text-white': !submitButtonEnabled,
        'opacity-50 bg-gray-100 text-gray-500': submitButtonEnabled
      }" @click="submitFeedback">
      <i v-if="state.isLoading" class="material-icons animate-spin text-white">sync</i>
      <template v-else>
        Enviar Feedback
      </template>
    </button>
  </div>
</template>

<script lang="ts">
import { setMessage } from '../../store'
import { computed, ComputedRef, defineComponent, reactive } from 'vue'

import services from '../../services'
import useStore from '../../hooks/store'
import useNavigation from '../../hooks/navegation'

type State = {
  feedback: string
  isLoading: boolean
  hasError: unknown | Error | null
}

interface SetupReturn {
  state: State
  submitFeedback(): Promise<void>
  submitButtonEnabled: ComputedRef<boolean>
}

export default defineComponent({
  name: 'appWrite',
  setup(): SetupReturn {
    const store = useStore()
    const { setErrorState, setSuccessState } = useNavigation()
    const state = reactive<State>({
      feedback: '',
      isLoading: false,
      hasError: null
    })

    const submitButtonEnabled = computed<boolean>(() => {
      return !state.feedback.length
    })

    function handleError(error: unknown | Error) {
      state.hasError = error
      state.isLoading = false
      setErrorState()
    }

    async function submitFeedback(): Promise<void> {
      setMessage(state.feedback)
      state.isLoading = true
      try {
        const response = await services.feedback.create({
          type: store.feedbackType,
          text: store.message,
          page: store.currentPage,
          apiKey: store.apikey,
          device: window.navigator.userAgent,
          fingerprint: store.fingerprint
        })

        if (!response.errors) {
          setSuccessState()
        } else {
          setErrorState()
        }

        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      submitFeedback,
      submitButtonEnabled
    }
  }
})
</script>
