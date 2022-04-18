import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './assets/styles/main.css'

const app = createApp(App)

// setup up pages with layouts
const routes = setupLayouts(generatedRoutes)
const router = createRouter({ history: createWebHistory('/'), routes })

app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.js')).map(i =>
  i.install?.({ app, router, routes })
)

const vm = app.mount('#app')
