<!--
  Toast: a short warning that does not need a decision, for example that the
  lists were recovered from a backup. A row with a warning icon ("!") and the
  message text.
  Receives `message` (required). Holds no state of its own and emits no events;
  there is no close button. In the GUI the toast disappears by itself after a
  while; the mockup is static and stays visible. Only one toast is visible at
  a time; the queue of warnings belongs to `App`, not to the toast.
  The toast draws only its own box: the position on the screen belongs to the
  overlay layer, not to the toast.
  Edge cases: a long message wraps, including long paths without spaces, and
  the icon stays next to the first line of the text.
  Counterpart in the GUI: gui/src/overlays/toast.rs.
-->

<script setup>
defineProps({
  /** Text of the warning. */
  message: { type: String, required: true },
});
</script>

<template>
  <div class="toast">
    <div class="icon">!</div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<style scoped>
.toast {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--toast-icon-gap);
  width: var(--toast-width);
  padding: var(--toast-padding);
  background: var(--color-panel);
  border-radius: var(--toast-radius);
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur) var(--color-shadow);
}

/* Fixed square that never shrinks; the mark is centered on both axes. */
.icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--toast-icon-size);
  height: var(--toast-icon-size);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-warning-icon);
}

/* Takes the rest of the width; `min-width: 0` lets the flex item shrink so long words wrap. */
.message {
  flex: 1;
  min-width: 0;
  font-size: var(--font-size-body);
  color: var(--color-text);
  overflow-wrap: anywhere;
}
</style>
