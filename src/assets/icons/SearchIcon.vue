<script setup lang="ts">
type Props = {
    isHome: boolean
}

const props = defineProps<Props>()
</script>
<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_1670)">
    <path :class="{'stroke-white': props.isHome}" d="M11.0001 17.4C14.5347 17.4 17.4001 14.5346 17.4001 11C17.4001 7.46538 14.5347 4.60001 11.0001 4.60001C7.46548 4.60001 4.6001 7.46538 4.6001 11C4.6001 14.5346 7.46548 17.4 11.0001 17.4Z" stroke="#887569" stroke-width="1.2" stroke-linecap="square"/>
    <path :class="{'stroke-white': props.isHome}" d="M16 16L20 20" stroke="#887569" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <defs>
    <clipPath id="clip0_1_1670">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
</template>