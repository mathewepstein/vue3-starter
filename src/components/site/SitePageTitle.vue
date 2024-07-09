<script setup>
const slots = useSlots()
</script>

<template>
  <h1
    data-test-page-heading
    class="h3 lg:text-3xl"
    :class="{
      'mb-2rem': !slots.description,
    }"
  >
    <slot />
  </h1>
  <h2
    data-test-page-subheading
    v-if="slots.description"
    class="p text-text-gray mb-0"
  >
    <slot name="description" />
  </h2>
</template>
