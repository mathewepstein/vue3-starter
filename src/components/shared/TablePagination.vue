<script setup>
const { t } = useI18n()

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  showPage: {
    type: Number,
    required: true,
  },
  showPerPage: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits([
  'update:showPage',
  'update:showPerPage',
  'update:sortOrder',
  'update:sortBy',
])

const paginationCenterPt = computed(() => {
  if (props.showPage > 3) {
    if (props.showPage > props.totalPages - 3) {
      return props.totalPages - 4
    }
    return props.showPage
  } else {
    return 3
  }
})
</script>

<template>
  <div class="flex justify-between">
    <ul class="pagination">
      <li class="inline">
        [
        <span
          class="text-primary cursor-pointer"
          @click="emits('update:showPage', 0)"
          >First</span
        ><template v-if="showPage > 0">
          /
          <span
            class="text-primary cursor-pointer"
            @click="emits('update:showPage', showPage - 1)"
            >Previous</span
          >
        </template>
        ]
      </li>
      <li v-if="totalPages > 0" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt - 3 }"
          @click="emits('update:showPage', paginationCenterPt - 3)"
          >{{ paginationCenterPt - 2 }}</span
        >
      </li>
      <li v-if="totalPages > 1" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt - 2 }"
          @click="emits('update:showPage', paginationCenterPt - 2)"
          >{{ paginationCenterPt - 1 }}</span
        >
      </li>
      <li v-if="totalPages > 2" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt - 1 }"
          @click="emits('update:showPage', paginationCenterPt - 1)"
          >{{ paginationCenterPt }}</span
        >
      </li>
      <li v-if="totalPages > 3" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt }"
          @click="emits('update:showPage', paginationCenterPt)"
          >{{ paginationCenterPt + 1 }}</span
        >
      </li>
      <li v-if="totalPages > 4" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt + 1 }"
          @click="emits('update:showPage', paginationCenterPt + 1)"
          >{{ paginationCenterPt + 2 }}</span
        >
      </li>
      <li v-if="totalPages > 5" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt + 2 }"
          @click="emits('update:showPage', paginationCenterPt + 2)"
          >{{ paginationCenterPt + 3 }}</span
        >
      </li>
      <li v-if="totalPages > 6" class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPage === paginationCenterPt + 3 }"
          @click="emits('update:showPage', paginationCenterPt + 3)"
          >{{ paginationCenterPt + 4 }}</span
        >
      </li>
      <li class="inline pl-1">
        [
        <template v-if="showPage < totalPages - 1">
          <span
            class="text-primary cursor-pointer"
            @click="emits('update:showPage', showPage + 1)"
            >Next</span
          >
          / </template
        ><span
          class="text-primary cursor-pointer"
          @click="emits('update:showPage', totalPages - 1)"
          >Last</span
        >
        ]
      </li>
    </ul>
    <slot />
    <ul>
      <li class="inline">{{ t('member.settings.recordsPerPage') }}</li>
      <li class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPerPage === 100 }"
          @click="emits('update:showPerPage', 100)"
          >100</span
        >
      </li>
      <li class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPerPage === 50 }"
          @click="emits('update:showPerPage', 50)"
          >50</span
        >
      </li>
      <li class="inline pl-1">
        <span
          class="text-primary cursor-pointer"
          :class="{ active: showPerPage === 25 }"
          @click="emits('update:showPerPage', 25)"
          >25</span
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.active {
  @apply font-bold underline;
}
</style>
