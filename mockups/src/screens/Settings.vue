<!--
  Settings screen: the app settings. It has no sidebar, so it does not use
  SidebarLayout. From the top: a header with a "← Back" button and the title
  "Settings", then three sections: "Theme" (a "Dark" and a "Light" button),
  "Data file" (the path of the file with the data) and "About" (the app
  version, for example "Todify 0.1.0").
  Receives `theme` ("dark" or "light", default "dark"), `dataPath` (path of
  the data file) and `version` (app version). Holds no state of its own.
  Emits `theme` with "dark" or "light" when the matching button is clicked.
  Emits `back`, without a parameter, when "← Back" is clicked; the parent
  decides where the app goes.
  The button of the active theme is the primary variant, the other one is
  secondary. Both have the same padding, so nothing moves when the theme
  changes. A click only emits `theme`; the parent decides whether the theme
  changes.
  The data path is read-only and wraps inside the screen, so a long path
  never leaves the frame.
  Counterpart in the GUI: gui/src/screens/settings.rs.
-->

<script setup>
import Button from '../widgets/Button.vue';

defineProps({
  /** Active theme: "dark" or "light". */
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value),
  },
  /** Path of the data file, shown read-only. */
  dataPath: { type: String, required: true },
  /** App version, for example "0.1.0". */
  version: { type: String, required: true },
});

const emit = defineEmits(['theme', 'back']);
</script>

<template>
  <div class="settings">
    <div class="header">
      <Button variant="secondary" @click="emit('back')">← Back</Button>
      <span class="title">Settings</span>
    </div>
    <div class="sections">
      <div class="section">
        <span class="label">Theme</span>
        <div class="theme-buttons">
          <Button :variant="theme === 'dark' ? 'primary' : 'secondary'" @click="emit('theme', 'dark')">Dark</Button>
          <Button :variant="theme === 'light' ? 'primary' : 'secondary'" @click="emit('theme', 'light')">Light</Button>
        </div>
      </div>
      <div class="section">
        <span class="label">Data file</span>
        <span class="data-path">{{ dataPath }}</span>
      </div>
      <div class="section">
        <span class="label">About</span>
        <span class="about">Todify {{ version }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--screen-header-gap);
  padding: var(--window-padding);
  background: var(--color-window);
  overflow-y: auto;
  overflow-x: hidden;
}

.header {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--button-gap);
}

.title {
  font-size: var(--font-size-screen-title);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.sections {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--settings-section-gap);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--settings-label-gap);
}

/* Same look as the column names in the Table widget. */
.label {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.theme-buttons {
  display: flex;
  flex-direction: row;
  gap: var(--button-gap);
}

.data-path {
  overflow-wrap: anywhere;
  font-size: var(--font-size-body);
  color: var(--color-text);
}

.about {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}
</style>
