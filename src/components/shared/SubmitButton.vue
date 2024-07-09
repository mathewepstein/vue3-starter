<script setup>
defineProps(['to'])
</script>
<template>
  <router-link v-if="to" :to="to" class="btn btn-primary">
    <slot />
  </router-link>
  <button v-else class="btn btn-primary"><slot /></button>
</template>
