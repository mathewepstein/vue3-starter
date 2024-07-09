<script setup>
import { formatPhone } from '~/filters'

const { t } = useI18n()
const siteStore = useSiteStore()
const authStore = useAuthStore()
</script>

<template>
  <div class="container mx-auto">
    <div class="my-2rem lg:my-4rem">
      <h1 class="text-center text-xl lg:text-2xl font-medium mb-2rem">
        {{ t('signup.pageError') }}
      </h1>
      <h3 class="text-center text-base lg:text-xl font-medium">
        {{ t('signup.tryRefresh') }}
      </h3>
      <div
        v-if="
          siteStore?.customerSupportPhone || siteStore?.customerSupportHours
        "
        class="mt-2rem lg:mt-4rem pb-2rem lg:pb-4rem border border-border-gray rounded text-center flex flex-col justify-start items-center"
      >
        <div
          class="bg-primary text-white rounded-b pt-0.5rem lg:pt-1rem pb-1rem lg:pb-1.5rem px-4rem lg:px-8rem mb-2rem lg:mb-4rem"
        >
          <p class="text-lg lg:text-xl font-medium">
            {{ t('signup.customerService') }}
          </p>
          <p class="text-xl lg:text-2xl mb-0">
            {{ formatPhone(siteStore.customerSupportPhone) }}
          </p>
        </div>
        <p class="mb-2rem text-base lg:text-lg font-medium">
          {{ siteStore.customerSupportHours }}
        </p>
        <p class="mb-0">
          <router-link
            class="btn btn-outline px-2rem"
            :to="{
              name: authStore.userAuthenticated
                ? 'member-contact'
                : 'public-contact',
            }"
            >{{ t('signup.contactCustomerService') }}</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
