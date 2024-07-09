<script setup lang="ts">
const site = useSiteStore()
</script>

<template>
  <ul class="h-full mx-1rem">
    <li v-for="(link, index) in site.siteLinks" :key="index">
      <SiteLink :link="link"><SiteLinkText :link="link" /> </SiteLink>
    </li>
  </ul>
</template>
