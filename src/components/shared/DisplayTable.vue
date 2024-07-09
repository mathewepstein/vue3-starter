<script setup>
const { t } = useI18n()

const props = defineProps({
  source: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="relative">
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :width="column.width"
            class="text-left"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="source.length > 0">
        <tr v-for="(item, index) in source" :key="index">
          <td
            v-for="column in columns"
            :key="`item-${column.name}`"
            :label="column.name"
            :class="[column.classes]"
            :data-value="item[column.key]"
          >
            <div v-if="column.html" v-html="item[column.key]" />
            <template v-else>
              {{ item[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" :colspan="columns.length">
            <slot>{{ t('member.settings.noDataFound') }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
