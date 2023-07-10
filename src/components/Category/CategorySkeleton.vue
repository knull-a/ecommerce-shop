<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-y-4 m-auto">
    <div v-for="card in 6">
      <div class="h-[200px] w-[350px] m-auto loading" />
      <div class="flex flex-col gap-1 mt-1 ">
        <p class="loading w-[100px] h-2 m-auto"></p>
        <p class="loading w-[200px] h-2 m-auto"></p>
        <p class="loading w-[150px] h-2 m-auto"></p>
      </div>
    </div>
  </div>
</template>
