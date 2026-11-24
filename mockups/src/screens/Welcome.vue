<!--
  Welcome screen: the first screen of the app. It is shown at startup, while
  `App` loads the lists from disk (`Screen::Welcome`). It has no sidebar, so it
  does not use SidebarLayout. From the top: the title "Todify", a tagline and
  the action area, all centered in both directions.
  Receives `loading` (default false): when true, the action area shows the
  caption "Loading lists…"; when false, it shows the "Open lists" button.
  Holds no state of its own. Emits `continue`, without a parameter, when the
  button is clicked; the parent decides what happens next. The parent also
  decides when loading ends: the screen only reflects the `loading` it is given.
  The action area has a fixed height, so the title and the tagline do not move
  between the two states.
  Counterpart in the GUI: gui/src/screens/welcome.rs.
-->

<script setup>
import Button from '../widgets/Button.vue';

defineProps({
  /** True while the lists are being loaded from disk. */
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['continue']);
</script>

<template>
  <div class="welcome">
    <h1 class="title">Todify</h1>
    <div class="tagline">Lists, columns and cards, saved on your computer.</div>
    <div class="action">
      <span v-if="loading" class="loading">Loading lists…</span>
      <Button v-else variant="primary" @click="emit('continue')">Open lists</Button>
    </div>
  </div>
</template>

<style scoped>
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--dialog-gap);
  background: var(--color-window);
  text-align: center;
}

.title {
  margin: 0;
  font-size: var(--font-size-screen-title);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.tagline {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

/* Fixed height: the button and the caption occupy the same space. */
.action {
  height: var(--row-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}
</style>
