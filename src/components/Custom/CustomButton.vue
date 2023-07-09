<script setup lang="ts">
import { computed, type Component } from 'vue';

export type Variation = 'default' | 'flat' | 'outlined';

type Props = {
  type?: 'button' | 'submit' | 'reset'
  text?: string
  isFull?: boolean
  variation?: Variation
  icon?: Component
  iconColor?: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variation: 'default'
})

const buttonClass = computed(() => {
  switch (props.variation) {
    case 'outlined':
      return 'py-1 px-2 flex items-center justify-center gap-2 bg-transparent text-primary rounded-lg border border-primary hover:brightness-110'
    case 'flat':
      return 'inline-block text-primary hover:brightness-110 underline hover:no-underline'
    default:
      return 'py-1 px-2 flex items-center justify-center gap-2 bg-primary text-white rounded-lg hover:brightness-110'
  }
})
</script>
<template>
  <button :class="buttonClass" :type="props.type">
    <component v-show="icon" :color="iconColor" :isActive="active" :is="icon" class="text-white" />
    <span>{{ text }}</span>
  </button>
</template>
