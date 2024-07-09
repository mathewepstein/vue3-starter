## Features

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 4](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/)

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 📑 [Layout system](./src/layouts)

- 🎨 [Unocss](https://unocss.dev/) - Next generation utility-first CSS framework.

- 😃 [Use icons from any icon sets with classes](https://unocss.dev/presets/icons)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)

<br>

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/unplugin/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [`@unhead`](https://github.com/@unhead/vue) - manipulate document head reactively

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)

### Dev tools

- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
  - [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete

## Usage

Install with PNPM

```bash
pnpm i
```

### Development

Just run and visit http://localhost:3000

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.
