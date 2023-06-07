import { type RouterOptions } from "vue-router";
import { Instance } from "@/services/ProductRest"; 
import { RouteNames } from "@/router/routeNames";

export const routes: RouterOptions["routes"] = [
  {
    path: "/auth",
    name: RouteNames.AUTH,
    component: () => import("@/views/AuthView.vue"),
  },
  {
    path: "/",
    name: RouteNames.HOME,
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/mens",
    name: RouteNames.MENS,
    component: () => import("@/views/CategoryView.vue"),
    props: {
        instance: Instance.Mens
    }
  },
  {
    path: "/mens/:id",
    name: RouteNames.PRODUCT,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/womens",
    name: RouteNames.WOMENS,
    component: () => import("@/views/CategoryView.vue"),
    props: {
        instance: Instance.Womens
    }
  },
  {
    path: "/womens/:id",
    name: RouteNames.PRODUCT,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/jewellery",
    name: RouteNames.JEWELLERY,
    component: () => import("@/views/CategoryView.vue"),
    props: {
        instance: Instance.Jewellery
    }
  },
  {
    path: "/jewellery/:id",
    name: RouteNames.PRODUCT,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/electronics",
    name: RouteNames.ELECTRONICS,
    component: () => import("@/views/CategoryView.vue"),
    props: {
        instance: Instance.Electronics
    }
  },
  {
    path: "/electronics/:id",
    name: RouteNames.PRODUCT,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/wishlist",
    name: RouteNames.WISHLIST,
    component: () => import("@/views/WishlistView.vue"),
  },
  {
    path: "/cart",
    name: RouteNames.CART,
    component: () => import("@/views/CartView.vue"),
  },
];
