import { createApp } from 'vue'
import { setup } from './utils/bootstrap'

import App from './App.vue'
import Playgorund from './views/playground/index.vue'

import 'animate.css'
import './assets/fonts.css'
import './assets/tailwind.css'
import 'material-icons/iconfont/material-icons.css'

setup({
  onProduction: () => {
    createApp(App).mount('#app')
  },
  onDevelopment: () => {
    createApp(Playgorund).mount('#app')
  }
})
