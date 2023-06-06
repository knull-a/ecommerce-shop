import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Product } from '@/services/ProductRest'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const product = ref<Product>({
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
    isHovering: false,
    isInWishlist: false
  })

  return { products, product }
})
