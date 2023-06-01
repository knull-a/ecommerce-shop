<script setup lang="ts">
import { ref } from "vue";
import NavbarSearch from '@/components/Navbar/NavbarSearch.vue';
import { RouteNames } from '@/router/routeNames';
import { RouterLink } from 'vue-router';

import HeartIcon from "@/assets/icons/HeartIcon.vue"
import CartIcon from "@/assets/icons/CartIcon.vue"
import ProfileIcon from "@/assets/icons/ProfileIcon.vue"
import LogoIcon from "@/assets/icons/LogoIcon.vue"

const searchQuery = ref('')

</script>
<template>
<div class="flex justify-between items-center py-2 px-5">
    <div class="flex gap-6">
        <RouterLink :to="{name: RouteNames.MENS}">
            {{ RouteNames.MENS }}
        </RouterLink>
        <RouterLink :to="{name: RouteNames.WOMENS}">
            {{ RouteNames.WOMENS }}
        </RouterLink>
        <RouterLink :to="{name: RouteNames.JEWELLERY}">
            {{ RouteNames.JEWELLERY }}
        </RouterLink>
        <RouterLink :to="{name: RouteNames.ELECTRONICS}">
            {{ RouteNames.ELECTRONICS }}
        </RouterLink>
    </div>
    <div class="text-2xl font-bold">
        <RouterLink :to="{name: RouteNames.HOME}" class="relative">
            <LogoIcon />
        </RouterLink>
    </div>
    <div class="flex items-center gap-3">
        <NavbarSearch placeholder="Поиск" v-model="searchQuery" />
        <HeartIcon />
        <CartIcon/>
        <ProfileIcon />
    </div>
</div>
</template>