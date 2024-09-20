<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import SideBarNav from '@/components/SideBarNav.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import Dialogues from '@/components/Dialogues.vue'
import Friend from '@/components/Friends.vue'

const currentView = ref('dialogues')

const handleSelect = (view) => {
  currentView.value = view
}

</script>

<template>
  <div class="wrapper">
    <Header class="header" />
    <SideBarNav class="side-bar" @select="handleSelect" />

    <div class="content">
      <ProfileInfo v-if="currentView === 'profile'" />
      <Friend v-if="currentView === 'friends'" />
      <Dialogues v-if="currentView === 'dialogues'" />
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  display: grid;
  z-index: 10;
  transition: opacity 0.3s ease;
  grid-template-areas:
    'header header header'
    'side-bar info .'
  ;
}

.header {
  grid-area: header;
}

.side-bar {
  grid-area: side-bar;
  width: 20rem;
  margin: 0 0 0 50px;
}

.content {
  grid-area: info;
}
</style>
