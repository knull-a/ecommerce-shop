<script setup lang="ts">
import { auth, db } from "@/data"
import { useUsersStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { onAuthStateChanged, getAuth, signOut, type User } from "firebase/auth";
import { addDoc, collection, getDocs, type DocumentData } from "firebase/firestore"


const router = useRouter()
const userStore = useUsersStore()
const isLoggedIn = ref(false)
const { currentUser, user } = storeToRefs(userStore) 

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  })
}

// const user = ref<UserObject | DocumentData>()

onMounted(async () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (!user) {
      router.push("/")
    }
    if (auth.currentUser) {
      currentUser.value = auth.currentUser
    }
    console.log(auth.currentUser)
  })
})
</script>
<template>
  <div class="flex mt-28">
    <div class="m-auto max-w-3xl" v-if="currentUser">
      <div class="border rounded-xl max-w-lg text-center p-5">
        <div class=" w-12 h-12 bg-primary text-white m-auto rounded-full flex items-center justify-center text-3xl">{{
          currentUser.email?.charAt(0) }}</div>
        <p class=" text-2xl font-bold">{{ currentUser.email }}</p>
        <p>{{ currentUser.uid }}</p>
        {{ user?.cart }}
        <button @click="handleSignOut()">Logout</button>
      </div>
    </div>
  </div>
</template>
