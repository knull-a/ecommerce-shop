<script setup lang="ts">
import { auth } from "@/data"
import { useUsersStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { onAuthStateChanged, getAuth, signOut, type User } from "firebase/auth";

const router = useRouter()
const userStore = useUsersStore()
const { checkAuthState } = userStore
const isLoggedIn = ref(false)
// const { isLoggedIn } = storeToRefs(userStore) 

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  })
}

const currentUser = ref<User>()

onMounted(async () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (!user) {
      router.push("/")
    } 
    if (auth.currentUser) {
      currentUser.value = auth.currentUser
    }
    console.log(auth.currentUser)
    return
  })
})
</script>
<template>
  <div v-if="currentUser">
    {{ currentUser }}
    <button @click="handleSignOut()">Logout</button>
  </div>
</template>