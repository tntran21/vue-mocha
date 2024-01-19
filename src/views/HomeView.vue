<template>
  <div class="home">
    <UserForm v-model:user="user" mode="view" />
    <div>Show: {{ user.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserForm from "@/components/UserForm.vue";
import { UserDto } from "@/core/dto/userDto";

export default defineComponent({
  name: "HomeView",
  components: {
    UserForm,
  },
  setup() {
    const user = ref<UserDto>({
      id: "1",
      name: "John Doe",
      email: "aeffe",
      code: "3",
      address: "",
      phone: "",
    });

    const errors = ref({
      name: "error fefeferw fae fefef  fef",
    });

    return { user, errors };
  },
});
</script>
