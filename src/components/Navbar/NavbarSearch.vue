<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { onClickOutside } from "@vueuse/core"

import SearchIcon from '@/assets/icons/SearchIcon.vue';

import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
import { useRest } from '@/services';
import type { Product } from '@/services/ProductRest';
import { useRouter, type RouterLink } from 'vue-router';
import { RouteNames } from '@/router/routeNames';
import { useCapitalLetter } from "@/helpers/useCapitalLetter"

type Props = {
  isHome: boolean
}

const props = defineProps<Props>()

const api = useRest()

const productsStore = useProductsStore()
const router = useRouter()

const { getProducts } = useProductsStore()

const { products } = storeToRefs(productsStore)

const isOpened = ref(false)
const isLoading = ref(false)
const searchField = ref('')

const list = ref<HTMLDivElement>()

const pushToProduct = (productId: number, productCategory: string) => {
  router.push({ name: useCapitalLetter(productCategory), params: { id: productId } })
  isOpened.value = false
  console.log(useCapitalLetter(productCategory))
}

const filteredProducts = computed(() =>
  products.value.filter(item => item.title.toLowerCase().includes(searchField.value.toLowerCase()))
)

onMounted(() =>
  getProducts()
)

watch(searchField, () =>
  isOpened.value = true
)

onClickOutside(list, () => isOpened.value = false)
</script>
<template>
  <div :class="{ 'text-white': isHome }" class="rounded-md w-24 md:w-48">
    <div class="input-opacity flex gap-1 items-center rounded-lg mb-1">
      <SearchIcon :is-home="isHome" class=" ml-1" />
      <input :class="{ 'placeholder:text-white': isHome }"
        class="placeholder:text-primary bg-transparent w-full outline-none rounded-md py-1 px-1" type="text"
        v-model="searchField" placeholder="Search" />
    </div>
    <div class="absolute bg-white w-48 max-h-32 rounded-lg overflow-x-hidden" ref="list">
      <div v-show="isLoading" class="py-2 px-3">Loading...</div>
      <div v-show="isOpened">
        <div @click="pushToProduct(product.id, product.category)"
          class="cursor-pointer hover:backdrop-brightness-125 py-2 px-3" v-for="product in filteredProducts"
          :key="product.id">
          {{ product.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-opacity {
  background-color: rgba(255, 255, 255, 0.24);
}
</style>