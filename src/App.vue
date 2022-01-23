<script setup>
import { onMounted, ref } from "vue"
import CanvasVue from "./components/editor/Canvas.vue"
import ToolbarVue from "./components/editor/Toolbar.vue"
import CursorVue from "./components/editor/Cursor.vue"
</script>

<template>
  <div>
    <ToolbarVue />
    <CanvasVue />
    <CursorVue />
  </div>
</template>
