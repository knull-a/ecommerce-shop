<script setup lang="ts">
import { ref, computed } from 'vue';
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import { onClickOutside } from '@vueuse/core';

type Props = {
    status: boolean
    headerTitle?: string
}

type Emits = {
    (e: 'closeModal'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const closeModal = () => emit('closeModal')

const showModalHeader = computed(() => props.headerTitle ? props.headerTitle : '')

const modalElement = ref<HTMLDivElement>()

onClickOutside(modalElement, () => {
    if (props.status) closeModal()
})
</script>
<template>
<Teleport to="#modal-container">
    <Transition name="modal">
        <div ref="modalElement" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 max-w-4xl" v-show="props.status">
            <div class="flex justify-between">
                <h3 class="text-lg">{{ showModalHeader }}</h3>
                <button @click="closeModal">
                    <CloseIcon />
                </button>
            </div>
            <div>
                <slot />
            </div>
        </div>
    </Transition>
</Teleport>
</template>
<style scoped>

</style>