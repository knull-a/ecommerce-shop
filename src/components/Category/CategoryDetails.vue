<script setup lang="ts">
import { type Product } from '@/services/ProductRest';
import { RouteNames } from '@/router/routeNames';

import HeartAnimatedIcon from '@/assets/icons/HeartAnimatedIcon.vue';
import HeartIcon from '@/assets/icons/HeartIcon.vue';

type Props = {
  products: Product[]
  routeName: RouteNames
}

type Emits = {
  (e: 'addToWishlist', v: Product): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()
</script>
<template>
  <div class="grid grid-cols-3 gap-y-4 m-auto">
    <RouterLink :to="{ name: routeName, params: { id: card.id } }" class="text-center relative"
      v-for="(card, idx) in products" :key="idx" @mouseenter="card.isHovering = true"
      @mouseleave="card.isHovering = false">
      <div>
        <img class="h-[200px] w-[350px] object-contain m-auto" :src="card.image" alt="Card Item">
        <button class="absolute top-0 right-10" @click.prevent="emits('addToWishlist', card)"
          :style="{ opacity: card.isHovering ? 1 : 0 }">
          <HeartIcon :is-active="card.isInWishlist" />
        </button>
      </div>

      <p class="mt-2">{{ card.price }}$</p>
      <p class="text-2xl font-bold">{{ card.title }}</p>
    </RouterLink>
  </div>
</template>