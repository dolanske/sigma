import { defineStore } from "pinia"

/**
 * API used to track selected shapes within the canvas.
 */

export const useSelect = defineStore("select", {
  state: () => ({
    selected: new Set(),
  }),
  // actions: {
  //   select(id) {
  //     this.selected.add(id)
  //   },
  //   deselect()
  // },
})
