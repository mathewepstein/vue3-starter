<script setup lang="ts">
defineProps({ errors: { type: Object, default: null } })
</script>

<template>
  <transition name="error">
    <div v-if="errors?.length" class="mt-0.5rem text-error text-sm">
      {{ errors[0].$message }}
    </div>
  </transition>
</template>
