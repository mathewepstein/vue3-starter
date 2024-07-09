<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" v-cloak :key="route" />
  </router-view>
</template>
