<script setup lang="ts">
import { currency } from '~/filters'

const { t } = useI18n()
const userStore = useUserStore()
const siteStore = useSiteStore()
const authStore = useAuthStore()

const anchorJump = (anchor: string) => {
  const el = document.getElementById(anchor)
  if (el)
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
}
</script>

<route lang="yaml">
name: home
meta:
  layout: blank
</route>

<template>
  <div>hi</div>
</template>
