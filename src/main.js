import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//const GStore = ref({FlashMessage: 'prot'})

// firebase import auth:
// import { auth } from '@/api/config'
// import { onAuthStateChanged } from 'firebase/auth' 

const app = createApp(App)
app.use(createPinia())
app.use(router)
//app.provide('GStore', GStore)
app.mount('#app')
