<script setup>
defineEmits(['update:modelValue', 'blur', 'changed'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: Number,
    default: 1,
  },
  type: {
    type: String,
    default: 'text',
  },
  v: {
    type: Object,
    default: null,
  },
})

onMounted(() => {
  if (props.autofocus) {
    document.getElementById(props.name).focus()
  }
})

const errors = computed(() => {
  return props.v ? props.v.$errors.slice(0, 1) : []
})
</script>

<template>
  <div
    class="flex flex-col input-container"
    :class="{ error: errors.length > 0 }"
  >
    <label :for="name" class="mb-0">{{ label }}</label>
    <div class="flex w-full">
      <textarea
        :id="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder ? placeholder : ''"
        :tabindex="tabindex"
        :name="name"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event.target.name)"
      />
      <slot />
    </div>
    <FormError v-if="errors.length" :errors="errors" />
  </div>
</template>
