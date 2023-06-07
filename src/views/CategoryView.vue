<script setup lang="ts">
import { type Product, Instance } from '@/services/ProductRest';

import { ref, toRefs, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { useRest } from '@/services';

import { RouteNames } from '@/router/routeNames';

import HeartAnimatedIcon from '@/assets/icons/HeartAnimatedIcon.vue';

type Props = {
    instance: Instance
}

const props = defineProps<Props>()

const {instance} = toRefs(props)

const api = useRest()

const products = ref<Product[]>([])

watchEffect(async () => {
    try {
        const res = await api.product.getCategory(instance.value)
        products.value = res.map((item) => {
            return {
                ...item,
                isHovering: false,
                isInWishlist: false
            }
        })
    } catch (error) {
        console.error(error)
    }
})

</script>
<template>
    <div class="mt-20 max-w-6xl m-auto">
        <div class="grid grid-cols-3 gap-y-4 m-auto">
            <RouterLink :to="{name: RouteNames.PRODUCT, params: {id: card.id}}" class="text-center relative" v-for="(card, idx) in products" :key="idx"
                @mouseenter="card.isHovering = true" @mouseleave="card.isHovering = false">
                <div>
                    <img class="h-[200px] w-[350px] object-contain m-auto" :src="card.image" alt="Card Item">
                    <button class="absolute -top-10 right-0" @click.prevent="card.isInWishlist = !card.isInWishlist"
                        :style="{ opacity: card.isHovering ? 1 : 0 }">
                        <HeartAnimatedIcon :is-active="card.isInWishlist" />
                    </button>
                </div>

                <p class="mt-2">{{ card.price }}$</p>
                <p class="text-2xl font-bold">{{ card.title }}</p>
            </RouterLink>
        </div>


    </div>
</template>
<style scoped></style>