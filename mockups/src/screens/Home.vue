<!--
  Home screen: shown when no list is selected. Built on SidebarLayout; the
  content is a header ("Lists" and a "New list" button) above a centered hint
  that tells the user to pick a list in the sidebar, with a summary of all
  lists under it (for example "4 lists · 9 columns · 11 cards"). The lists themselves are
  only in the sidebar.
  Receives `lists` (all lists, in display order) and `readOnly` (Boolean,
  default false; true when the app runs in read-only mode). Holds no state of
  its own.
  Emits `select` (id of the clicked sidebar item), `delete` (id of the list
  whose "×" was clicked), `home` and `settings` (no parameter), each forwarded
  from SidebarLayout unchanged. Emits `create` (no parameter) when "New list"
  or "Create your first list" is clicked. The screen deletes and creates
  nothing itself; the parent decides.
  Nothing is selected in the sidebar, because Home is not a list.
  Nothing scrolls on this screen; the lists scroll in the sidebar.
  Typing the name of a new list is out of scope: the screen only emits
  `create`.
  Edge cases: no lists hides "New list" from the header and shows the empty
  state "No lists yet" with a "Create your first list" button instead of the
  hint. In read-only mode the header shows a "Read-only" label instead of
  "New list", and the empty state has no button; one list, column or card uses the singular ("1 list", "1 column",
  "1 card"), and zero is plural ("0 columns").
  Counterpart in the GUI: gui/src/screens/home.rs.
-->

<script setup>
import Button from '../widgets/Button.vue';
import SidebarLayout from './SidebarLayout.vue';

defineProps({
  /** @type {import('vue').PropType<import('../fixtures/model.js').List[]>} */
  lists: { type: Array, required: true },
  /** True when the app runs in read-only mode: no list creation. */
  readOnly: { type: Boolean, default: false },
});

const emit = defineEmits(['select', 'create', 'delete', 'home', 'settings']);

/** "<n> <singular>" for 1, "<n> <plural>" otherwise (0 is plural). */
function count(n, singular, plural) {
  return `${n} ${n === 1 ? singular : plural}`;
}

/** "<n> list(s) · <m> column(s) · <k> card(s)" for all lists. */
function summary(lists) {
  const columns = lists.reduce((total, list) => total + list.columns.length, 0);
  const cards = lists.reduce(
    (total, list) => total + list.columns.reduce((sum, column) => sum + column.cards.length, 0),
    0,
  );
  return [
    count(lists.length, 'list', 'lists'),
    count(columns, 'column', 'columns'),
    count(cards, 'card', 'cards'),
  ].join(' · ');
}
</script>

<template>
  <SidebarLayout
    :lists="lists"
    :selected-id="null"
    @select="emit('select', $event)"
    @delete="emit('delete', $event)"
    @home="emit('home')"
    @settings="emit('settings')"
  >
    <div class="content">
      <div class="header">
        <span class="title">Lists</span>
        <span v-if="readOnly" class="read-only">Read-only</span>
        <Button v-else-if="lists.length > 0" variant="primary" @click="emit('create')">New list</Button>
      </div>
      <div v-if="lists.length > 0" class="empty">
        <span class="hint">Select a list in the sidebar to start working</span>
        <span class="empty-text">{{ summary(lists) }}</span>
      </div>
      <div v-else class="empty">
        <span class="empty-text">No lists yet</span>
        <Button v-if="!readOnly" variant="primary" @click="emit('create')">Create your first list</Button>
      </div>
    </div>
  </SidebarLayout>
</template>

<style scoped>
/* min-height lets the rows area shrink below its content and scroll. */
.content {
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--screen-header-gap);
  padding: var(--window-padding);
}

.header {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--screen-header-item-gap);
}

.title {
  flex: 1;
  font-size: var(--font-size-screen-title);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.read-only {
  flex-shrink: 0;
  white-space: nowrap;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  color: var(--color-read-only);
}

/* Centered block under the header: the hint with the summary, or the empty state. */
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--empty-state-gap);
}

.hint {
  font-size: var(--font-size-body);
  color: var(--color-text);
}

.empty-text {
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}
</style>
