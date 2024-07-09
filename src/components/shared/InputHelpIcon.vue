<template>
  <div
    v-tooltip="
      `<p class='bg-border-gray text-center border border-gray p-0.5rem rounded my-1rem text-sm'>CVV is a 3 or 4 digit card verification id located on your credit card.</p><img src='/images/bg-cvv-help.jpg' width='223' height='329' alt='CVV' data-uw-rm-alt-original='CVV'>`
    "
    id="input-help-tooltip"
    class="bg-border-gray z-100 w-3.75rem flex items-center justify-center rounded-r border border-color-border cursor-pointer -ml-1rem"
  >
    <HelpIcon class="w-1.5rem" />
  </div>
</template>
