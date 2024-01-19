<template>
  <div class="home">
    <UserForm v-model:user="user" mode="edit" />
    <div>Show: {{ user.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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

    return { user };
  },
});
</script>
