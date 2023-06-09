<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  type: 'button' | 'submit' | 'reset'
  text?: string
  isFull?: boolean
  classes?: string
  flat?: boolean
}

const props = defineProps<Props>()

const defaultClasses = 'py-1 px-2 inline-block bg-primary text-white rounded-lg hover:brightness-110'

const combinedClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'w-full': props.isFull
  }
  if (props.classes) {
    classes[props.classes] = true;
  }
  return classes;
})
</script>
<template>
  <button :class="[defaultClasses, combinedClasses]" :type="props.type">
    <span>{{ text }}</span>
  </button>
</template>
