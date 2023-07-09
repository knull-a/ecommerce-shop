<script setup lang="ts">
import type { Product } from '@/services/ProductRest';
import CustomButton, { type Variation } from "@/components/Custom/CustomButton.vue"
import HeartIcon from '@/assets/icons/HeartIcon.vue';
import CartIcon from '@/assets/icons/CartIcon.vue';

type Props = {
  product: Product
  cartStatus: string
  wishlistStatus: string
  cartVariation: Variation
  wishlistVariation: Variation
  isInCart: boolean
  isInWishlist: boolean
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
        <CustomButton :active="isInCart" :icon="CartIcon" :variation="cartVariation" class="mt-2"
          @click="emits('addToCart')" :text="cartStatus" />
        <CustomButton :active="!isInWishlist" :icon="HeartIcon" icon-color="white" :variation="wishlistVariation"
          class="mt-2" @click="emits('addToWishlist')" :text="wishlistStatus" />
      </div>
    </div>
  </div>
</template>
