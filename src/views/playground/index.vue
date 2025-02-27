<template>
  <div class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-main">
    <h1 class="text-6xl font-black text-gray-800">PlayGround</h1>
    <p class="text-2xl mt-3 font-regular text-gray-700">Use para testar o widget</p>
  </div>
  <div class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-gray">
    <h1 class="text-6xl font-black text-brand-graydark">🚀</h1>

    <div class="relative z-0 mt-3 w-full px-2 animate__animated animate__fadeIn animate__faster">
      <input :type="state.inputType === 'visibility_off' ? 'password' : 'text'" id="small_standard"
        class="block w-full px-0 pb-0 pt-2 text-sm rounded-none text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-brand-main focus:outline-none focus:ring-0 focus:border-brand-main peer"
        placeholder=" " />
      <label for="small_standard"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 -z-10 origin-[0] peer-focus:start-2 peer-focus:text-brand-main peer-focus:dark:text-brand-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
        Senha
      </label>
      <button class="absolute top-1 right-0 mr-2 rounded-sm flex justify-center items-center"
        @click="toggleVisibilityHandler()">
        <i class="material-icons scale-75 text-gray-400">{{ state.inputType }}</i>
      </button>
    </div>

  </div>
  <div class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-main">
    <h1 class="text-6xl font-black text-brand-gray">🌚</h1>
  </div>
  <div class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-gray">
    <h1 class="text-6xl font-black text-brand-graydark">👀</h1>
  </div>
  <app-widget />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import appWidget from '../widget/index.vue'

export default defineComponent({
  name: 'appPlayground',
  components: {
    appWidget
  },
  setup() {
    const state = reactive({
      inputType: 'visibility_off'
    })

    function toggleVisibilityHandler() {
      state.inputType = state.inputType === 'visibility_off' ? 'visibility' : 'visibility_off'
    }

    return { state, toggleVisibilityHandler }
  }
})
</script>
