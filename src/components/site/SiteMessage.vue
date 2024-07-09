<script setup lang="ts">
const siteStore = useSiteStore()
const route = useRoute()

const { t } = useI18n()
</script>

<template>
  <div
    class="w-full text-sm"
    :class="{
      'pt-2.5rem': siteStore.sandboxMode,
      'px-1rem md:px-2rem max-w-66rem mx-auto': route.meta.layout === 'member',
    }"
  >
    <div
      v-if="siteStore.sandboxMode"
      v-bind="$attrs"
      class="transition-all fixed top-0 right-0 left-0 h-2.5rem leading-2.5rem text-center uppercase text-orange font-medium border-b border-color-info bg-info-lighten z-998"
      :class="{ 'top-5rem md:top-0': route.meta.layout === 'member' }"
    >
      Sandbox Environment
    </div>
    <SiteMessageAlert />
  </div>
</template>
