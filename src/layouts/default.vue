<script setup>
const router = useRouter()

router.afterEach(async () => {
  await nextTick()
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})
</script>

<template>
  <div class="flex flex-col h-full">
    <SiteHeader></SiteHeader>
    <main
      class="container px-1rem mx-auto my-1rem lg:my-3rem"
    >
      <router-view v-slot="{ Component, route }">
        <template v-if="Component">
          <Suspense>
            <component :is="Component" :key="route" />
            <template #fallback>
              <LoadingScreen />
            </template>
          </Suspense>
        </template>
      </router-view>
      <ToTheTop data-test-ttt />
    </main>
    <SiteFooter />
  </div>
</template>
