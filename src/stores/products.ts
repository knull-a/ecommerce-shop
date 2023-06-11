import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";

import type { Product } from "@/services/ProductRest";
import { useRest } from "@/services";
import { useUsersStore } from "./user";

const {user} = storeToRefs(useUsersStore())

export const useProductsStore = defineStore("products", () => {
  const api = useRest();
  const products = ref<Product[]>([]);

  
  const createProduct = () => {
    const product: Product = {
      id: 0,
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
      isHovering: false,
      isInWishlist: false,
    };
  
    product.isInWishlist = user.value?.wishlist.includes(product.id.toString());
  
    return product;
  };
  
  const product = createProduct();

  product.id = 0
  

  const getProducts = async () =>
    (products.value = await api.product.getProducts());

  return { products, product, getProducts };
});
