<script setup>
import { computed, watch, reactive, ref, watchEffect } from "vue"
import { useDraggable, onClickOutside } from "@vueuse/core"
import { useShapeRegistry } from "../../store/shape-registry"
import { useSelect } from "../../store/select"
import { useEvents } from "../../store/global-events"

const registry = useShapeRegistry()
const select = useSelect()
const globalEvents = useEvents()
const props = defineProps({ id: String })

/**
 * Init properties
 */
const shape = computed({
  cache: false,
  get() {
    return registry.getShape(props.id)
  },
  set(data) {
    console.log(data)
    registry.updateShape(data)
  },
})

const self = ref(null)
const { x, y, isDragging } = useDraggable(self, {
  initialValue: { x: shape.value.transform.left, y: shape.value.transform.top },
})

watch(isDragging, (val) =>
  val
    ? globalEvents.active.add("dragging")
    : globalEvents.active.delete("dragging")
)

onClickOutside(self, () => {
  select.selected.delete(shape.id)
})

/**
 * Update
 */

watchEffect(() => {
  if (shape.value) {
    // Update position & sizing
    Object.assign(shape.value.transform, {
      left: x.value,
      top: y.value,
    })
  }
})

// Compute styles to assign to the HTML dom node
const style = computed(() => ({
  left: shape.value.transform.left + "px",
  top: shape.value.transform.top + "px",
  width: shape.value.transform.width + "px",
  height: shape.value.transform.height + "px",
  ...shape.value.style,
}))

/**
 * Handle events
 */
const handlers = reactive({
  isHover: false,
  isFocus: false,
})

const events = {
  onKeyDown: (e) => {
    console.log(e)
    if (e.code === "Escape") {
    }
  },
  onClick: (e) => {
    select.selected.add(shape.id)
  },
}
</script>

<template>
  <div
    class="shape shape-rect"
    :class="{
      'on-hover': handlers.isHover,
      'is-selected': select.selected.has(shape.id),
    }"
    :style="style"
    ref="self"
    @mouseenter="handlers.isHover = true"
    @mouseleave="handlers.isHover = false"
    @focus="handlers.isFocus = true"
    @blur="handlers.isFocus = false"
    @keydown="events.onKeydown($event)"
    @click="events.onClick($event)"
    @drag="events.onDrag($event)"
    @dragend="events.onDragend($event)"
  >
    <div class="shape-outline"></div>
  </div>
</template>
