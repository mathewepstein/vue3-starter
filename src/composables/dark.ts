export const isDark = useDark({
  onChanged(dark: boolean) {
    if (import.meta.env.SSR)
      return
    document.documentElement.classList.toggle('dark', dark)
    if (document.querySelector('[data-dark-theme]'))
      (document.querySelector('[data-dark-theme]') as HTMLStyleElement).disabled = !dark
    if (document.querySelector('[data-light-theme]'))
      (document.querySelector('[data-light-theme]') as HTMLStyleElement).disabled = dark
  },
})

export const toggleDark = useToggle(isDark)

export function setDarkMode() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const setting = localStorage.getItem('color-schema') || 'auto'
  if (setting === 'dark' || (prefersDark && setting !== 'light'))
    document.documentElement.classList.toggle('dark', true)
}
