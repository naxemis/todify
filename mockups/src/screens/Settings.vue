<!--
  Settings screen: the app settings. It has no sidebar, so it does not use
  SidebarLayout. From the top: a header with a "← Back" button and the title
  "Settings", then three sections: "Theme" (a Dropdown with the themes),
  "Data file" (the path of the file with the data) and "About" (the app
  version, for example "Todify 0.1.0").
  Receives `theme` (id of the selected theme), `themes` (the list of
  `{ id, label }` themes, which comes from outside; the screen does not know
  them), `themeMenuOpen` (preview only, passed to the Dropdown's `open`),
  `dataPath` (path of the data file) and `version` (app version). Holds no
  state of its own.
  Emits `theme` with the id of the option chosen in the Dropdown.
  Emits `back`, without a parameter, when "← Back" is clicked; the parent
  decides where the app goes.
  A choice only emits `theme`; the parent decides whether the theme changes.
  The open menu lies over the "Data file" and "About" sections and does not
  move them; that is the Dropdown's behavior.
  The data path is read-only and wraps inside the screen, so a long path
  never leaves the frame.
  Counterpart in the GUI: gui/src/screens/settings.rs.
-->

<script setup>
import Button from '../widgets/Button.vue';
import Dropdown from '../widgets/Dropdown.vue';

defineProps({
  /** Id of the selected theme. */
  theme: { type: String, required: true },
  /**
   * Themes to choose from, in display order.
   * @type {import('vue').PropType<{ id: string, label: string }[]>}
   */
  themes: { type: Array, required: true },
  /** Preview only: whether the theme menu is shown. */
  themeMenuOpen: { type: Boolean, default: false },
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
        <Dropdown :options="themes" :selected-id="theme" :open="themeMenuOpen" @select="emit('theme', $event)" />
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
