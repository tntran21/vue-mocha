<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <UserForm :user="user" mode="view" />
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
    const user = ref(
      new UserDto({
        id: "1",
        name: "John Doe",
        email: "aeffe",
        code: "3",
      }),
    );

    return { user };
  },
});
</script>
