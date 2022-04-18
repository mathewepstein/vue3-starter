import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import WindiCSS from 'vite-plugin-windicss'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
    }),

    // https://github.com/antfu/unplugin-components
    Components({
      resolvers: [
        IconsResolver({
          prefix: false,
        }),
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
    }),

    Icons({
      autoInstall: true,
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),
  ],
  build: {
    outDir: './dist/',
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: 'terser',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src'), '~@': path.resolve(__dirname, '/src') },
  },
})
