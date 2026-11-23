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
  "--color-danger-button",
  "--color-danger-button-hover",
  "--color-danger-button-text",
  "--color-warning-text",
  "--color-warning-background",
  "--color-backdrop",
  "--color-shadow",
];

const isDark = ref(false);
const values = ref({});

// Reads the current value of every color token from <html>.
function readValues() {
  const style = getComputedStyle(document.documentElement);
  const next = {};
  for (const name of COLOR_TOKENS) {
    next[name] = style.getPropertyValue(name).trim();
  }
  values.value = next;
}

function toggleTheme() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  readValues();
}

onMounted(readValues);
</script>

<template>
  <div class="page">
    <button class="button primary" @click="toggleTheme">Light / Dark</button>

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
      <div class="text-sample small">--font-size-small: The quick brown fox</div>
      <div class="text-sample normal">--font-size-normal: The quick brown fox</div>
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
            <button class="button primary">Cancel</button>
            <button class="button danger">Delete</button>
          </div>
        </div>

        <div class="toast">Could not save changes.</div>
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
  font-weight: var(--font-weight-bold);
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
.small {
  font-size: var(--font-size-small);
}

.normal {
  font-size: var(--font-size-normal);
}

.dialog-title {
  font-size: var(--font-size-dialog-title);
  font-weight: var(--font-weight-bold);
}

.screen-title {
  font-size: var(--font-size-screen-title);
  font-weight: var(--font-weight-bold);
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
  border: var(--border-width) solid var(--color-border);
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
  font-size: var(--font-size-normal);
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
  padding: var(--row-padding-y) var(--row-padding-x);
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
  font-weight: var(--font-weight-bold);
}

.toast {
  width: var(--toast-width);
  padding: var(--toast-padding);
  background: var(--color-warning-background);
  color: var(--color-warning-text);
  border-radius: var(--toast-radius);
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur)
    var(--color-shadow);
}
</style>
