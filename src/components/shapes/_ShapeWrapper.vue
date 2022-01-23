<script setup>
import { defineAsyncComponent, ref } from "vue";

const props = defineProps({ type: String, identifier: String });

const comp = defineAsyncComponent(() => import(`./${props.type}.vue`));
</script>

<template>
  <component v-if="comp" :is="comp" :id="props.identifier" />
</template>
