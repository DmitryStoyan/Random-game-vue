import { createRouter, createWebHistory } from 'vue-router'

import Header from '@/components/Header.vue'
import Authorization from '@/components/Authorization.vue'
import GameLibrary from '@/components/GameLibrary.vue'
import DownloadMenu from '@/components/DownloadMenu.vue'
import PagePartnerForm from '@/views/PagePartnerForm.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/store/userStore'

// const checkAuth = (to, from, next) => {
//   let isAuth = false
//   onAuthStateChanged(getAuth(), (user) => {
//     if (user && !isAuth) {
//       isAuth = true
//       next()
//     } else if (!user && !isAuth) {
//       isAuth = true
//       next('/auth')
//     }
//   })
// }

const checkAuth = (to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.userId && to.name !== 'Auth') {
    next({ name: 'Auth' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Header,
    beforeEnter: checkAuth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Authorization,
    beforeEnter: checkAuth
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: Authorization,
    beforeEnter: checkAuth
  },
  {
    path: '/gameLibrary',
    name: 'GameLibrary',
    component: GameLibrary,
    beforeEnter: checkAuth
  },
  {
    path: '/download',
    name: 'Download',
    component: DownloadMenu,
    beforeEnter: checkAuth
  },
  {
    path: '/teammateForm',
    name: 'TeammateForm',
    component: PagePartnerForm,
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
