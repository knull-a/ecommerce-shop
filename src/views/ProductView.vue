<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useRest } from '@/services';
import { type Product, Instance } from '@/services/ProductRest';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '@/data';
import { useProductsStore } from '@/stores/products'
import { type UserObject, useUsersStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import BreadCrumbs from "@/components/BreadCrumbs.vue"
import CustomButton from '@/components/Custom/CustomButton.vue';
import { auth } from "@/data"

const route = useRoute()
const api = useRest()

const { product } = storeToRefs(useProductsStore())
const { updateUser } = useUsersStore()
const { user, currentUser } = storeToRefs(useUsersStore())

const isLoading = ref(false)

const isInCart = computed(() => user.value?.cart.map(String).includes(String(product.value.id)) ?? false)
const isInWishlist = computed(() => user.value?.wishlist.map(String).includes(String(product.value.id)) ?? false)

const showWishlistStatus = computed(() => isInWishlist.value ? "In Wishlist" : "Add to Wishlist")
const showCartStatus = computed(() => isInCart.value ? "In Cart" : "Add to Cart") 

const addToWishlist = async () => {
  if (isInWishlist) {
    try {
      await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
        wishlist: arrayRemove(product.value.id)
      })
      await updateUser()
    } catch (error) {
      console.error(error)
    }
    return
  }
  try {
    console.log(currentUser.value)
    await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
      wishlist: arrayUnion(product.value.id)
    })
    await updateUser()
  } catch (error) {
    console.error(error)
  }
  console.log(product.value.id, currentUser.value?.uid)
}

const addToCart = async () => {
  if (isInCart) {
    try {
      await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
        cart: arrayRemove(product.value.id)
      })
      await updateUser()
    } catch (error) {
      console.error(error)
    }
    return
  }
  try {
    console.log(currentUser.value)
    await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
      cart: arrayUnion(product.value.id)
    })
    await updateUser()
  } catch (error) {
    console.error(error)
  }
  console.log(product.value.id, currentUser.value?.uid)
}



watchEffect(async () => {
    try {
        isLoading.value = true
        const res = await api.product.getProduct(route.params.id as string)
        product.value = res
        
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
})

</script>
<template>
    <div class="my-20 mx-40">
        <BreadCrumbs v-if="product.category" :category="product.category" :product="product.title" />
        <div v-if="!isLoading" class="flex max-w-4xl gap-14 items-center mt-8 m-auto">
            <img class="image w-96 h-96" :src="product.image" alt="">

            <div class="">
                <h2 class="text-4xl">{{ product.title }}</h2>
                <p class="text-grey">- {{ product.category }}</p>
                <p class="description">{{ product.description }}</p>
                <div class="flex gap-2">
                    <CustomButton class="mt-2" type="button" @click="addToWishlist" :text="showCartStatus" />
                    <CustomButton class="mt-2" type="button" @click="addToCart" :text="showWishlistStatus" />
                </div>
            </div>
        </div>
        <div v-else class="flex max-w-4xl gap-14 items-center mt-32 m-auto">
            <div class="loading w-80 h-80" />
            <div class="flex flex-col gap-3">
                <div class="text-4xl loading w-80 h-6"></div>
                <p class="loading w-80 h-6"></p>
                <p class="description loading w-80 h-2"></p>
                <p class="description loading w-72 h-2"></p>
                <p class="description loading w-80 h-2"></p>
                <p class="description loading w-64 h-2"></p>
                <p class="description loading w-64 h-2"></p>
                <p class="description loading w-72 h-2"></p>
                <p class="description loading w-56 h-2"></p>
                <p class="description loading w-64 h-2"></p>
                <p class="description loading w-64 h-2"></p>
            </div>
        </div>
    </div>
</template>
