//src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
//import { useAuthStore } from '@/stores/auth'
import { router } from '@/router'

const app = createApp(App)

const pinia = createPinia()
// Install the authStore instance
//pinia.use(useAuthStore) // enabling this giving error.
app.use(pinia)
app.use(router)

app.mount('#app')
