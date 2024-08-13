import { createRouter, createWebHistory } from 'vue-router'

import Header from '@/components/Header.vue'
import PageHome from '@/views/PageHome.vue'
import Authorization from '@/components/Authorization.vue'
import GameLibrary from '@/components/GameLibrary.vue'
import DownloadMenu from '@/components/DownloadMenu.vue'
import PagePartnerForm from '@/views/PagePartnerForm.vue'
import PagePartnerList from '@/views/PagePartnerList.vue'
import PagePartnerEditing from '@/views/PagePartnerEditing.vue'
import PageAllPartnerRequests from '@/views/PageAllPartnerRequests.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/store/userStore'

const checkAuth = (to, from, next) => {
  const auth = getAuth()

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()

    if (user) {
      if (to.path === '/auth') {
        next('/')
      } else {
        next()
      }
    } else {
      if (to.path !== '/auth') {
        next('/auth')
      } else {
        next()
      }
    }
  })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome,
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
  },
  {
    path: '/partnerList',
    name: 'PartnerList',
    component: PagePartnerList,
    beforeEnter: checkAuth
  },
  {
    path: '/allPartnerRequests',
    name: 'AllPartnerRequests',
    component: PageAllPartnerRequests,
    beforeEnter: checkAuth
  },
  {
    path: '/partnerEditing/:id',
    name: 'PartnerEditing',
    component: PagePartnerEditing,
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
