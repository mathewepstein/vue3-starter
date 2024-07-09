
export const useUserStore = defineStore('user', () => {
  /**
   * State Definitions
   */

  /**
   * Getters
   */

  /**
   * Actions
   */

  const $reset = () => {
  }

  return {
    $reset,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
