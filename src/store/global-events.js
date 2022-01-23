import { defineStore } from "pinia"

export const useEvents = defineStore("global-events", {
  state: () => ({
    active: new Set(),
  }),
})
