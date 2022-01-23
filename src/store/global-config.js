import { defineStore } from "pinia"
import { reactive } from "vue"

export const useCanvas = defineStore("canvas", () => {
  const document = reactive({
    id: "",
    name: "",
    description: "",
    author: "",
    // Document specific saved state
    elements: [],
    colors: [],
  })

  const editorConfig = reactive({
    // Specific setting objects
    ruler: {
      use: false,
    },
  })

  const canvasConfig = reactive({
    coordinates: {
      use: true,
      // This template stores what kind of content shows when
      template: "x:{{x}} y:{{y}}",
    },
    // shape: {
    //   use: false,
    // }
  })

  const canvasConfig = reactive({
    size: {
      width: 10000,
      height: 10000,
    },
  })

  return {
    editorConfig,
    canvasConfig,
    document,
  }
})
