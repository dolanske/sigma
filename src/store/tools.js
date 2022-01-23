import { defineStore } from "pinia"

export const toolBox = [
  {
    id: "tool-cursor",
    name: "Cursor",
    icon: "./src/assets/icons/icon-tools-cursor.svg",
    config: {},
  },
  {
    id: "tool-rect",
    name: "Rectangle",
    icon: "./src/assets/icons/icon-tools-shape.svg",
    config: {},
  },
  {
    id: "tool-line",
    name: "Line",
    icon: "./src/assets/icons/icon-tools-line.svg",
    config: {},
  },
  {
    id: "tool-text",
    name: "Text",
    icon: "./src/assets/icons/icon-tools-text.svg",
    config: {},
  },
]

export const useTools = defineStore("tools", {
  state: () => ({
    activeTool: "tool-cursor",
  }),
  // actions: {},
})
