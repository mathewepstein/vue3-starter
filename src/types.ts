import { Pinia, Store } from 'pinia'
import { type ViteSSGContext } from 'vite-ssg'

export type AppModule = (ctx: ViteSSGContext) => void

declare global {
  interface Window {
    smOptions: any
    iframeSrc: any
  }
}

export interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>
}

export interface CssVars {
  property: string
  value: { light: string; dark: string }
}
