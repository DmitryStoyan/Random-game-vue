<script setup>
import { ref, onMounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { useUserStore } from '@/store/userStore';
import DeleteModal from '../components/DeleteModal.vue'

const userStore = useUserStore()
const db = getFirestore()

const partnersInfo = ref([])
const isLoading = ref(true)
const isDeleteModalVisible = ref(false)
const currentPartnerId = ref(null);



const showDeleteModal = (id) => {
  currentPartnerId.value = id;
  isDeleteModalVisible.value = true;
}

const hideDeleteModal = () => {
  isDeleteModalVisible.value = false
}

const getAllPartnersInfo = async () => {
  const getData = query(collection(db, `users/${userStore.userId}/partnerInfo`), orderBy('createdAt', 'desc'))

  const listDocs = await getDocs(getData)

  return listDocs.docs.map((doc) => doc.data())
}

const confirmRemovePartner = async () => {
  if (currentPartnerId.value) {
    isLoading.value = true;
    await deleteDoc(doc(db, `users/${userStore.userId}/partnerInfo`, currentPartnerId.value));

    const listPartnersInfo = await getAllPartnersInfo()
    partnersInfo.value = [...listPartnersInfo]

    isLoading.value = false;
    hideDeleteModal();
  }
}

onMounted(async () => {
  const listPartnersInfo = await getAllPartnersInfo()
  partnersInfo.value = [...listPartnersInfo]
  console.log(partnersInfo)
  isLoading.value = false
})
</script>

<template>
  <div class="partner-list">
    <DeleteModal v-if="isDeleteModalVisible" @cancel="hideDeleteModal" @confirm="confirmRemovePartner" />
    <h1 class="title">Список моих запросов для поиска тиммейтов.</h1>
    <div v-if="isLoading" class="loading">Загрузка...</div>
    <div v-else-if="!isLoading && !partnersInfo.length" class="message">У Вас еще нет добавленных запросов на поиск
      тиммейтов.</div>
    <div v-else class="lists">
      <div v-for="partner in partnersInfo" class="list-item">
        <h2 class="list-item__text subtitle">Игра: <span class="game-name">{{ partner.gameName }}</span></h2>
        <p class="list-item__text">Мой опыт: <span class="meaning">{{ partner.experience }}</span></p>
        <p class="list-item__text">Опыт тиммейта: <span class="meaning">{{ partner.teammateExperience
            }}</span></p>
        <p class="list-item__text">Обо мне: <span class="meaning">{{ partner.aboutMe }}</span></p>
        <p class="list-item__text">Дополнительная информация: <span class="meaning">{{
          partner.additionalInformation }}</span></p>
        <p class="list-item__text">Дата создания запроса: <span class="meaning">{{
          partner.createdAt.toDate().toLocaleDateString() }}</span></p>
        <div class="buttons">
          <router-link :to="`/partnerInfo/${partner.id}`">
            <button>Редактировать</button>
          </router-link>
          <button @click="() => showDeleteModal(partner.id)">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.partner-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  padding: 20px;
  overflow-y: auto;
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
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1e90ff;
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
