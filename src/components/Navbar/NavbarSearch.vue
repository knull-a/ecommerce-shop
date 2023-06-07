<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { onClickOutside } from "@vueuse/core"

import SearchIcon from '@/assets/icons/SearchIcon.vue';

import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
import { useRest } from '@/services';

type Props = {
  isHome: boolean
}

const props = defineProps<Props>()

const api = useRest()

const productsStore = useProductsStore()

const { getProducts } = useProductsStore()

const { products } = storeToRefs(productsStore)

const isOpened = ref(false)
const isLoading = ref(false)
const searchField = ref('')

const list = ref<HTMLDivElement>()

const showSearchList = () => {
  isLoading.value = true
  products.value = products.value.filter((product) =>
    product.title != searchField.value
  )
  isLoading.value = false
  isOpened.value = true
}

watch(searchField, () => {
  console.log('hello')
  products.value = []
  showSearchList()
})

onMounted(() => {
  getProducts()
})

onClickOutside(list, () => isOpened.value = false)
</script>
<template>
  <div :class="{ 'text-white': isHome }" class="rounded-md w-48">
    <div class="input-opacity flex gap-1 items-center rounded-lg mb-1">
      {{ searchField }}
      <SearchIcon :is-home="isHome" class=" ml-1" />
      <input @click="showSearchList()" :class="{ 'placeholder:text-white': isHome }"
        class="placeholder:text-primary bg-transparent w-full outline-none rounded-md py-1 px-1" type="text"
        v-model="searchField" placeholder="Search" />
    </div>
    <div class="absolute input-opacity w-48 max-h-32 rounded-lg overflow-auto" ref="list">
      <div v-show="isLoading" class="py-2 px-3">Loading...</div>
      <div v-show="isOpened">
        <div class="cursor-pointer hover:backdrop-brightness-125 py-2 px-3" v-for="product in products" :key="product.id">
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