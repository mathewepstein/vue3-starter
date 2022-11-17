<script setup lang="ts">
if (!import.meta.env.SSR) setDarkMode()
</script>

<template>
  <main class="container mx-auto px-1rem font-sans dark:text-coolgray-300">
    <router-view />
  </main>
</template>
