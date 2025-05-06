import { createApp } from 'vue'
import { createPinia } from 'pinia'
import api from '../src/config/api'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import App from './App.vue'
import router from './router'

import '../src/assets/main.css'

const app = createApp(App)

window.api = api
// Init Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(pinia).use(VueToast)

//TODO

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'
  next()
})

app.use(router)
app.mount('#app')
