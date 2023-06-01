<script setup lang="ts">
import { useRest } from '@/services';
import { type Product } from '@/services/ProductRest';
import { onMounted, ref, watch, watchEffect } from 'vue';

const api = useRest()

const products = ref<Product[]>([])

watchEffect(async () => {
    try {
       const res = await api.product.getMens()
       products.value = res
    } catch (error) {
        console.error(error)
    }
})
</script>
<template>
{{ products }}
</template>
<style scoped>

</style>