<template>
  <div class="p-field" style="display: inline-block">
    <InputText
      v-model="modelVal"
      :class="[inputClass]"
      :readonly="readonly"
      :disabled="disabled"
      :style="inputStyle"
      :maxlength="maxlength"
      :tabindex="tabindex"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="error" style="text-align: left">
      <span class="error-message error">{{ error }}</span>
    </div>
  </div>
</template>

<!-- Component <UiInput /> -->
<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { ref, watch, nextTick, StyleValue } from "vue";

interface Props {
  modelValue?: string | null;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  inputStyle?: StyleValue;
  inputClass?: string;
  maxlength?: number;
  tabindex?: number;
  /**
   * @description
   * Regular expression to test the input value against.
   * - `0-9` - only numeric values are allowed.
   * - `a-z` - only lowercase letters are allowed.
   * - `0-9a-z` - only lowercase letters and numeric values are allowed.
   * - `0-9-` - only numeric values and dash are allowed.
   * - `123` - only the characters with codes 1, 2 and 3 are allowed.
   *
   * @default null
   */
  rule?: string | RegExp | null;
  error?: string;
}
const props = withDefaults(defineProps<Props>(), {
  error: "",
  modelValue: "",
  placeholder: "",
  readonly: false,
  disabled: false,
  maxlength: undefined,
  inputStyle: "",
  inputClass: "",
  tabindex: 0,
  rule: null,
});

// Emit events
const emit = defineEmits<{
  "update:modelValue": [e: string];
  input: [e: string];
  change: [e: string];
  focus: [e: Event];
  blur: [e: Event];
}>();

/**
 * --------- Block handle logic ---------
 */

/**
 * Generates a new input control based on the provided input.
 *
 * @param {string} input - The input to be controlled.
 * @return {string} - The controlled input.
 */
const inputControl = (input?: string | null) => {
  if (props.rule) {
    return input?.replace(new RegExp(`[^${props.rule}]+`, "g"), "") ?? "";
  }

  return input ?? "";
};

const INIT_VALUE = inputControl(props.modelValue);
const modelVal = ref(INIT_VALUE);
if (props.modelValue !== INIT_VALUE) {
  emit("update:modelValue", INIT_VALUE);
}

/**
 * @description
 * The handler for the `input` event.
 *
 * @param e - The event object.
 */

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  const controlledValue = inputControl(value);

  emit("update:modelValue", controlledValue);

  nextTick(() => {
    if (props.modelValue === modelVal.value) {
      emit("input", controlledValue);
    }
    modelVal.value = controlledValue;
  });
};

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = inputControl(target.value);
  emit("change", value);
};

const onFocus = (e: Event) => {
  emit("focus", e);
};

const onBlur = (e: Event) => {
  emit("blur", e);
};

watch(
  () => props.modelValue,
  (value) => {
    if (modelVal.value !== value) {
      modelVal.value = inputControl(value);
    }
  },
);
</script>

<style scoped lang="scss">
.p-field {
  display: inline-block;
  .error-message {
    padding-left: 5px;
    display: block;
    &.error {
      color: #ff0000;
    }
    &.warning {
      color: #ffd858;
    }
  }
}
.p-inputtext {
  width: 100%;
}
</style>
