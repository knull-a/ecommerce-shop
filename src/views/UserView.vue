<script setup lang="ts">
import type { Product } from "@/services/ProductRest";

import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";

import { auth, db } from "@/data"
import { useUsersStore } from "@/stores/user"
import { useProductsStore } from "@/stores/products";

import { onAuthStateChanged, getAuth, signOut, type User } from "firebase/auth";
import { addDoc, collection, getDocs, type DocumentData } from "firebase/firestore"
import SpinnerIcon from "@/assets/icons/SpinnerIcon.vue";
import { RouteNames } from "@/router/routeNames";
import { useCapitalLetter } from "@/helpers/useCapitalLetter";

const isLoggedIn = ref(false)

const router = useRouter()

const { currentUser, user } = storeToRefs(useUsersStore())
const { products } = storeToRefs(useProductsStore())

const wishlist = computed(() =>
  products.value.filter((product) =>
    user.value?.wishlist.includes(product.id)
  )
)

const cart = computed(() =>
  products.value.filter((product) =>
    user.value?.cart.includes(product.id)
  )
)

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  })
}

// const user = ref<UserObject | DocumentData>()

onMounted(async () => {
  getAuth()
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
  <div class="flex flex-col mt-28" v-if="currentUser">
    <div class="m-auto max-w-3xl">
      <div class="border rounded-xl max-w-lg text-center p-5">
        <div class=" w-12 h-12 bg-primary text-white m-auto rounded-full flex items-center justify-center text-3xl">
          {{ currentUser.email?.charAt(0) }}
        </div>
        <p class=" text-2xl font-bold">{{ currentUser.email }}</p>
        <button @click="handleSignOut()">Logout</button>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-10">
      <div class="flex flex-col gap-4 m-auto max-w-lg text-center p-5">
        <h2 class="text-3xl font-bold">Wishlist</h2>
        <div v-if="user?.wishlist && user?.wishlist.length">
          <RouterLink :to="{ name: useCapitalLetter(item.category), params: { id: item.id } }" v-for="item in wishlist" :key="item.id">
            <img class="h-[200px] w-[350px] m-auto object-contain" :src="item.image" alt="Product">
            <h3 class="text-2xl font-bold">{{ item.title }}</h3>
          </RouterLink>
        </div>
        <div v-else>
          Wishlist is empty
        </div>
      </div>
      <div class="flex flex-col gap-4 m-auto max-w-lg text-center p-5">
        <h2 class="text-3xl font-bold">Cart</h2>
        <div v-if="user?.cart && user?.cart.length">
          <RouterLink :to="{ name: useCapitalLetter(item.category), params: { id: item.id } }" v-for="item in cart" :key="item.id">
            <img class="h-[200px] w-[170px] object-contain m-auto" :src="item.image" alt="Product">
            <h3 class="text-2xl font-bold">{{ item.title }}</h3>
          </RouterLink>
        </div>
        <div v-else>
          Cart is empty
        </div>
      </div>
    </div>
  </div>
  <SpinnerIcon v-else />
</template>
