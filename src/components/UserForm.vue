<template>
  <div class="user-form text-left">
    <div class="user-form__field user-name flex align-start">
      <UiLabel id="name" required>Name</UiLabel>
      <UiInput
        id="name"
        v-model="userForm.name"
        :required="!readMode"
        :disabled="readMode"
        :error="errors?.name"
        :maxlength="25"
        style="width: 200px"
      />
    </div>
    <div class="user-form__field user-email">
      <UiLabel id="email" :required="!readMode" :disabled="readMode">Email</UiLabel>
      <UiInput id="email" v-model="userForm.email" :disabled="readMode" :error="errors?.email" style="width: 200px" />
    </div>
    <div class="user-form__field user-position">
      <UiLabel :disabled="readMode">Position</UiLabel>
      <Dropdown
        v-model="userForm.code"
        :options="positionOptions"
        :required="!readMode"
        :disabled="readMode"
        option-label="name"
        option-value="id"
        style="width: 200px"
      />
    </div>
    <div class="user-form__field user-phone">
      <UiLabel id="phone">Phone</UiLabel>
      <UiInput
        id="phone"
        v-model="userForm.phone"
        :disabled="readMode"
        :maxlength="10"
        :error="errors?.phone"
        rule="0-9"
        style="width: 200px"
      />
    </div>
    <div class="user-form__field user-address">
      <UiLabel id="address">Address</UiLabel>
      <UiInput
        id="address"
        v-model="userForm.address"
        :disabled="readMode"
        :error="errors?.address"
        :maxlength="25"
        style="width: 200px"
      />
    </div>
  </div>
</template>

<!-- Component UserForm: <UserForm /> -->
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
import UiLabel from "@/ui/atoms/UiLabel.vue";
import UiInput from "@/ui/molecules/UiInput.vue";

import { IUser, UserDto } from "@/core/dto/userDto";
import { CodeDto } from "@/core/dto/codeDto";
import { EModeForm, TModeForm, EStatusCode } from "@/core/constants/appConstants";
import ApiService from "@/core/services/api.service";
import { ToastUtils } from "@/core/utils/toastUtils";

interface IProps {
  /** data use in form */
  user: UserDto;
  // Only use "view" | "edit in mode prop
  mode?: Extract<TModeForm, "view" | "edit">;
  errors?: {
    [key in keyof IUser]?: string;
  };
}
type IUserFormEmits = (e: "update:user", value: UserDto) => void;

// Defined default props
const props = withDefaults(defineProps<IProps>(), {
  mode: EModeForm.VIEW,
  errors: undefined,
});
// Defined emits
const emit = defineEmits<IUserFormEmits>();

/**
 * Logic handle
 * */
const positionOptions = ref<CodeDto[]>([]);
const userForm = ref<UserDto>({ ...props.user });

const readMode = computed(() => props.mode === EModeForm.VIEW);

/**
 * Get position code for dropdown position
 * @return CodeDto[]
 * */
const getPositionCode = async () => {
  await ApiService.GET("/codes")
    .then((res) => {
      if (res.status === EStatusCode.OK) positionOptions.value = res.data;
    })
    .catch((err) => {
      ToastUtils.error(err?.message);
    });
};

watch(
  () => props.user,
  (newVal) => {
    userForm.value = newVal;
  },
);

watch(userForm.value, (newVal) => {
  emit("update:user", newVal);
});

onMounted(async () => {
  await getPositionCode();
});
</script>

<style scoped lang="scss">
.user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  &__field {
    display: flex;
    align-items: flex-start;
  }

  .ui-label {
    width: 100px;
    margin-right: 1rem;
    margin-top: 1rem;
  }
}
</style>
