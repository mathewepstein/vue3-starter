<script setup>
const emits = defineEmits(['update:modelValue', 'changed'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tabindex: {
    type: Number,
  },
  v: {
    type: Object,
    required: true,
  },
})

onMounted(async () => {
  if (props.autofocus) document.getElementById(props.name).focus()
})

const getErrorMsg = (err) => {
  if (err) {
    if (err.$params.msg) return err.$params.msg
    if (err.$message) return err.$message
  }
}

const errors = computed(() => {
  return props.v.$errors.slice(0, 1)
})

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) emits('changed')
  }
)
</script>

<template>
  <div :class="{ 'form-error': errors.length > 0 }">
    <label :for="name" class="flex gap-0.6rem">
      <input
        :id="name"
        :checked="modelValue"
        type="checkbox"
        :name="name"
        :tabindex="tabindex"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="flex-1"><slot /></span>
    </label>
    <FormError :message="getErrorMsg(errors[0])" />
  </div>
</template>
