<script setup lang="ts">
import {Pagination, Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import 'swiper/css'

const modules = [ Pagination, Autoplay ];

</script>
<template>
<div class=" overflow-hidden">
  <swiper
  class="overflow-hidden"
    :slides-per-view="1"
    :space-between="50"
    autoplay
    :pagination="{ clickable: true }"
    :modules="modules"
  >
    <swiper-slide><div class="h-[90vh] max-h-screen flex items-center justify-center text-center">Slide 1</div></swiper-slide>
    <swiper-slide><div class="h-[90vh] flex items-center justify-center text-center">Slide 2</div></swiper-slide>
    <swiper-slide><div class="h-[90vh] flex items-center justify-center text-center">Slide 3</div></swiper-slide>
  </swiper>
</div>
</template>
<style scoped>

</style>