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
      instance: Instance.Mens,
      routeName: RouteNames.PRODUCT_MEN,
    },
  },
  {
    path: "/mens/:id",
    name: RouteNames.PRODUCT_MEN,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/womens",
    name: RouteNames.WOMENS,
    component: () => import("@/views/CategoryView.vue"),
    props: {
      instance: Instance.Womens,
      routeName: RouteNames.PRODUCT_WOMEN,
    },
  },
  {
    path: "/womens/:id",
    name: RouteNames.PRODUCT_WOMEN,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/jewellery",
    name: RouteNames.JEWELLERY,
    component: () => import("@/views/CategoryView.vue"),
    props: {
      instance: Instance.Jewellery,
      routeName: RouteNames.PRODUCT_JEWELLERY
    },
  },
  {
    path: "/jewellery/:id",
    name: RouteNames.PRODUCT_JEWELLERY,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/electronics",
    name: RouteNames.ELECTRONICS,
    component: () => import("@/views/CategoryView.vue"),
    props: {
      instance: Instance.Electronics,
      routeName: RouteNames.PRODUCT_ELECTRONICS
    },
  },
  {
    path: "/electronics/:id",
    name: RouteNames.PRODUCT_ELECTRONICS,
    component: () => import("@/views/ProductView.vue"),
  },
  {
    path: "/profile",
    name: RouteNames.PROFILE,
    component: () => import("@/views/UserView.vue"),
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
