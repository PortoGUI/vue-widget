<template>
  <teleport to="body" />
  <component :is="state.component" @open-box="handleOpenBox" @close-box="handleCloseBox" />
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'

import Box from './box.vue'
import Standby from './standby.vue'
import useStore from '../../hooks/store'
import useIFrameControl from '../../hooks/iframe'

type State = { component: string }

interface SetupReturn {
  state: State,
  handleOpenBox(): void,
  handleCloseBox(): void,
}

export default defineComponent({
  name: 'appWidget',
  components: {
    Standby,
    Box
  },
  setup(): SetupReturn {
    const store = useStore()
    const iframe = useIFrameControl()

    const state = reactive<State>({
      component: 'Standby'
    })

    watch(() => store.currentComponent, () => {
      iframe.upadateCoreValuesOnStore()
    })

    function handleOpenBox(): void {
      iframe.notifyOpen()
      state.component = 'Box'
    }
    function handleCloseBox(): void {
      iframe.notifyClose()
      state.component = 'Standby'
    }

    return {
      state,
      handleOpenBox,
      handleCloseBox
    }
  }
})
</script>
