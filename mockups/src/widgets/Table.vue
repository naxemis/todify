<!--
  Table widget: a kanban board of one list. Columns sit side by side, each
  with its cards. It only displays the `list` prop: no state, no events.
  Counterpart in the GUI: gui/src/widgets/table.rs.
-->

<script setup>
defineProps({
  /** @type {import('vue').PropType<import('../fixtures/model.js').List>} */
  list: { type: Object, required: true },
});
</script>

<template>
  <div class="board">
    <div v-for="column in list.columns" :key="column.id" class="column">
      <div class="column-name">{{ column.name }}</div>
      <div v-for="card in column.cards" :key="card.id" class="card">
        <div class="card-name">{{ card.name }}</div>
        <div v-if="card.description !== ''" class="card-description">{{ card.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--board-column-gap);
  padding: var(--window-padding);
  background: var(--color-window);
}

.column {
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--board-column-width);
  display: flex;
  flex-direction: column;
  gap: var(--card-gap);
  padding: var(--board-column-padding);
  border-radius: var(--board-column-radius);
  background: var(--color-panel);
}

.column-name {
  overflow-wrap: anywhere;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--card-text-gap);
  padding: var(--card-padding-y) var(--card-padding-x);
  border-radius: var(--card-radius);
  background: var(--color-card);
}

.card-name {
  overflow-wrap: anywhere;
  font-size: var(--font-size-body);
  color: var(--color-text);
}

.card-description {
  overflow-wrap: anywhere;
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}
</style>
