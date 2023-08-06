import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

//const GStore = ref({FlashMessage: 'prot'})

// firebase import auth:
// import { auth } from '@/api/config'
// import { onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
//app.provide('GStore', GStore)
app.mount('#app')
