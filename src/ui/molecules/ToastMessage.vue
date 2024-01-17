<template>
  <Toast position="top-right" />
</template>

<!-- Common toast show: <ToastMessage /> -->
<script lang="ts" setup>
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ToastUtils } from "@/core/utils/toastUtils";
import { onMounted } from "vue";

onMounted(() => {
  const toast = useToast();
  ToastUtils.init(toast);
});
</script>
