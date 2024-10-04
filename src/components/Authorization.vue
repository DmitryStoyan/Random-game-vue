<script setup>
import { computed, ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router';

const userStore = useUserStore()


const email = ref('')
const password = ref('')
const userName = ref('')
const isLogin = ref(true)
const isLoading = ref(false)
const router = useRouter()

const toggleAuth = () => {
  isLogin.value = !isLogin.value
}

const titleText = computed(() => {
  return isLogin.value ? 'Вход' : 'Регистрация'
})

const subtitleText = computed(() => {
  return isLogin.value ? 'Аккаунта еще нет?' : 'Уже есть аккаунт?'
});

const linkAccountText = computed(() => {
  return isLogin.value ? 'Создайте сейчас' : 'Войдите в него'
});

const submitButtonText = computed(() => {
  return isLogin.value ? 'Вход' : 'Регистрация'
});

const signUp = async () => {
  isLoading.value = true;
  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    const user = userCredential.user;

    userStore.userId = user.uid;

    const db = getFirestore()
    await setDoc(doc(db, `users/${user.uid}/userInfo`, user.uid), {
      userName: userName.value,
      email: email.value,
    });

    router.push('/')
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}


const signIn = async () => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push('/')
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

const submitForm = () => {
  if (isLogin.value) {
    signIn()
  } else {
    signUp()
  }
};
</script>

<template>
  <div class="authorization">
    <div class="authorization-wrapper">
      <h2 class="title">{{ titleText }}</h2>
      <span class="subtitle-text">{{ subtitleText }}</span>
      <a class="link-text" @click="toggleAuth">{{ linkAccountText }}</a>
      <form class="form" @submit.prevent="submitForm">

        <label class="label" for="username">Username</label>
        <input v-model="userName" class="input" type="text" name="username">

        <label class="label" for="email">Email</label>
        <input v-model="email" class="input" type="text" name="email">
        <label class="label" for="password">Пароль</label>
        <input v-model="password" class="input" type="password" name="password">
        <button :label="submitButtonText" class="button" type="submit" :loading="isLoading">{{ submitButtonText
          }}</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.authorization {
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
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.authorization-wrapper {
  border: 1px gray solid;
  box-shadow: 10px 20px 20px 7px rgba(0, 0, 0, 0.1);
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
