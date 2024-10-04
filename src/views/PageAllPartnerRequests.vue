<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collectionGroup, query, where, getDocs } from 'firebase/firestore';
import Header from '@/components/Header.vue';

const db = getFirestore()
const activeRequests = ref([])
const isLoading = ref(true)

const getActiveRequests = async () => {
  isLoading.value = true
  const activeRequestsQuery = query(
    collectionGroup(db, 'partnerInfo'),
    where('isShow', '==', true)
  );

  const querySnapshot = await getDocs(activeRequestsQuery);

  activeRequests.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  isLoading.value = false
}

onMounted(() => {
  getActiveRequests()
})
</script>

<template>
  <div class="content">
    <Header />
    <h1 class="title">Запросы на поиск тиммейтов</h1>
    <div v-if="isLoading" class="loading">Загрузка...</div>
    <div v-else-if="!activeRequests.length" class="message">Нет активных запросов на поиск тиммейтов.</div>
    <div v-else class="lists">
      <div v-for="request in activeRequests" :key="request.id" class="list-item">
        <h2 class="list-item__text subtitle">Игра: <span class="game-name">{{ request.gameName }}</span></h2>
        <p class="list-item__text">Мой опыт: <span class="meaning">{{ request.experience }}</span></p>
        <p class="list-item__text">Опыт тиммейта: <span class="meaning">{{ request.teammateExperience }}</span></p>
        <p class="list-item__text">Обо мне: <span class="meaning">{{ request.aboutMe }}</span></p>
        <p class="list-item__text">Дополнительная информация: <span class="meaning">{{ request.additionalInformation
            }}</span></p>
        <p class="list-item__text">Запрос создан: <span class="meaning">{{ new Date(request.createdAt.seconds *
          1000).toLocaleDateString() }}</span></p>
        <p class="list-item__text">User Name игрока: <span class="meaning">{{ }}</span>
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.lists {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.game-name {
  font-size: 1.6rem;
  font-weight: bold;
  color: black;
}

.subtitle {
  padding: 0 0 1rem 0;
  border-bottom: 2px #888 solid;
}

.meaning {
  font-size: 1.2rem;
  color: black;
}

.title {
  margin: 2rem 0 2rem 0;
  text-align: center;
  font-size: 2rem;
  color: white;
}

.loading {
  font-size: 1.5rem;
  color: #888;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.list-item {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.list-item__text {
  margin: 5px 0;
}

.list-item__text.gameName {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e90ff;
}


.list-item__text {
  font-size: 1rem;
  color: #555;
}
</style>
