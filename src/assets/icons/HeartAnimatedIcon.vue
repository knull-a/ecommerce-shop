<script setup lang="ts">
type Props = {
    isActive: boolean
}

const props = defineProps<Props>()
</script>
<template>
  <div class="heart" :class="{'is-active': isActive}"></div>
</template>
<style scoped>
.heart {
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png") no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
  
}
.is-active {
  transition-duration: 1s;
  background-position: -2800px 0;
}

body {
  background: #000000;
}
</style>