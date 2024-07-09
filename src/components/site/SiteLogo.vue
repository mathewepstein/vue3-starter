<script setup lang="ts">
const props = defineProps({
  reversed: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
  noLink: { type: Boolean, default: false },
})
const route = useRoute()

const logoToName = computed(
  () =>
    !props.noLink && { name: route.meta.authRequired ? 'member-home' : 'home' }
)
</script>

<template>
  <component :is="noLink ? 'div' : 'router-link'" :to="logoToName">
    <LogoSvg :reversed="reversed" :icon-only="iconOnly"></LogoSvg>
  </component>
</template>

<style scoped>
svg {
  width: 100%;
  height: auto;
}
</style>
