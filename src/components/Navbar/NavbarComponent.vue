<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { db, auth } from "@/data";
import { getDocs, collection } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { useToggle } from "@vueuse/core";
import { useUsersStore } from "@/stores/user"
import { RouteNames } from '@/router/routeNames';

import NavbarSearch from '@/components/Navbar/NavbarSearch.vue';
import history from "@/router/history";
import ModalMain from "@/components/Modal/ModalMain.vue";
import ModalAuth from "@/components/Modal/ModalAuth.vue";

import HeartIcon from "@/assets/icons/HeartIcon.vue"
import CartIcon from "@/assets/icons/CartIcon.vue"
import ProfileIcon from "@/assets/icons/ProfileIcon.vue"
import LogoIcon from "@/assets/icons/LogoIcon.vue"

const navigationHistory = ref(history.get())
const route = useRoute()
const router = useRouter()

const userStore = useUsersStore()
const {updateUser} = userStore
const { currentUser, user } = storeToRefs(userStore)
const isHome = computed(() => route.name === RouteNames.HOME)

const [authModalStatus, toggleAuthModal] = useToggle()

const showProfile = () => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            router.push({ name: RouteNames.PROFILE })
            return
        }
        toggleAuthModal()
    })
}

watch(currentUser, async () => {
    onAuthStateChanged(getAuth(), (user) => {
        if (!user) {
            router.push("/")
        }
        if (auth.currentUser) {
            currentUser.value = auth.currentUser
        }
        console.log(auth.currentUser)
    })
    updateUser()
    console.log('mounted navbar')
}, { immediate: true })

</script>
<template>
    <div class="relative border-b-1">
        <div :class="{ 'text-white': isHome }" class="fixed w-full z-40 top-0 flex justify-between items-center py-2 px-5">
            <div class="flex gap-6">
                <RouterLink :to="{ name: RouteNames.MENS }">
                    {{ RouteNames.MENS }}
                </RouterLink>
                <RouterLink :to="{ name: RouteNames.WOMENS }">
                    {{ RouteNames.WOMENS }}
                </RouterLink>
                <RouterLink :to="{ name: RouteNames.JEWELLERY }">
                    {{ RouteNames.JEWELLERY }}
                </RouterLink>
                <RouterLink :to="{ name: RouteNames.ELECTRONICS }">
                    {{ RouteNames.ELECTRONICS }}
                </RouterLink>
            </div>
            <div class="text-2xl font-bold">
                <RouterLink :to="{ name: RouteNames.HOME }" class="relative">
                    <LogoIcon />
                </RouterLink>
            </div>
            <div class="flex items-center gap-3">
                <NavbarSearch :is-home="isHome" />
                <RouterLink :to="{ name: RouteNames.WISHLIST }">
                    <HeartIcon :is-home="isHome" />
                </RouterLink>
                <RouterLink :to="{ name: RouteNames.CART }">
                    <CartIcon :is-home="isHome" />
                </RouterLink>
                <ProfileIcon @click="showProfile" :is-home="isHome" />
                <ModalMain :status="authModalStatus" @close-modal="toggleAuthModal()" header-title="Войти в аккаунт">
                    <ModalAuth @toggleModal="toggleAuthModal()" />
                </ModalMain>
            </div>
        </div>
    </div>
</template>
