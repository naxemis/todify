<!--
  Dropdown widget: a drop-down list for choosing one option. A field shows the
  selected label and an arrow; the menu with the options appears below it.
  Receives `options` (`{ id, label }` items, in display order), `selectedId`
  (id of the selected option, or null), `placeholder` (shown when nothing is
  selected) and `open` (whether the menu is shown). Holds no state of its own.
  Emits `select` with the id of the clicked menu option; the parent decides
  what is selected. Clicking the field emits nothing.
  In Iced the `pick_list` keeps the open state itself and the app only gets
  the chosen option. The `open` prop exists only so the preview can show both
  states.
  The menu lies over the content right below the field and does not move the
  layout. This is the only departure from flexbox (`position: absolute`), like
  the layer in OverlayPreview.vue, because the menu is an overlay in Iced.
  While open, the field and the menu join into one block: the field's bottom
  corners and the menu's top corners are square, and the two borders overlap.
  Iced has a single highlight color in the menu: it marks both the selected
  option and the one under the cursor.
  Edge cases: nothing selected shows the placeholder in the secondary color,
  and labels stay on one line and are clipped without an ellipsis (the arrow
  is always visible).
  Counterpart in the GUI: pick_list styled in gui/src/widgets/dropdown.rs.
-->

<script setup>
defineProps({
  /** @type {import('vue').PropType<{ id: string, label: string }[]>} */
  options: { type: Array, required: true },
  /** Id of the selected option, or null when nothing is selected. */
  selectedId: { type: String, default: null },
  /** Shown in the field when nothing is selected. */
  placeholder: { type: String, default: 'Select…' },
  /** Preview only: whether the menu is shown. */
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['select']);
</script>

<template>
  <div class="dropdown">
    <div class="field" :class="{ open }">
      <span v-if="selectedId !== null" class="value">
        {{ options.find((option) => option.id === selectedId)?.label }}
      </span>
      <span v-else class="value placeholder">{{ placeholder }}</span>
      <span class="arrow">▾</span>
    </div>
    <div v-if="open" class="menu">
      <div
        v-for="option in options"
        :key="option.id"
        class="option"
        :class="{ selected: option.id === selectedId }"
        @click="emit('select', option.id)"
      >
        <span class="label">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  width: var(--dropdown-width);
}

.field {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--dropdown-handle-gap);
  height: var(--row-height);
  padding: 0 var(--row-padding-x);
  background: var(--color-panel);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--dropdown-radius);
  cursor: pointer;
}

/* Open: the field and the menu form one block, so the field's bottom corners are square. */
.field.open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.value {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-body);
  color: var(--color-text);
}

.placeholder {
  color: var(--color-text-secondary);
}

.arrow {
  flex-shrink: 0;
  color: var(--color-text-secondary);
}

/* Overlay: lies over the content below the field, so it takes no layout space.
   It starts one border width higher, so its top border covers the field's
   bottom border and the seam is a single line. The top corners are square
   to join the field. */
.menu {
  position: absolute;
  top: calc(100% - var(--border-width));
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  border: var(--border-width) solid var(--color-border);
  border-radius: 0 0 var(--dropdown-radius) var(--dropdown-radius);
  overflow: hidden;
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur) var(--color-shadow);
}

.option {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: var(--row-height);
  padding: 0 var(--row-padding-x);
  background: transparent;
  cursor: pointer;
}

/* One highlight color for the selected option and the one under the cursor, as in Iced. */
.option.selected,
.option:hover {
  background: var(--color-row-selected);
}

.label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-body);
  color: var(--color-text);
}
</style>
