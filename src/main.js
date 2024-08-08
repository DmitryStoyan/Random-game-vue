import './assets/main.css'

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/userStore'

const firebaseConfig = {
  apiKey: 'AIzaSyDkRhUeDZXRKW8O9FyB6lwWI1AS88JFvTQ',
  authDomain: 'random-game-f8cbe.firebaseapp.com',
  projectId: 'random-game-f8cbe',
  storageBucket: 'random-game-f8cbe.appspot.com',
  messagingSenderId: '236096228353',
  appId: '1:236096228353:web:b648c58151e66335fcc400'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
