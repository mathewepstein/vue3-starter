/// <reference types='vitest' />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import basicSsl from '@vitejs/plugin-basic-ssl'
import generateSitemap from 'vite-ssg-sitemap'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import postcssNesting from 'postcss-nesting'
import { unheadVueComposablesImports } from '@unhead/vue'

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  server: {
    https: true,
    port: 3000,
  },

  plugins: [
    VueRouter({
      /* options */
    }),
    Vue({
      include: [/\.vue$/],
    }),

    VueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, './locales/**')],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        VueRouterAutoImports,
        '@vueuse/core',
        'pinia',
        unheadVueComposablesImports,
        { 'vue-i18n': ['useI18n'] },
      ],
      dts: true,
      dirs: ['./src/composables', './src/store'],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    basicSsl(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    crittersOptions: {
      preload: 'media',
    },
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    rootContainerId: 'platformlinkapp',
    includedRoutes(paths) {
      return paths.filter((i) => !i.includes('member'))
    },
    onFinished() {
      generateSitemap()
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window', /vue-i18n/],
  },
})
