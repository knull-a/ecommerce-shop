<script setup lang="ts">
type Props = {
    isHome: boolean
}

const props = defineProps<Props>()
</script>
<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :class="{'stroke-white': props.isHome}" d="M11.9705 11.3999C13.8483 11.3999 15.3705 9.87771 15.3705 7.99997C15.3705 6.12222 13.8483 4.60001 11.9705 4.60001C10.0928 4.60001 8.57056 6.12222 8.57056 7.99997C8.57056 9.87771 10.0928 11.3999 11.9705 11.3999Z" stroke="#887569" stroke-width="1.2"/>
    <path :class="{'stroke-white': props.isHome}" d="M19.1999 20C19.1999 16.4655 16.3346 13.6001 12.8 13.6001H11.2C7.6654 13.6001 4.80005 16.4655 4.80005 20" stroke="#887569" stroke-width="1.2"/>
    </svg>
</template>