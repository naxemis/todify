<!--
  Sidebar widget: a "Home" button, the lists of the app (one row per list)
  and a "Settings" button. From the top: "Home", a separator, the lists, a
  separator, "Settings". The separators are `rule::horizontal` in Iced.
  Receives `lists` (all lists, in display order) and `selectedId` (id of the
  selected list, or null). Holds no state of its own. Emits `select` with the
  id of the clicked list; the parent decides what is selected. Emits `delete`
  with the id of the list whose "×" button was clicked (without `select`); the
  widget deletes nothing itself, the parent decides. Emits `home` and
  `settings`, both without a parameter, when the matching button is clicked.
  Only the area of the lists scrolls; the buttons and separators stay in
  place, and "Settings" is always at the very bottom.
  Edge cases: no lists shows a single non-interactive "No lists yet" row,
  names stay on one line and are clipped without an ellipsis (the "×" is
  always visible), and rows keep their full height while the lists area
  scrolls.
  Counterpart in the GUI: gui/src/widgets/sidebar.rs.
-->

<script setup>
defineProps({
  /** @type {import('vue').PropType<import('../fixtures/model.js').List[]>} */
  lists: { type: Array, required: true },
  /** Id of the selected list, or null when nothing is selected. */
  selectedId: { type: Number, default: null },
});

const emit = defineEmits(['select', 'delete', 'home', 'settings']);
</script>

<template>
  <div class="sidebar">
    <button class="secondary-button nav-button" type="button" @click="emit('home')">Home</button>
    <div class="separator"></div>
    <div class="lists">
      <div v-if="lists.length === 0" class="empty">No lists yet</div>
      <template v-else>
        <div
          v-for="list in lists"
          :key="list.id"
          class="row"
          :class="{ selected: list.id === selectedId }"
          @click="emit('select', list.id)"
        >
          <span class="name">{{ list.name }}</span>
          <button class="secondary-button delete" type="button" @click.stop="emit('delete', list.id)">×</button>
        </div>
      </template>
    </div>
    <div class="separator"></div>
    <button class="secondary-button nav-button" type="button" @click="emit('settings')">Settings</button>
  </div>
</template>

<style scoped>
.sidebar {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
  padding: var(--sidebar-padding);
  background: var(--color-sidebar);
  overflow: hidden;
}

/* The only scrolling part of the sidebar; min-height lets it shrink below its content. */
.lists {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
  overflow-y: auto;
  overflow-x: hidden;
}

/* Counterpart of rule::horizontal in Iced. */
.separator {
  flex-shrink: 0;
  height: var(--border-width);
  background: var(--color-border);
}

.empty {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: var(--row-height);
  padding: 0 var(--row-padding-x);
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}

.row {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: var(--row-height);
  /* No right padding: the delete button brings its own, so "×" sits at the same inset as the name. */
  padding: 0 0 0 var(--row-padding-x);
  border-radius: var(--row-radius);
  background: transparent;
  cursor: pointer;
}

/* Hover applies only to unselected rows, so selection wins regardless of rule order. */
.row:not(.selected):hover {
  background: var(--color-row-hover);
}

.row.selected {
  background: var(--color-row-selected);
}

.name {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-body);
  color: var(--color-text);
}

/* Secondary button: no background or border; hover changes only the text color. */
.secondary-button {
  padding: var(--button-padding-y) var(--button-padding-x);
  border: none;
  border-radius: var(--button-radius);
  background: transparent;
  color: var(--color-secondary-button-text);
  font-family: inherit;
  font-size: var(--font-size-body);
  line-height: var(--line-height);
  cursor: pointer;
}

.secondary-button:hover {
  color: var(--color-secondary-button-text-hover);
}

.delete {
  flex-shrink: 0;
}

.nav-button {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  text-align: left;
}
</style>
