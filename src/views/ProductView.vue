<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useRest } from '@/services';
import { type Product, Instance } from '@/services/ProductRest';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia';
import BreadCrumbs from "@/components/BreadCrumbs.vue"

type Props = {
    instance: Instance
}

const props = defineProps<Props>()

const route = useRoute()
const api = useRest()
const productsStore = useProductsStore()

const { product } = storeToRefs(productsStore)

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
    <div class="my-20 mx-40">
        <BreadCrumbs v-if="product.category" :category="product.category" :product="product.title" />
        <div v-if="!isLoading" class="flex max-w-4xl gap-14 items-center mt-8 m-auto">
            <img class="image w-96 h-96" :src="product.image" alt="">

            <div>
                <h2 class="text-4xl">{{ product.title }}</h2>
                <p class="text-grey">- {{ product.category }}</p>
                <p class="description">{{ product.description }}</p>
            </div>
        </div>
        <div v-else class="flex max-w-4xl gap-14 items-center mt-32 m-auto">
            <div class="loading w-80 h-80">

            </div>
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
<style scoped>
/* .loading {
    @apply flex items-center justify-center bg-gradient-to-r from-transparent via-grey to-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-cover bg-repeat-x animate-pulse
} */
</style>
