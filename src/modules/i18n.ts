import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import type { AppModule } from '~/types'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.json')).map(
    ([path, loadLocale]) => [path.match(/([\w-]*)\.json$/)?.[1], loadLocale]
  )
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  return new Promise(async (resolve, reject) => {
    // If the same language
    if (i18n.global.locale.value === lang) resolve(setI18nLanguage(lang))

    // If the language was already loaded
    if (loadedLanguages.includes(lang)) resolve(setI18nLanguage(lang))

    try {
      // If the language hasn't been loaded yet
      const messages = await localesMap[lang]()
      i18n.global.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      resolve(setI18nLanguage(lang))
    } catch {
      reject()
    }
  })
}

export const install: AppModule = async ({ app }) => {
  const siteStore = useSiteStore()

  app.use(i18n)
  await loadLanguageAsync('en')
  siteStore.localeReady = true
}

export const $i18n = i18n.global
