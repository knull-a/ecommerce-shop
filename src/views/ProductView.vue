<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore';

import { useRest } from '@/services';
import { db } from '@/data';

import { useProductsStore } from '@/stores/products'
import { useUsersStore } from '@/stores/user';
import { useModalsStore } from '@/stores/modal';

import BreadCrumbs from "@/components/BreadCrumbs.vue"
import ProductDetails from "@/components/Product/ProductDetails.vue"
import ProductSkeleton from "@/components/Product/ProductSkeleton.vue"

const route = useRoute()
const api = useRest()

const modalsStore = useModalsStore()
const usersStore = useUsersStore()
const { product } = storeToRefs(useProductsStore())
const { toggleAuthModal } = modalsStore
const { updateUser } = usersStore
const { user, currentUser } = storeToRefs(usersStore)

const isLoading = ref(false)

const isInCart = computed(() => user.value?.cart.map(String).includes(String(product.value.id)) ?? false)
const isInWishlist = computed(() => user.value?.wishlist.map(String).includes(String(product.value.id)) ?? false)

const wishlistStatus = computed(() => isInWishlist.value ? "In Wishlist" : "Add to Wishlist")
const cartStatus = computed(() => isInCart.value ? "In Cart" : "Add to Cart")

const updateList = async (listType: 'wishlist' | 'cart') => {
  if (user.value) {
    const isInList = listType === 'wishlist' ? isInWishlist : isInCart;

    if (isInList.value) {
      try {
        await updateDoc(doc(db, "users", currentUser.value?.uid as string), {
          [listType]: arrayRemove(product.value.id)
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
        [listType]: arrayUnion(product.value.id)
      })
      await updateUser()
    } catch (error) {
      console.error(error)
    }
    console.log(product.value.id, currentUser.value?.uid)
  } else {
    toggleAuthModal()
  }
}

const addToWishlist = () => updateList('wishlist');
const addToCart = () => updateList('cart');

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
    <BreadCrumbs v-show="product.category" :category="product.category" :product="product.title" />
    <ProductSkeleton v-if="isLoading" />
    <ProductDetails v-else @add-to-cart="addToCart" @add-to-wishlist="addToWishlist" :wishlist-status="wishlistStatus"
      :cart-status="cartStatus" :product="product" />
  </div>
</template>
