import type { RouterOptions } from "vue-router"
import { RouteNames } from "@/router/routeNames"

export const routes: RouterOptions["routes"] = [
    {
        path: "/auth",
        name: RouteNames.AUTH,
        component: () => import("@/views/AuthView.vue")
    },
    {
        path: "/",
        name: RouteNames.HOME,
        component: () => import("@/views/HomeView.vue")
    },
            {
                path: "/mens",
                name: RouteNames.MENS,
                component: () => import("@/views/MensView.vue")
            },
            {
                path: "/womens",
                name: RouteNames.WOMENS,
                component: () => import("@/views/WomensView.vue")
            },
            {
                path: "/jewellery",
                name: RouteNames.JEWELLERY,
                component: () => import("@/views/JewelleryView.vue")
            },
            {
                path: "/electronics",
                name: RouteNames.ELECTRONICS,
                component: () => import("@/views/ElectronicsView.vue")
            },
            {
                path: "/wishlist",
                name: RouteNames.WISHLIST,
                component: () => import("@/views/WishlistView.vue")
            },
            {
                path: "/cart",
                name: RouteNames.CART,
                component: () => import("@/views/CartView.vue")
            }
]