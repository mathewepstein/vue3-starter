import { useMemberFetch } from '~/services/member.service'
import { $i18n } from '~/modules/i18n'
import { parseJwt } from '~/filters'

export const useAuthStore = defineStore('auth', () => {
  const siteStore = useSiteStore()
  const router = useRouter()
  const { t } = $i18n

  /**
   * State Definitions
   */
  let timeoutID: number | null = null
  const timeout = ref<number | null>(30)
  const registrantToken = ref<string | null>()
  const reactivationToken = ref<string | null>()

  /**
   * Getters
   */
  const getJwt = computed(() => {
    if (import.meta.env.SSR) return null
    return parseJwt(localStorage.getItem('_plat')!)
  })

  const userAuthenticated = computed(() => {
    if (!import.meta.env.SSR && !localStorage.getItem('_plat')) {
      return false
    }

    const { aud, exp } = getJwt.value
    const expired = Date.now() >= exp * 1000
    return !expired && aud === import.meta.env.VITE_APP_FUSIONAUTH_CLIENTID
  })

  const agentAssisted = computed(() => {
    const { type } = getJwt.value

    return type === 'LOGIN_AS'
  })

  /**
   * Actions
   */

  const validateSession = async (): Promise<boolean> => {
    if (!userAuthenticated.value) {
      sessionStorage.setItem(
        'tls_redirect',
        JSON.stringify(router.currentRoute.value.name)
      )
      window.location.href = siteStore.loginUrl
    } else {
      refreshTokenTimer()
    }

    return userAuthenticated.value
  }

  const refreshTokenTimer = () => {
    if (timeoutID) return

    timeoutID = setTimeout(() => {
      timeoutID = null

      if (!document.hidden) checkToken()
    }, timeout.value! * 900)
  }

  const checkToken = async () => {
    if (!import.meta.env.SSR && !localStorage.getItem('_tlsrt')) {
      return logoutUser('SESSION_EXPIRED_ERROR')
    }

    try {
      const { error, data } = await useMemberFetch('refresh').post({
        ...(!import.meta.env.SSR && {
          refreshToken: localStorage.getItem('_tlsrt'),
        }),
      })

      if (error.value) {
        return logoutUser('LOGIN_FAILED_ERROR')
      }

      saveToken(data.value)

      return true
    } catch (error) {
      return logoutUser('LOGIN_FAILED_ERROR')
    }
  }

  const processCode = async (code: string): Promise<string> => {
    try {
      // redirect after login to originally requested url
      const redirectStorage = sessionStorage.getItem('tls_redirect')
      sessionStorage.removeItem('tls_redirect')

      const redirect = redirectStorage ? JSON.parse(redirectStorage) : null

      const { error, data } = await useMemberFetch(
        `login?code=${code}&redirect_uri=${
          import.meta.env.VITE_APP_TLS_URL
        }/auth&response_type=code`
      )

      if (error.value) {
        logoutUser('LOGIN_FAILED_ERROR')
      }

      if (data.value?.accountStatus === 'REGISTRANT') {
        registrantToken.value = data.value.otc.code
        return 'signup'
      }

      if (data.value?.accountStatus === 'CLOSED') {
        reactivationToken.value = data.value.otc.code
        return 'account-reactivation'
      }

      if (data.value?.access_token) {
        saveToken(data.value)
        return redirect ? redirect : 'member-home'
      }

      siteStore.setError(t('errors.LOGIN_FAILED_ERROR'))
      return 'home'
    } catch (error) {
      logoutUser('LOGIN_FAILED_ERROR')
    }
  }

  const saveToken = (resp: any) => {
    if (!import.meta.env.SSR && resp?.access_token) {
      localStorage.setItem('_plat', resp.access_token)
    }

    if (resp?.refresh_token) {
      timeout.value = resp.expires_in

      refreshTokenTimer()
      if (!import.meta.env.SSR)
        localStorage.setItem('_tlsrt', resp.refresh_token)
    }
  }

  const logoutUser = async (error: string) => {
    const pinia = getActivePinia()

    if (!pinia) {
      throw new Error('There is no stores')
    }

    pinia._s.forEach((store, name) => {
      store.$reset()
    })

    if (!import.meta.env.SSR) {
      localStorage.removeItem('_plat')
      localStorage.removeItem('_tlsrt')
    }

    window.location.href = `${siteStore.logoutUrl}&redirect_uri=${
      import.meta.env.VITE_APP_TLS_URL
    }${error ? `&state=${error}` : ''}`
  }

  const $reset = () => {
    timeout.value = null
  }

  return {
    agentAssisted,
    registrantToken,
    reactivationToken,
    userAuthenticated,
    processCode,
    validateSession,
    logoutUser,
    $reset,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
