<script setup>
const { t } = useI18n()
</script>

<template>
  <p class="mr-auto mb-0">
    &copy;{{ new Date().getFullYear() }} {{ t('public.allRightsReserved') }}
  </p>
</template>
