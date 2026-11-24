<!--
  List screen: the view of one list. The Sidebar with all lists on the left, and
  on the right the name of the selected list above its kanban board (Table).
  Built on SidebarLayout.
  Receives `lists` (all lists, in display order) and `selectedId` (id of the
  selected list, or null). Emits `select` (id of the clicked list), `delete` (id
  of the list whose "×" was clicked), `home` and `settings` (no parameter), each
  forwarded from SidebarLayout unchanged. The screen has no state of its own:
  the parent decides what is selected.
  The screen finds the selected list by `selectedId` in `lists`. When nothing is
  selected, or the id matches no list, it shows an empty state: "Select a list
  from the sidebar".
  Scrolling of the board is handled by Table; the header stays in place.
  Edge cases: a long list name stays on one line and is clipped without an
  ellipsis; a list without columns shows "No columns yet" (from Table); a column
  without cards shows "No cards" (from Table); many cards scroll inside their
  column only.
  Counterpart in the GUI: gui/src/screens/list.rs.
-->

<script setup>
import { computed } from 'vue';
import SidebarLayout from './SidebarLayout.vue';
import Table from '../widgets/Table.vue';

const props = defineProps({
  /** @type {import('vue').PropType<import('../fixtures/model.js').List[]>} */
  lists: { type: Array, required: true },
  /** Id of the selected list, or null when nothing is selected. */
  selectedId: { type: Number, default: null },
});

const emit = defineEmits(['select', 'delete', 'home', 'settings']);

/** The list whose id is `selectedId`, or null when there is none. */
const selectedList = computed(() => props.lists.find((list) => list.id === props.selectedId) ?? null);
</script>

<template>
  <SidebarLayout
    :lists="lists"
    :selected-id="selectedId"
    @select="emit('select', $event)"
    @delete="emit('delete', $event)"
    @home="emit('home')"
    @settings="emit('settings')"
  >
    <template v-if="selectedList">
      <div class="header">{{ selectedList.name }}</div>
      <div class="board">
        <Table :list="selectedList" />
      </div>
    </template>
    <div v-else class="empty">Select a list from the sidebar</div>
  </SidebarLayout>
</template>

<style scoped>
/* Bottom padding is 0: the gap to the board comes from the top padding of Table. */
.header {
  box-sizing: border-box;
  flex-shrink: 0;
  padding: var(--window-padding) var(--window-padding) 0;
  font-size: var(--font-size-screen-title);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
}

/* Table fills its parent, so this wrapper takes the rest of the height. */
.board {
  flex: 1;
  min-height: 0;
  display: flex;
}

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}
</style>
