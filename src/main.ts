import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { redirects } from './redirects'
import App from './App.vue'
import type { AppModule } from './types'

import '@unocss/reset/tailwind.css'
import './styles/variables.postcss'
import './styles/typography.postcss'
import 'uno.css'
import './styles/main.postcss'
import './styles/transitions.postcss'
import './styles/tooltip.postcss'

const allRoutes = [...redirects, ...routes]

const authedRoutes = setupLayouts(allRoutes).map((route) => {
  return {
    ...(route.path === '/member' && { meta: { authRequired: true } }),
    ...route,
  }
})

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: authedRoutes,
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install: AppModule }>('./modules/*.ts', {
        eager: true,
      })
    ).forEach((i) => i.install?.(ctx))
  },
  {
    rootContainer: '#platformlinkapp',
  }
)
