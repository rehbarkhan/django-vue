import '@/assets/main.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import axios from 'axios';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; 

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura ,options: {
      darkModeSelector: false, // ✅ dark mode completely off
    },}})
app.mount('#app')
