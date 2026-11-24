<!--
  Screen layout: the Sidebar on the left and the content of the screen on the
  right. Home, List and Settings wrap their content in it.
  Receives `lists` (all lists, in display order) and `selectedId` (id of the
  selected list, or null) and passes both to the Sidebar unchanged. Emits
  `select` (id of the clicked list), `delete` (id of the list whose "×" was
  clicked), `home` and `settings` (no parameter), each forwarded from the
  Sidebar with the same payload. Holds no state of its own.
  The content arrives through the default slot and decides by itself what
  scrolls inside it; the layout scrolls nothing.
  Counterpart in the GUI: a helper in gui/src/screens.rs.
-->

<script setup>
import Sidebar from '../widgets/Sidebar.vue';

defineProps({
  /** @type {import('vue').PropType<import('../fixtures/model.js').List[]>} */
  lists: { type: Array, required: true },
  /** Id of the selected list, or null when nothing is selected. */
  selectedId: { type: Number, default: null },
});

const emit = defineEmits(['select', 'delete', 'home', 'settings']);
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <Sidebar
        :lists="lists"
        :selected-id="selectedId"
        @select="emit('select', $event)"
        @delete="emit('delete', $event)"
        @home="emit('home')"
        @settings="emit('settings')"
      />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

/* The Sidebar fills its parent, so this wrapper sets its size. */
.sidebar {
  flex-shrink: 0;
  width: var(--sidebar-width);
  height: 100%;
}

/* No padding here: each screen sets its own. min-width lets it shrink below its content. */
.content {
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-window);
}
</style>
