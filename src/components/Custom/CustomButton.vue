<script setup lang="ts">
import { computed } from 'vue';

type Variation = 'default' | 'flat' | 'outlined';

type Props = {
  type: 'button' | 'submit' | 'reset'
  text?: string
  isFull?: boolean
  variation?: Variation
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variation: 'default'
})

const buttonClass = computed(() => {
  switch (props.variation) {
    case 'outlined':
      return 'py-1 px-2 inline-block bg-transparent text-primary rounded-lg border border-primary hover:brightness-110'
    case 'flat':
      return 'inline-block text-primary hover:brightness-110 underline hover:no-underline'
    default:
      return 'py-1 px-2 inline-block bg-primary text-white rounded-lg hover:brightness-110'
  }
})
</script>
<template>
  <button :class="buttonClass" :type="props.type">
    <span>{{ text }}</span>
  </button>
</template>
