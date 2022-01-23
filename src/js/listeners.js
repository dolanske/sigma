export function bindListeners(element, data) {
  Object.entries(data).map(([key, value]) => {
    element.addEventListener(key, (e) => value(e))
  })
}
