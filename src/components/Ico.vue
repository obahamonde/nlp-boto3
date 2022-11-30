<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps({
  icon: {
    type: String,
    required: true,
  },
  class:{
    type: String,
    default: '',
  }
});
</script>
<template>
<Icon :icon="icon" :class="class" />
</template>
