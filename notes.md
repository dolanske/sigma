# Notes

This file serves as a to-do list and general notes of how certain things should be implemented.

## General

### Settings sidebar

Click a button for a fly-in sidebar with settings. This state gets saved to local-storage.

- [ ] Show coordinates on cursor always
- [ ] Show ruler
- [ ] Show & set grid

### Cursor

- Follows the mouse, pointer-events none

- [ ] When draving the rectangle, shows the coordinates
- [ ] Selection & drawing a new rectangle use the same stretching div.

  - [ ] When drawing a recntangle, show width & height on it's sides

- [ ] When creating a shape, snap to grid ()

Consider

- [ ] Should the cursor change to the icon of the tool it's using?

### Document settings

- [ ] Figure out a way to serialize the whole canvas to localStorage
- [ ] Add document object to store metadata etc.
