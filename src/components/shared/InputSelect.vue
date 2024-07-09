<script setup>
defineEmits(['update:modelValue', 'blur', 'changed'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  optionslist: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  tabindex: {
    type: Number,
    default: 1,
  },
  v: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
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
    class="flex-1 flex flex-col input-container"
    :class="{ error: errors.length }"
  >
    <label for="city" class="mb-0">{{ label }}</label>

    <select
      :id="name"
      :value="modelValue"
      :tabindex="tabindex"
      :name="name"
      v-bind="$attrs"
      :disabled="disabled"
      :class="{ 'text-gray-400': disabled }"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    >
      <option value="">
        {{ placeholder }}
      </option>
      <option
        v-for="[key, value] in Object.entries(optionslist)"
        :key="key"
        :value="key"
      >
        {{ value }}
      </option>
    </select>
    <FormError v-if="errors.length" :errors="errors" />
  </div>
</template>
