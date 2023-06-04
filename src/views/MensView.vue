<script setup lang="ts">
import type { Product } from '@/services/ProductRest';

import { ref, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { useRest } from '@/services';

import history from "@/router/history";
import { RouteNames } from '@/router/routeNames';

import HeartAnimatedIcon from '@/assets/icons/HeartAnimatedIcon.vue';

const route = useRoute()
const router = useRouter()

const api = useRest()

const isHeartActive = ref(false)

const products = ref<Product[]>([])

const navigationHistory = ref(history.get())

// api is too small
const multiplyElements = () => {
    products.value.forEach(el => {
        products.value.push(el)
       })
    products.value.forEach(el => {
        products.value.push(el)
    })
    products.value.forEach(el => {
        products.value.push(el)
    })
}

watchEffect(async () => {
    try {
       const res = await api.product.getMens()
       products.value = res.map((item) => {
        return {
            ...item,
            isHovering: false
        }
       })
       
    } catch (error) {
        console.error(error)
    }
})

</script>
<template>
    <div class="mt-14 max-w-6xl m-auto">
        <div v-for="(item, idx) in navigationHistory" :key="idx">
            {{ item.name }}
        </div>
        <div class="grid grid-cols-3 gap-y-4 m-auto">
    <RouterLink to="/" class="text-center relative" v-for="(card, idx) in products" :key="idx" @mouseenter="card.isHovering = true"
      @mouseleave="card.isHovering = false">
        <div>
            <img class="h-[200px] w-[150px] m-auto" :src="card.image" alt="Card Item">
            <button class="absolute -top-10 right-0" @click.prevent="isHeartActive = !isHeartActive" :style="{ opacity: card.isHovering ? 1 : 0 }">
                <HeartAnimatedIcon :is-active="isHeartActive" />
            </button>
        </div>
       
        <p class="text-2xl font-bold">{{ card.title }}</p>
        {{ card.price }}$
    </RouterLink>
</div>


    </div>
</template>
<style scoped>
</style>