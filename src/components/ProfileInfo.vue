<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, updateProfile, updatePassword } from 'firebase/auth'

const userStore = useUserStore()
const db = getFirestore()

const userName = ref('')
const email = ref('')
const age = ref('')
const profilePictureUrl = ref('')
const aboutMe = ref('')
const password = ref('')

const auth = getAuth()
const user = auth.currentUser

const loadUserData = async () => {
  if (userStore.userId) {
    const userDoc = await getDoc(doc(db, `users/${userStore.userId}/userInfo`, userStore.userId))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      userName.value = userData.userName || ''
      email.value = user.email || ''
      age.value = userData.age || ''
      profilePictureUrl.value = userData.profilePictureUrl || ''
      aboutMe.value = userData.aboutMe || ''
    }
  }
}

// Сохранение данных пользователя в Firestore
const saveUserData = async () => {
  if (userStore.userId) {
    const userData = {
      userName: userName.value,
      email: email.value,
      age: age.value,
      profilePictureUrl: profilePictureUrl.value,
      aboutMe: aboutMe.value,
    }

    // Сохранение данных в Firestore
    await setDoc(doc(db, `users/${userStore.userId}/userInfo`, userStore.userId), userData, { merge: true })

    // Обновление данных профиля в Firebase
    if (user) {
      await updateProfile(user, {
        userName: userName.value,
        photoURL: profilePictureUrl.value
      })

      // Если пользователь решил обновить пароль
      if (password.value) {
        await updatePassword(user, password.value)
      }
    }

    alert('Данные профиля успешно сохранены!')
  }
}

// Загрузка данных пользователя
loadUserData()
</script>


<template>
  <div>
    <SideBarNav class="side-bar" />
    <div class="profile-container">
      <h1>Мой профиль</h1>
      <div class="form-group">
        <label for="userName">Никнейм:</label>
        <input v-model="userName" type="text" id="userName" />
      </div>
      <div class="form-group">
        <label for="email">Почта:</label>
        <input v-model="email" type="email" id="email" disabled>
      </div>
      <div class="form-group">
        <label for="age">Возраст:</label>
        <input v-model="age" type="number" id="age" />
      </div>
      <div class="form-group">
        <label for="profilePictureUrl">Фото профиля (URL):</label>
        <input v-model="profilePictureUrl" type="text" id="profilePictureUrl" />
      </div>
      <div class="form-group">
        <label for="aboutMe">О себе:</label>
        <textarea v-model="aboutMe" id="aboutMe"></textarea>
      </div>
      <div class="form-group">
        <label for="password">Новый пароль:</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button class="save-button" @click="saveUserData">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
  /* background: black; */
  /* color: white; */
  /* z-index: 10; */
  /* transition: opacity 0.3s ease; */
}

.profile-container {
  width: 50rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.save-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
