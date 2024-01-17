<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <UserForm :user="user" mode="edit" />
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
    const user = ref(
      new UserDto({
        id: "1",
        name: "John Doe",
        email: "aeffe",
        code: "3",
      }),
    );

    watch(user.value, (newVal) => {
      console.log(newVal);
    });

    return { user };
  },
});
</script>
