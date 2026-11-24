<!--
  Sidebar widget: the lists of the app, one row per list.
  Receives `lists` (all lists, in display order) and `selectedId` (id of the
  selected list, or null). Holds no state of its own. Emits `select` with the
  id of the clicked list; the parent decides what is selected. Emits `delete`
  with the id of the list whose "×" button was clicked (without `select`); the
  widget deletes nothing itself, the parent decides.
  Counterpart in the GUI: gui/src/widgets/sidebar.rs.
-->

<script setup>
defineProps({
  /** @type {import('vue').PropType<import('../fixtures/model.js').List[]>} */
  lists: { type: Array, required: true },
  /** Id of the selected list, or null when nothing is selected. */
  selectedId: { type: Number, default: null },
});

const emit = defineEmits(['select', 'delete']);
</script>

<template>
  <div class="sidebar">
    <div
      v-for="list in lists"
      :key="list.id"
      class="row"
      :class="{ selected: list.id === selectedId }"
      @click="emit('select', list.id)"
    >
      <span class="name">{{ list.name }}</span>
      <button class="delete" type="button" @click.stop="emit('delete', list.id)">×</button>
    </div>
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
}

.row {
  box-sizing: border-box;
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
  font-size: var(--font-size-body);
  color: var(--color-text);
}

/* Secondary button: no background or border; hover changes only the text color. */
.delete {
  flex-shrink: 0;
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

.delete:hover {
  color: var(--color-secondary-button-text-hover);
}
</style>
