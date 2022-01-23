<script setup>
import { computed, onMounted, reactive, ref } from "vue"
import { useShapeRegistry } from "../../store/shape-registry"
import ShapeWrapper from "../shapes/_ShapeWrapper.vue"
import { useTools } from "../../store/tools"
import { useEvents } from "../../store/global-events"

const store = useShapeRegistry()
const tools = useTools()
const globalEvents = useEvents()

onMounted(() => {
  store.addShape("Rect", 100, 100, 200, 350)
})

// Adding new shape
const isMouseDown = ref(false)

const newShapeObject = { left: 0, top: 0, width: 0, height: 0 }
const newShape = reactive({ ...newShapeObject })

const events = {
  onMouseDown: (e) => {
    // console.log(e);
    isMouseDown.value = true
  },
  onMouseUp: (e) => {
    isMouseDown.value = false

    // If every property of the new shape is bigger than 0, proceed
    if (Object.values(newShape).every((val) => val > 0)) {
      const s = { ...newShape }
      store.addShape("Rect", s.left, s.top, s.width, s.height)
      Object.assign(newShape, newShapeObject)
    }
  },
  onMouseMove: (e) => {
    if (isMouseDown.value) {
      /**
       * This will be tricky, as what if the user crosses the initial X and Y coordinate?
       * In such case we have to begin to move the top & left variables again and calculate
       * width & height to make the rest of the shape not move
       */

      if (tools.activeTool === "tool-rect") {
        if (!newShape.left) newShape.left = e.clientX
        if (!newShape.top) newShape.top = e.clientY

        Object.assign(newShape, {
          width: e.clientX - newShape.left,
          height: e.clientY - newShape.top,
        })
      }
    }
  },
}
</script>

<template>
  <div
    class="canvas"
    @mousedown="events.onMouseDown($event)"
    @mousemove="events.onMouseMove($event)"
    @mouseup="events.onMouseUp($event)"
  >
    <ShapeWrapper
      v-for="shape in store.shapes"
      :key="shape[0]"
      :identifier="shape[0]"
      :type="shape[1].meta.type"
    />
  </div>
</template>
