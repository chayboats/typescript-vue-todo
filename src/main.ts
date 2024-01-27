import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPenToSquare,
  faSliders,
  faL,
  faM,
  faH,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free'
library.add(faPenToSquare, faSliders, faL, faM, faH, faSquare, faSquareCheck)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(autoAnimatePlugin).mount('#app')
