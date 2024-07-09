<script setup>
const showButton = ref(false)
const router = useRouter()

const returnToTop = () => {
  router.replace({ hash: null })
  return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

onMounted(() => {
  document.addEventListener(
    'scroll',
    () => (showButton.value = window.scrollY > 300)
  )
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="showButton"
      class="flex fixed bottom-6rem md:bottom-5rem right-1.5rem w-3rem h-3rem bg-primary justify-center items-center rounded-full cursor-pointer z-100"
      @click="returnToTop()"
    >
      <DropdownCaretIcon class="fill-white rotate-180" />
    </div>
  </transition>
</template>
