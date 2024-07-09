<script setup lang="ts">
const props = defineProps<{
  successMessage?: string
  errorMessage?: string
}>()

const siteStore = useSiteStore()
const route = useRoute()

const successMessage = computed(() =>
  props?.successMessage ? props?.successMessage : siteStore.siteSuccessMessage
)
const errorMessage = computed(() =>
  props?.errorMessage ? props?.errorMessage : siteStore.siteErrorMessage
)
</script>

<template>
  <transition name="error">
    <div
      v-if="errorMessage || successMessage"
      :class="{
        'text-error bg-error border-color-error': errorMessage,
        'text-text-black border-color-success bg-success-bg': successMessage,
        'rounded border mt-1rem !text-left': route.meta.layout === 'member',
      }"
      class="text-center text-error py-0.8rem px-1rem bg-error border-b border-t border-color-error bg-opacity-20"
      v-html="errorMessage || successMessage"
    />
  </transition>
</template>
