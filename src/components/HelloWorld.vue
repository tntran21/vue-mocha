<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Button>Button</Button>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";
import Button from "primevue/button";

interface Props {
  msg?: string;
}

withDefaults(defineProps<Props>(), {
  msg: "hello",
});
</script>
