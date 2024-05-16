import './assets/main.css'
import '@oruga-ui/theme-bulma/dist/bulma.css'

import { createApp } from 'vue'
import { Oruga } from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app
    .use(router)
    .use(Oruga, bulmaConfig)

app.mount('#app')
