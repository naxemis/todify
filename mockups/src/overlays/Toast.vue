<!--
  Toast: a short warning that does not need a decision, for example that the
  lists were recovered from a backup. A column: a first row with the title and
  a "×" button, and the message below it. There is no icon.
  Receives `title` and `message` (both required). Holds no state of its own.
  Emits `dismiss`, without a parameter, when the "×" button is clicked; the
  parent decides what happens next. In the GUI the toast also disappears by
  itself after a while; the mockup is static and stays visible. Only one toast
  is visible at a time; the queue of warnings belongs to `App`, not to the
  toast.
  The toast draws only its own box: the position on the screen belongs to the
  overlay layer, not to the toast.
  The width follows the widest line (title row or message), between
  `--toast-min-width` and `--toast-max-width`; past the maximum the text wraps.
  Edge cases: a long title and a long message wrap, including long paths
  without spaces; the "×" stays at the top right, level with the first line
  of the title.
  The "×" is the shared Button widget (secondary variant, compact). Compact
  means no padding, so the "×" is a plain line of text like the title and
  needs no offsets: every inset of the toast is --toast-padding.
  Counterpart in the GUI: gui/src/overlays/toast.rs.
-->

<script setup>
import Button from '../widgets/Button.vue';

defineProps({
  /** Title of the warning. */
  title: { type: String, required: true },
  /** Text of the warning. */
  message: { type: String, required: true },
});

const emit = defineEmits(['dismiss']);
</script>

<template>
  <div class="toast">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="close">
        <Button variant="secondary" compact @click="emit('dismiss')">×</Button>
      </div>
    </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<style scoped>
.toast {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--toast-gap);
  width: fit-content;
  min-width: var(--toast-min-width);
  max-width: var(--toast-max-width);
  padding: var(--toast-padding);
  background: var(--color-panel);
  border-radius: var(--toast-radius);
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur) var(--color-shadow);
}

/* The title and the "×" have the same line height, so aligning them to the
   top puts the "×" level with the first line of the title. In Iced: a row
   aligned to the top with spacing TOAST_CLOSE_GAP. */
.header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--toast-close-gap);
}

/* Takes the rest of the width; `min-width: 0` lets the flex item shrink so long words wrap. */
.title {
  flex: 1;
  min-width: 0;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  overflow-wrap: anywhere;
}

/* Never shrinks, so the "×" keeps its size next to a long title. */
.close {
  flex: none;
}

.message {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  overflow-wrap: anywhere;
}
</style>
