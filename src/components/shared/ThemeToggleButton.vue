<template>
  <button class="theme-toggle" @click="toggleDark()">
    <div>
      <i class="i-carbon-light text-cdYellow hover:(i-carbon-light-filled text-cdYellow)" />
      <i class="i-carbon-asleep hover:(i-carbon-asleep-filled text-sky-200) rotate-180 text-sky-200" />
    </div>
  </button>
</template>

<style lang="postcss">
.theme-toggle{
  width: 2.4rem;
  height: 2.4rem;
  overflow: hidden;
  font-size: 1.2rem;

  &:hover{
    background: none !important;
  }

  & > div{
    position: relative;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;

    .dark &{
      transform: rotate(180deg);
    }
  }
}
</style>
