<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="w-full mt-auto py-2rem px-2rem">
    <SiteLogo class="inline-block w-12rem" />
    <p class="text-text-gray text-sm mt-0.6rem">
      <i18n-t keypath="public.usingFicoScores">
        <template #registered><sup>&reg;</sup></template>
      </i18n-t>
    </p>
    <div
      class="border-t border-color-border-gray pt-1rem mt-1rem flex flex-col lg:flex-row"
    >
      <SiteDisclaimer class="mb-1rem text-sm text-text-gray" />
      <SiteFooterNav
        data-test-footer-nav
        class="mb-1rem lg:mb-0 flex flex-col sm:flex-row gap-1rem sm:gap-2rem lg:ml-auto lg:mt-0 -order-1 lg:order-2"
      >
        <router-link :to="{ name: 'public-contact' }" class="text-sm">{{
          t('menus.contactUs')
        }}</router-link>
      </SiteFooterNav>
    </div>
    <p class="text-text-gray text-sm">
      <i18n-t keypath="public.ficoTrademarks">
        <template #registered><sup>&reg;</sup></template>
      </i18n-t>
    </p>
    <p class="text-text-gray text-sm mb-0">
      {{ t('public.home.disclaimer') }}
    </p>
    <slot />
  </footer>
</template>
