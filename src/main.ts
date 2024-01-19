import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPenToSquare, faSliders } from '@fortawesome/free-solid-svg-icons'

library.add(faPenToSquare, faSliders)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(autoAnimatePlugin).mount('#app')
