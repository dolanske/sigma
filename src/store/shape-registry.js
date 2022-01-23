import { defineStore } from "pinia"
import { v4 } from "uuid"

// Default shape struct
const shape = {
  id: null,
  transform: { left: 0, top: 0, width: 0, height: 0 },
  // optional style attributes
  style: {
    // Default style
    backgroundColor: "rgb(22,22,22)",
    // ... any HTMLElement style object can be here
  },
  meta: {
    // Name visible in the layer list
    name: "",
    // Type: Must be exactly same as .vue component name, eg.: Rect.vue
    type: "",
    // Sets if shape is visible in the canvas
    visible: true,
    // Sets if shape can be moved or updated
    locked: false,
    // If shape is being currently edited, only one shape can be edited at any given time
    editing: false,
  },
}

export const useShapeRegistry = defineStore("shape-registry", {
  state: () => ({
    // Stores all shapes in the board
    shapes: new Map(),
  }),
  actions: {
    /**
     * Creates a new shape of the selected type
     *
     * @param {String} type
     * @param {Number} left
     * @param {Number} top
     * @param {Number} width
     * @param {Number} height
     */
    addShape(type, left, top, width, height) {
      const id = v4()

      this.shapes.set(id, {
        ...Object.assign(shape, {
          id,
          transform: { left, top, width, height },
          meta: {
            name: `${type} - ${this.shapes.size + 1}`,
            type,
          },
        }),
      })
    },
    /**
     * Updates shape
     *
     * @param {Object} data
     */
    updateShape(data) {
      this.shapes.set(data.id, data)
    },
    /**
     * Deletes shape
     *
     * @param {String} id
     */
    deleteShape(id) {
      this.shapes.delete(id)
    },
  },
  getters: {
    getShape: (state) => (id) => state.shapes.get(id),
  },
})
