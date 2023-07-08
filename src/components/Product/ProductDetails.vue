<script setup lang="ts">
import type { Product } from '@/services/ProductRest';
import CustomButton from "@/components/Custom/CustomButton.vue"

type Props = {
  product: Product
  cartStatus: string
  wishlistStatus: string
}

type Emits = {
  (e: 'addToWishlist'): void
  (e: 'addToCart'): void
}

const emits = defineEmits<Emits>()
defineProps<Props>() 
</script>
<template>
  <div class="flex max-w-4xl gap-14 items-center mt-8 m-auto">
    <img class="image w-96 h-96" :src="product.image" alt="">

    <div>
      <h2 class="text-4xl">{{ product.title }}</h2>
      <p class="text-grey">- {{ product.category }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="flex gap-2">
        <CustomButton class="mt-2" type="button" @click="emits('addToWishlist')" :text="cartStatus" />
        <CustomButton class="mt-2" type="button" @click="emits('addToCart')" :text="wishlistStatus" />
      </div>
    </div>
  </div>
</template>
