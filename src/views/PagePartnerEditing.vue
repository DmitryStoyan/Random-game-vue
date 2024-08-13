<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getFirestore, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useUserStore } from '@/store/userStore';
import Preloader from '@/components/UI/Preloader.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const db = getFirestore();
const userStore = useUserStore();
const route = useRoute()
const isLoading = ref(true)

const partner = ref()

const docref = doc(db, `users/${userStore.userId}/partnerInfo`, route.params.id)

const getData = async () => {
  isLoading.value = true
  const docSnap = await getDoc(docref)

  if (docSnap.exists()) {
    const data = docSnap.data()
    if (data.stages && data.stages.length) {
      data.stages = data.stages.map((stage) => {
        if (stage.date && stage.date instanceof Timestamp) {
          return {
            ...stage,
            date: stage.date.toDate()
          }
        }
        return stage
      })
    }
    data.isShow = data.isShow ? 'active' : 'notActive'
    partner.value = data
  }

  isLoading.value = false
  console.log(partner.value)
}

const savePartner = async () => {
  isLoading.value = true

  partner.value.isShow = partner.value.isShow === 'active';

  await updateDoc(docref, { ...partner.value })
  isLoading.value = false
  router.push('/partnerList')
}

onMounted(async () => await getData())
</script>

<template>
  <Preloader v-if="isLoading" />
  <div class="content-partner" v-else-if="partner?.id && !isLoading">
    <h2>Редактировать запрос для игры.</h2>
    <div class="content">
      <div class="item">
        <label for="gameName">Для какой игры?</label>
        <input type="text" id="gameName" v-model="partner.gameName">
      </div>
      <div class="item">
        <label for="experience">Ваш стаж в игре?</label>
        <input type="text" id="experience" v-model="partner.experience">
      </div>
      <div class="item">
        <label for="teammateExperience">Какой должен быть стаж тиммейта?</label>
        <input type="text" id="teammateExperience" v-model="partner.teammateExperience">
      </div>
      <div class="item">
        <label for="aboutMe">Обо мне</label>
        <input type="text" id="aboutMe" v-model="partner.aboutMe">
      </div>
      <div class="item">
        <label for="additionalInformation">Дополнительная информация</label>
        <input type="text" id="additionalInformation" v-model="partner.additionalInformation">
      </div>
      <div class="buttons-wrapper">
        <div class="button-item">
          <input id="showOn" name="result" type="radio" value="active" v-model="partner.isShow">
          <label for="showOn">Запрос активен</label>
        </div>
        <div class="button-item">
          <input id="showOff" name="result" type="radio" value="notActive" v-model="partner.isShow">
          <label for="showOff">Запрос не активен</label>
        </div>
        <button class="save-button" @click="savePartner">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-partner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  transition: opacity 0.3s ease;
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.content {
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 30rem;
}

.item {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

input[type="text"] {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #1e90ff;
  outline: none;
}

input[type="text"]::placeholder {
  color: #aaa;
}

.item input {
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.buttons-wrapper {
  display: flex;
  gap: 2rem;
}

.save-button {
  border: none;
  background: none;
  background-color: rgb(0, 162, 255);
  padding: 0.3rem 1rem;
}
</style>
