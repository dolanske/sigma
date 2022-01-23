<script setup>
import { toolBox } from "../../store/tools"
import { useTools } from "../../store/tools"

const tools = useTools()
</script>

<template>
  <div class="toolbar">
    <button
      v-for="tool in toolBox"
      :key="tool.id"
      class="tool"
      :class="{ tool__active: tools.activeTool === tool.id }"
      @click="tools.activeTool = tool.id"
    >
      <div class="tool-icon-wrap">
        <img :src="tool.icon" />
      </div>
    </button>
  </div>
</template>
