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
  "--color-secondary-button-text",
  "--color-secondary-button-text-hover",
  "--color-danger-button",
  "--color-danger-button-hover",
  "--color-danger-button-text",
  "--color-toast-title",
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
        <div class="sidebar">
          <div class="row">Plain row</div>
          <div class="row hoverable">Hover me</div>
          <div class="row selected">Selected row</div>
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
</style>
