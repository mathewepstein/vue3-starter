import statesList from './statesList.json'

export const useSiteStore = defineStore('site', () => {
  const loading = ref(false)
  const collapsedMenu = ref(false)
  const localeReady = ref(false)
  const siteMessage = ref({
    error: '',
    success: '',
  })

  const sandboxMode = ref(import.meta.env.MODE !== 'production')


  const loginUrl = computed(
    () =>
      `${import.meta.env.VITE_APP_FUSIONAUTH_URL}/oauth2/authorize/?client_id=${
        import.meta.env.VITE_APP_FUSIONAUTH_CLIENTID
      }&redirect_uri=${
        import.meta.env.VITE_APP_TLS_URL
      }/auth&response_type=code&scope=openid offline_access`
  )

  const editAccountUrl = computed(
    () =>
      `${import.meta.env.VITE_APP_FUSIONAUTH_URL}/account/edit?client_id=${
        import.meta.env.VITE_APP_FUSIONAUTH_CLIENTID
      }`
  )

  const logoutUrl = computed(
    () =>
      `${import.meta.env.VITE_APP_FUSIONAUTH_URL}/oauth2/logout?client_id=${
        import.meta.env.VITE_APP_FUSIONAUTH_CLIENTID
      }&scope=openid offline_access`
  )

  const accountLogoutUrl = computed(
    () =>
      `${import.meta.env.VITE_APP_FUSIONAUTH_URL}/account/logout?client_id=${
        import.meta.env.VITE_APP_FUSIONAUTH_CLIENTID
      }`
  )

  const siteErrorMessage = computed(() => siteMessage.value?.error)
  const siteSuccessMessage = computed(() => siteMessage.value?.success)


  const setError = (msg: string) => {
    if (!msg) return
    siteMessage.value.error = msg
  }

  const setSuccess = (msg: string) => {
    if (!msg) return
    siteMessage.value.success = msg
  }

  const clearMessages = () => {
    siteMessage.value = {
      error: '',
      success: '',
    }
  }

  const toggleTheme = () => {
    document.getElementsByTagName('html')[0].classList.toggle('dark')
  }

  const waitTimer = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  watch(
    [() => siteMessage.value.error, () => siteMessage.value.success],
    () => {
      if (
        siteErrorMessage.value.length === 0 &&
        siteSuccessMessage.value.length === 0
      )
        return

      setTimeout(() => {
        clearMessages()
      }, 6000)
    }
  )

  const $reset = () => {
    loading.value = false
    clearMessages()
  }

  return {
    collapsedMenu,
    sandboxMode,
    statesList,
    localeReady,
    editAccountUrl,
    loginUrl,
    logoutUrl,
    accountLogoutUrl,
    loading,
    siteErrorMessage,
    siteSuccessMessage,
    toggleTheme,
    setError,
    setSuccess,
    clearMessages,
    waitTimer,
    $reset,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSiteStore, import.meta.hot))
