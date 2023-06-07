import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { Product } from "@/services/ProductRest";
import { useRest } from "@/services";

export const useProductsStore = defineStore("products", () => {
  const api = useRest();
  const products = ref<Product[]>([]);
  const product = ref<Product>({
    id: 0,
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    isHovering: false,
    isInWishlist: false,
  });

  const getProducts = async () =>
    (products.value = await api.product.getProducts());

  return { products, product, getProducts };
});
