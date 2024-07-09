import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'text-gray': 'text-text-gray',
    'text-black': 'text-text-black',
    btn: 'w-max min-w-10rem h-2.5rem rounded px-2rem mx-auto block text-center leading-btn transition disabled:opacity-60 disabled:cursor-not-allowed',
    'btn-link': 'border border-transparent text-primary',
    'btn-outline':
      'border border-color-primary text-primary hover:bg-primary-hover hover:text-white',
    'btn-primary': 'bg-primary text-white hover:bg-primary-hover',
    'btn-secondary': 'bg-secondary text-white hover:bg-secondary-hover',
    'btn-white':
      'border-color-white text-white hover:bg-white hover:text-text-black',
    'btn-sm': 'text-sm py-1 px-2 max-w-200px',
    'btn-lg': 'h-3.25rem !leading-3.25rem text-lg',
    'absolute-topcenter': 'absolute transform -translate-x-1/2 top-0 left-1/2',
    'absolute-center':
      'absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
    'text-open': 'text-exceptional',
    'text-paid': 'text-exceptional',
    'text-current': 'text-exceptional',
    'text-unknown': 'text-text-gray',
    'text-closed': 'text-text-gray',
    'text-indeterminate': 'text-text-gray',
    'text-transferred': 'text-text-gray',
    'text-derogatory': 'text-danger',
    'text-late': 'text-danger',
    'text-days': 'text-danger',
    'text-collection-chargeoff': 'text-danger',
  },
  rules: [
    [
      'rounded-4xl',
      {
        'border-radius': '2rem',
      },
    ],
    [
      'block-shadow',
      {
        'box-shadow': '0px 6px 10px rgba(0, 0, 0, 0.04)',
      },
    ],
    [
      'rounded-box-shadow',
      {
        'box-shadow': '0 0 4px rgba(0, 0, 0, 0.2)',
        'border-radius': '0.6rem',
      },
    ],
    [
      'rounded-box-shadow-drop',
      {
        'box-shadow': '0 0 4px rgba(0, 0, 0, 0.2)',
        'border-radius': '0.6rem',
      },
    ],
    [
      'tooltip-shadow',
      {
        'box-shadow': '3px -3px 3px rgba(0, 0, 0, 0.1)',
      },
    ],
    [
      'shadow-inner-scroll',
      {
        '--tw-shadow': 'inset 0px -10px 7px -10px rgb(0 0 0/0.25)',
        'box-shadow':
          'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)',
      },
    ],
    [
      'leading-btn',
      {
        'line-height': '2.5rem',
      },
    ],
    [
      /^grid-cols-fixed-(\d+)$/,
      (match) => {
        let style = ''
        for (let x = 0; x < parseInt(match[1]); x++) {
          style += '25% '
        }
        return {
          'grid-template-columns': style,
        }
      },
    ],
    [/^leading-(\d+)$/, ([, d]) => ({ 'line-height': `${d}` })],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'text-bottom',
      },
    }),
  ],
  safelist: [],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    breakpoints: {
      xs: '426px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xl2: '1580px',
    },
    colors: {
    },
  },
  variants: [
    (matcher:string) => {
      if (matcher.startsWith('footer:'))
      return {
        // slice `footer:` prefix and passed to the next variants and rules
        matcher: matcher.slice(7),
        selector: (s) => `footer ${s}`,
      }

      if (matcher.startsWith('disabled:'))
        return {
          // slice `disabled:` prefix and passed to the next variants and rules
          matcher: matcher.slice(9),
          selector: (s) => `${s}:disabled`,
        }

      return matcher
    },
  ],
})
