<script setup>
/**
 *  This is an utility which follows the mouse
 */

import { useMouse } from "@vueuse/core"
import { computed, ref, reactive } from "vue"
import { bindListeners } from "../../js/listeners"
import { useEvents } from "../../store/global-events"
import { useTools } from "../../store/tools"

const tools = useTools()
const events = useEvents()

const { x, y } = useMouse()

const offsetY = 10
const offsetX = 14

const style = computed(() => ({
  left: x.value + offsetX + "px",
  top: y.value + offsetY + "px",
}))

// Selection
const isSelecting = ref(false)
const actionStyle = { left: 0, top: 0, width: 0, height: 0 }
const actionActive = reactive({ ...actionStyle })

bindListeners(document, {
  mousedown: (e) => {
    if (!events.active.has("dragging")) {
      isSelecting.value = true
    }
  },
  mouseup: (e) => {
    isSelecting.value = false
    Object.assign(actionActive, actionStyle)
  },
  mousemove: (e) => {
    if (isSelecting.value) {
      if (
        tools.activeTool === "tool-cursor" ||
        tools.activeTool === "tool-rect"
      ) {
        if (!actionActive.left) actionActive.left = e.clientX
        if (!actionActive.top) actionActive.top = e.clientY

        Object.assign(actionActive, {
          width: e.clientX - actionActive.left,
          height: e.clientY - actionActive.top,
        })
      }
    }
  },
})

const formatActionStyle = computed(() => ({
  left: actionActive.left + "px",
  top: actionActive.top + "px",
  width: actionActive.width + "px",
  height: actionActive.height + "px",
}))
</script>

<template>
  <div class="cursor" :style="style">
    <div class="cursor__coordinates">
      <strong
        >X<span>:{{ x }}</span></strong
      >

      <strong
        >Y<span>:{{ y }}</span></strong
      >
    </div>
  </div>

  <div
    class="cursor__action"
    :class="{}"
    v-if="isSelecting"
    :style="formatActionStyle"
  ></div>
</template>
