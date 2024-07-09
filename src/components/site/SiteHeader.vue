<script setup lang="ts"></script>

<template>
  <header>
    <SiteMessage />
    <div
      class="flex justify-between items-end p-1rem lg:px-4.5rem pt-2rem lg:pt-3rem"
    >
      <SiteLogo class="max-w-12rem md:max-w-16rem" />
      <slot name="top-navigation" />
    </div>
  </header>
</template>
