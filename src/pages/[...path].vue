<script setup lang="ts">
</script>

<route lang="yaml">
name: notfound
</route>

<template>
  <div class="mt-2rem md:mt-3rem lg:mt-4rem text-center">
    <SitePageTitle>Page Not Found</SitePageTitle>
    <p>The page you requested cannot be located.</p>
    <p class="mt-3rem">
      <router-link
        :to="{ name: 'home' }"
        class="btn btn-primary btn-lg w-full max-w-30rem"
        >Return to Home</router-link
      >
    </p>
  </div>
</template>
