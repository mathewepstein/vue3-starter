import { createFetch } from '@vueuse/core'

export const useMemberFetch = createFetch({
  baseUrl: `${import.meta.env.VITE_APP_TLS_API}/v1`,
  combination: 'overwrite',
  options: {
    async beforeFetch({ options }) {
      if (!import.meta.env.SSR && localStorage.getItem('_plat') !== null) {
        options.headers.Authorization = `Bearer ${localStorage.getItem('_plat')}`
      }
      options.headers.Cookie = document.cookie
      options.headers['Content-Type'] = 'application/json'

      return { options }
    },
    async afterFetch({ data }) {
      const json = await JSON.parse(data)
      return { data: json }
    },
    onFetchError(ctx) {
      if (ctx.response && ctx.response.status === 403) {
        const authStore = useAuthStore()
        authStore.logoutUser()
      }

      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors',
    redirect: 'follow',
    credentials: 'same-origin',
  },
})
