<script setup lang="ts">
const authStore = useAuthStore()
const siteStore = useSiteStore()
const router = useRouter()
const route = useRoute()

const { t } = useI18n()

onBeforeMount(async () => {
  const code = route.query?.code as string
  const state = route.query?.state as string

  router.replace({ query: null })

  if (!code) {
    router.replace({ name: 'home' })
  }

  const nextRoute = await authStore.processCode(code)
  if (state === 'NEW_SIGNUP') router.replace({ name: 'signup-complete' })
  else router.replace({ name: nextRoute })

  if (state === 'ACCOUNT_REACTIVATION')
    siteStore.setSuccess(t('member.accountReactivated'))
})
</script>

<route lang="yaml">
name: auth
meta:
  layout: loading
</route>

<template>
  <LoadingScreen />
</template>
