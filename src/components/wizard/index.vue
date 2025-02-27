<template>
  <component :is="store.currentComponent" @select-feedback-type="handleSelectFeedbackType" @next="next" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { setFeedbackType, TstoreState } from '../../store'
import useNavigation, { Inavigation } from '../../hooks/navegation'

import useStore from '../../hooks/store'

import StepWrite from './step-write.vue'
import StepError from './step-error.vue'
import StepSuccess from './step-success.vue'
import stepSelectType from './step-select-type.vue'

interface SetupReturn {
  store: TstoreState
  handleSelectFeedbackType(type: string): void
  next: Inavigation['next']
}

export default defineComponent({
  name: 'appWizard',
  components: {
    stepSelectType, StepWrite, StepSuccess, StepError
  },
  setup(): SetupReturn {
    const store = useStore()
    const { next } = useNavigation()

    function handleSelectFeedbackType(type: string): void {
      setFeedbackType(type)
    }

    return {
      store,
      next,
      handleSelectFeedbackType
    }
  }
})
</script>
