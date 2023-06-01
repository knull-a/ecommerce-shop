<script setup lang="ts">
import { ref } from 'vue';
import {onClickOutside} from "@vueuse/core"

import SearchIcon from '@/assets/icons/SearchIcon.vue';

type Props = {
    placeholder?: string
    modelValue?: string
}

type Emits = {
    (e: 'update:modelValue', v: string): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const list = ref<HTMLDivElement>()
const isOpened = ref(false)

onClickOutside(list, () => isOpened.value = false)
</script>
<template>
<div class="rounded-md w-48">
    <div class="flex gap-1 items-center">
        <SearchIcon class=" ml-1" />
        <input class="w-full outline-none rounded-md py-1 px-1" type="text" :placeholder="props.placeholder" @input="emits('update:modelValue', ($event?.target as HTMLInputElement).value)" :value="props.modelValue"  />
    </div>
    <div ref="list" v-show="isOpened">
        <div>
            da
        </div>
        <div>
            da
        </div>
        <div>
            da
        </div>
    </div>
</div>
</template>
<style scoped>

</style>