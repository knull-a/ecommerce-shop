<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue';

import { storeToRefs } from 'pinia';
import { updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore';

import { useRest } from '@/services';
import { type Product, Instance } from '@/services/ProductRest';

import { useUsersStore } from '@/stores/user';
import { useModalsStore } from '@/stores/modal';

import { db } from '@/data';
import { RouteNames } from '@/router/routeNames';

import CategoryDetails from "@/components/Category/CategoryDetails.vue"
import CategorySkeleton from "@/components/Category/CategorySkeleton.vue"

type Props = {
  instance: Instance
  routeName: RouteNames
}

const props = defineProps<Props>()

const usersStore = useUsersStore()
const modalsStore = useModalsStore()

const { updateUser } = usersStore
const { toggleAuthModal } = modalsStore
const { currentUser, user } = storeToRefs(usersStore)

const { instance } = toRefs(props)
const isLoading = ref(false)

const api = useRest()

const products = ref<Product[]>([])

const addToWishlist = async (card: Product) => {
  if (user.value) {
    if (card.isInWishlist) {
      try {
        await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
          wishlist: arrayRemove(card.id)
        })
        await updateUser()
      } catch (error) {
        console.error(error)
      }
      card.isInWishlist = false
      return
    }
    try {
      console.log(currentUser.value)
      await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
        wishlist: arrayUnion(card.id)
      })
      await updateUser()
    } catch (error) {
      console.error(error)
    }
    console.log(card.id, currentUser.value?.uid)
    card.isInWishlist = true
  }
  else {
    toggleAuthModal()
  }
}

watchEffect(async () => {
  try {
    isLoading.value = true;
    const res = await api.product.getCategory(instance.value);
    products.value = res.map((item) => ({
      ...item,
      isHovering: false,
      isInWishlist: user?.value?.wishlist?.map(String).includes(String(item.id)) || false,
    }));
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
})

</script>
<template>
  <div class="mt-20 max-w-6xl m-auto">
    <CategorySkeleton v-if="isLoading" />
    <CategoryDetails v-else :routeName="routeName" :products="products" @add-to-wishlist="addToWishlist" />
  </div>
</template>
<style scoped>
</style>
