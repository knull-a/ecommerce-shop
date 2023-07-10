<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouteNames } from '@/router/routeNames';
import ChevronIcon from "@/assets/icons/ChevronIcon.vue"
import { useRouter, useRoute } from 'vue-router';

type Props = {
  category: string
  product?: string
}

type Crumb = {
  id: number
  title: string
}

const props = defineProps<Props>()

const router = useRouter()
const route = useRoute()

const routePath = computed(() => (crumb: Crumb) => {
  if (crumb.id === 0) {
    return router.push({ name: RouteNames.HOME })
  } else if (crumb.id === 1) {
    return router.push("/" + route.path.split('/')[1])
  }
  return router.go(-crumb.id)
})

const breadCrumbs = ref<Crumb[]>([
  {
    id: 0,
    title: RouteNames.HOME
  },
  {
    id: 1,
    title: props.category.charAt(0).toUpperCase() + props.category.slice(1)
  },
  {
    id: 2,
    title: props.product || ''
  }
])

</script>
<template>
  <nav>
    <ul class="flex items-center gap-2">
      <li @click="routePath(crumb)" class="flex items-center gap-2 cursor-pointer" v-for="crumb in breadCrumbs"
        :key="crumb.id">
        <p class=" text-ellipsis whitespace-nowrap overflow-hidden max-w-[100px] sm:max-w-sm">{{ crumb.title }}</p>
        <ChevronIcon v-if="crumb.id !== 2" />
      </li>
    </ul>
  </nav>
</template>

