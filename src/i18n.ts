import { isRef } from 'vue'
import { createI18n } from 'vue-i18n'

import type {
  I18n,
  I18nOptions,
  Locale,
  VueI18n,
  Composer,
  I18nMode,
} from 'vue-i18n'

export const SUPPORTED_LOCALES = ['en']

function isComposer(
  instance: VueI18n | Composer,
  mode: I18nMode
): instance is Composer {
  return mode === 'composition' && isRef(instance.locale)
}

export function setLocale(i18n: I18n, locale: Locale): void {
  if (isComposer(i18n.global, i18n.mode)) {
    i18n.global.locale.value = locale
  } else {
    i18n.global.locale = locale
  }
}

export function setupI18n(options: I18nOptions = { locale: 'en' }): I18n {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale!)
  return i18n
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale)
  if (!import.meta.env.SSR)
    document.querySelector('html')!.setAttribute('lang', locale)
}
