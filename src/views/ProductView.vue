<script setup lang="ts">
import { ref } from 'vue';
import { useRest } from '@/services';
import { type Product } from '@/services/ProductRest';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import {useProductsStore} from '@/stores/products'
import { storeToRefs } from 'pinia';
import BreadCrumbs from "@/components/BreadCrumbs.vue"

const route = useRoute()
const router = useRouter()
const api = useRest()
const productsStore = useProductsStore()
const {product} = storeToRefs(productsStore)

const isLoading = ref(false)

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
<div class="m-20">
    <BreadCrumbs v-if="product.category" :category="product.category" :product="product.title" />
    <div>
        <img class=" w-96" :src="product.image" alt="">

        <div>
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
        </div>
    </div>
</div>
</template>
<style scoped>

</style>