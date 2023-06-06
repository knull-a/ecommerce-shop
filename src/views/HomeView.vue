<script setup lang="ts">
import { RouteNames } from '@/router/routeNames';
import { Pagination, Autoplay, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import 'swiper/css'

const modules = [Pagination, Autoplay, Scrollbar];

</script>
<template>
  <div class="text-white text-4xl">
    <swiper :slides-per-view="1" :modules="modules" :autoplay="{ delay: 5000 }" :scrollbar="{ draggable: true }">
      <swiper-slide>
        <RouterLink :to="{name: RouteNames.MENS}" class="swiper before:bg-mens">For Men</RouterLink>
      </swiper-slide>
      <swiper-slide>
        <RouterLink :to="{name: RouteNames.WOMENS}" class="swiper before:bg-womens">For Women</RouterLink>
      </swiper-slide>
      <swiper-slide>
        <RouterLink :to="{name: RouteNames.JEWELLERY}" class="swiper before:bg-jewellery">Jewellery</RouterLink>
      </swiper-slide>
      <swiper-slide>
        <RouterLink :to="{name: RouteNames.ELECTRONICS}" class="swiper before:bg-electronics">Electronics
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>
<style scoped>
.swiper {
  @apply h-[100vh] flex items-center justify-center text-center before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-cover before:bg-no-repeat before:-z-10 before:brightness-50;
}
</style>