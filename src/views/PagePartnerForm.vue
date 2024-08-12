<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/userStore';
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid'


const userStore = useUserStore()
const db = getFirestore()
const gameName = ref('')
const experience = ref('')
const teammateExperience = ref('')
const aboutMe = ref('')
const additionalInformation = ref('')
const loading = ref(false)
const router = useRouter()

const addNewPartnerInfo = async () => {
  loading.value = true
  const payload = {
    id: uuidv4(),
    gameName: gameName.value,
    experience: experience.value,
    teammateExperience: teammateExperience.value,
    aboutMe: aboutMe.value,
    additionalInformation: additionalInformation.value,
    isShow: true,
    createdAt: new Date()
  }


  if (userStore.userId) {
    await setDoc(doc(db, `users/${userStore.userId}/partnerInfo`, payload.id), payload).then(() => {
      router.push('/partnerList')
    })
  }
  loading.value = false
}
</script>

<template>
  <div class="partnerInfoForm">
    <div class="wrapper">
      <h2 class="title">Информация для поиска тиммейтов</h2>
      <form class="form" @submit.prevent="submitForm">
        <label class="label" for="gameName">Для какой игры?</label>

        <input v-model="gameName" class="input" type="text" name="gameName">

        <label class="label" for="experience">Ваш стаж в игре?</label>
        <input v-model="experience" class="input" type="text" name="experience">

        <label class="label" for="teammateExperience">Какой должен быть стаж тиммейта?</label>
        <input v-model="teammateExperience" class="input" type="text" name="teammateExperience">

        <label class="label" for="aboutMe">Обо мне</label>
        <textarea v-model="aboutMe" class="input" name="aboutMe" cols="10" rows="5"></textarea>

        <label class="label" for="additionalInformation">Дополнительная информация</label>
        <textarea v-model="additionalInformation" class="input" name="additionalInformation" cols="10"
          rows="7"></textarea>



        <button @click="addNewPartnerInfo" class="button" type="submit" :loading="isLoading">Найти тиммейта</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.partnerInfoForm {
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

.wrapper {
  border: 1px gray solid;
  box-shadow: 10px 20px 20px 7px rgba(0, 0, 0, 0.1);
  /* padding: 3rem 5rem; */
  width: 30rem;
  text-align: center;
}

.subtitle-text {
  margin: 0 10px 0 0;
  font-size: 14px;
}

.link-text {
  color: rgb(0, 38, 255);
  font-size: 14px;
  cursor: pointer;
}

.title {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 1.2rem 0 0 0;
}

.label {
  margin: 0 0 0.5rem 3rem;
}

.input {
  margin: 0 0 2rem 0;
  width: 80%;
  margin: 0 auto 2rem;
}

.button {
  margin: 0 auto;
  border: none;
  background: none;
  background-color: rgb(0, 162, 255);
  padding: 0.3rem 1rem;
  margin-bottom: 30px;
}
</style>
