<script setup lang="ts">
type Props = {
    color?: string
    isHome?: boolean
}

const props = defineProps<Props>()
</script>
<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_1678)">
    <path :class="{'stroke-white': isHome}" d="M7.64298 4.71218C9.9642 4.44258 11.4514 6.21737 12.0018 6.87549C12.5301 6.18312 14.1703 4.3538 16.4662 4.72983C19.5468 5.23437 20.5116 7.8733 20.3913 9.56414C20.1945 13.7295 14.7241 17.7124 12.0017 19.3451C9.62238 17.8964 7.90554 16.4456 6.69531 15.2401C4.19883 12.7535 3.64305 10.6984 3.6025 9.56414C3.53551 7.69047 4.62495 5.06271 7.64298 4.71218Z" stroke="#887569" stroke-width="1.2"/>
    </g>
    <defs>
    <clipPath id="clip0_1_1678">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
</template>