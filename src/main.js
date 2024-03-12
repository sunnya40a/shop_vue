//src/main.js
//import { useAuthStore } from '@/stores/auth'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)

// Install the authStore instance
//pinia.use(useAuthStore) // enabling this giving error.
app.use(pinia)
app.use(router)
//const authStore = useAuthStore()
app.mount('#app')
