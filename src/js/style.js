/**
 * Assigns given style object to the selected element
 *
 * @param {HTMLElement} el
 * @param {Object} style
 */

export const assignStyle = (el, style) => {
  if (el) el = Object.assign(el.style, style);
};
