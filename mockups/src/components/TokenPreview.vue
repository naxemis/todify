<script setup>
import { onMounted, ref } from "vue";

// Every --color- token from tokens.css, in one place.
const COLOR_TOKENS = [
  "--color-window",
  "--color-panel",
  "--color-sidebar",
  "--color-row-hover",
  "--color-row-selected",
  "--color-border",
  "--color-text",
  "--color-text-secondary",
  "--color-primary-button",
  "--color-primary-button-hover",
  "--color-primary-button-text",
  "--color-secondary-button",
  "--color-secondary-button-hover",
  "--color-secondary-button-text",
  "--color-danger-button",
  "--color-danger-button-hover",
  "--color-danger-button-text",
  "--color-warning-icon",
  "--color-backdrop",
  "--color-shadow",
];

const values = ref({});

// Reads the value of every color token from <html>, once, on mount.
onMounted(() => {
  const style = getComputedStyle(document.documentElement);
  const next = {};
  for (const name of COLOR_TOKENS) {
    next[name] = style.getPropertyValue(name).trim();
  }
  values.value = next;
});
</script>

<template>
  <div class="page">
    <section class="section">
      <h2 class="heading">Colors</h2>
      <div class="swatch-list">
        <div v-for="name in COLOR_TOKENS" :key="name" class="swatch-row">
          <div class="swatch" :style="{ background: `var(${name})` }"></div>
          <span>{{ name }}</span>
          <span class="secondary">{{ values[name] }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="heading">Text sizes</h2>
      <div class="text-sample caption">--font-size-caption: The quick brown fox</div>
      <div class="text-sample body">--font-size-body: The quick brown fox</div>
      <div class="text-sample dialog-title">--font-size-dialog-title: The quick brown fox</div>
      <div class="text-sample screen-title">--font-size-screen-title: The quick brown fox</div>
    </section>

    <section class="section">
      <h2 class="heading">Window frame</h2>
      <div class="frame">
        <div class="buttons">
          <button class="button primary">Save</button>
          <button class="button danger">Delete</button>
        </div>

        <div class="sidebar">
          <div class="row">Plain row</div>
          <div class="row hoverable">Hover me</div>
          <div class="row selected">Selected row</div>
        </div>

        <div class="dialog">
          <div class="dialog-title-text">Delete list?</div>
          <div>This action cannot be undone.</div>
          <div class="buttons">
            <button class="button secondary-button">Cancel</button>
            <button class="button danger">Delete</button>
          </div>
        </div>

        <div class="toast">
          <span class="toast-icon" aria-hidden="true"></span>
          <span>Could not save changes.</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--dialog-gap);
  padding: var(--window-padding);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--button-gap);
}

.heading {
  margin: 0;
  font-size: var(--font-size-dialog-title);
  font-weight: var(--font-weight-semibold);
}

.secondary {
  color: var(--color-text-secondary);
}

/* Colors */
.swatch-list {
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
}

.swatch-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--button-gap);
}

/* No swatch size token exists, so the row height is reused as a square. */
.swatch {
  width: var(--row-height);
  height: var(--row-height);
  border: var(--border-width) solid var(--color-border);
}

/* Text sizes */
.caption {
  font-size: var(--font-size-caption);
}

.body {
  font-size: var(--font-size-body);
}

.dialog-title {
  font-size: var(--font-size-dialog-title);
  font-weight: var(--font-weight-semibold);
}

.screen-title {
  font-size: var(--font-size-screen-title);
  font-weight: var(--font-weight-semibold);
}

/* Window frame */
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--dialog-gap);
  width: var(--frame-width);
  height: var(--frame-height);
  padding: var(--window-padding);
  background: var(--color-window);
  /* Outline takes no layout space, so the inside stays exactly 640x480. */
  outline: var(--border-width) solid var(--color-border);
  overflow: auto;
}

.frame > * {
  flex-shrink: 0;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: var(--button-gap);
}

.button {
  padding: var(--button-padding-y) var(--button-padding-x);
  border: none;
  border-radius: var(--button-radius);
  font-family: inherit;
  font-size: var(--font-size-body);
  line-height: var(--line-height);
  cursor: pointer;
}

.primary {
  background: var(--color-primary-button);
  color: var(--color-primary-button-text);
}

.primary:hover {
  background: var(--color-primary-button-hover);
}

.secondary-button {
  background: var(--color-secondary-button);
  color: var(--color-secondary-button-text);
}

.secondary-button:hover {
  background: var(--color-secondary-button-hover);
}

.danger {
  background: var(--color-danger-button);
  color: var(--color-danger-button-text);
}

.danger:hover {
  background: var(--color-danger-button-hover);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
  width: var(--sidebar-width);
  padding: var(--sidebar-padding);
  background: var(--color-sidebar);
}

.row {
  display: flex;
  align-items: center;
  height: var(--row-height);
  padding: 0 var(--row-padding-x);
  border-radius: var(--row-radius);
}

.hoverable:hover {
  background: var(--color-row-hover);
}

.selected {
  background: var(--color-row-selected);
}

.dialog {
  display: flex;
  flex-direction: column;
  gap: var(--dialog-gap);
  width: var(--dialog-width);
  padding: var(--dialog-padding);
  background: var(--color-panel);
  border-radius: var(--dialog-radius);
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur)
    var(--color-shadow);
}

.dialog-title-text {
  font-size: var(--font-size-dialog-title);
  font-weight: var(--font-weight-semibold);
}

.toast {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--toast-icon-gap);
  width: var(--toast-width);
  padding: var(--toast-padding);
  background: var(--color-panel);
  color: var(--color-text);
  border-radius: var(--toast-radius);
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur)
    var(--color-shadow);
}

/* The SVG only provides the shape; background-color provides the color,
   like Iced tints an svg widget with the color from its style. */
.toast-icon {
  flex-shrink: 0;
  width: var(--toast-icon-size);
  height: var(--toast-icon-size);
  background-color: var(--color-warning-icon);
  mask-image: url("/icons/alert-triangle.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
</style>
