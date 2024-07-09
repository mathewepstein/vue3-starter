<script setup lang="ts">
const siteStore = useSiteStore()
const router = useRouter()

const { t } = useI18n()

const loading = ref(true)

onBeforeMount(async () => {
  const state = router.currentRoute.value.query?.state
  if (state) {
    if (state.includes('ERROR')) {
      siteStore.setError(t(`errors.${state}`))
      router.replace({ query: undefined })
    } else if (state === 'LOGOUT_SUCCESS') {
      window.location.href = `${siteStore.accountLogoutUrl}&redirect_uri=${
        import.meta.env.VITE_APP_TLS_URL
      }&state=LOGOUT_SUCCESS_COMPLETE`
    } else if (state === 'LOGOUT_SUCCESS_COMPLETE') {
      siteStore.setSuccess(t('public.logoutSuccess'))
      router.replace({ query: undefined })
    }
  }

  loading.value = false
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="siteStore.localeReady && !loading" />
      <LoadingScreen v-else />
    </transition>
  </router-view>
</template>
