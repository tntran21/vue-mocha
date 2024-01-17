<template>
  <label :for="id" class="ui-label" @click="onClick">
    <span v-if="required" class="asterisk">*</span>
    <!-- @slot -->
    <slot></slot>
  </label>
</template>

<!-- Component UiLabel: <UiLabel /> -->
<script lang="ts" setup>
interface Props {
  id?: string;
  label?: string;
  required?: boolean;
}
withDefaults(defineProps<Props>(), {
  id: "",
  label: "",
  required: false,
});

const emit = defineEmits<{
  click: [e: unknown];
}>();

const onClick = (e: unknown) => emit("click", e);
</script>
<style lang="scss" scoped>
.ui-label {
  display: inline-block;
  text-align: right;
}
</style>
