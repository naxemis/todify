<!--
  Temporary page for viewing widgets at their real sizes. The scene gallery
  from section 7 of mockups/PLAN.md will replace it.
-->

<script setup>
import {
  typicalLists,
  noLists,
  emptyList,
  noCards,
  longNames,
  manyLists,
  manyCards,
} from '../fixtures/index.js';
import Sidebar from '../widgets/Sidebar.vue';
import Table from '../widgets/Table.vue';

const sidebarCases = [
  { label: 'typicalLists', lists: typicalLists, selectedId: null },
  { label: 'typicalLists, selected', lists: typicalLists, selectedId: typicalLists[0].id },
  { label: 'noLists', lists: noLists, selectedId: null },
  { label: 'longNames, selected', lists: longNames, selectedId: longNames[0].id },
  { label: 'manyLists, selected', lists: manyLists, selectedId: manyLists[0].id },
];

const tableCases = [
  { label: 'typicalLists, first list', list: typicalLists[0] },
  { label: 'emptyList', list: emptyList[0] },
  { label: 'noCards', list: noCards[0] },
  { label: 'longNames', list: longNames[0] },
  { label: 'manyCards', list: manyCards[0] },
];

/** @param {number} id */
function onSelect(id) {
  console.log('select', id);
}

/** @param {number} id */
function onDelete(id) {
  console.log('delete', id);
}
</script>

<template>
  <div class="page">
    <section class="section">
      <h2 class="heading">Sidebar</h2>
      <div class="sidebar-row">
        <div v-for="item in sidebarCases" :key="item.label" class="case">
          <span class="caption">{{ item.label }}</span>
          <div class="slot sidebar-slot">
            <Sidebar :lists="item.lists" :selected-id="item.selectedId" @select="onSelect" @delete="onDelete" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="heading">Table</h2>
      <div class="sidebar-row">
        <div v-for="item in tableCases" :key="item.label" class="case">
          <span class="caption">{{ item.label }}</span>
          <div class="slot table-slot">
            <Table :list="item.list" />
          </div>
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

.sidebar-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--button-gap);
}

.case {
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
}

.caption {
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}

/* Empty place for a widget. Scrolling is the widget's job, so overflow is hidden. */
.slot {
  height: var(--frame-height);
  background: var(--color-window);
  /* Outline takes no layout space, so the inside stays exactly the given size. */
  outline: var(--border-width) solid var(--color-border);
  overflow: hidden;
}

.sidebar-slot {
  width: var(--sidebar-width);
}

.table-slot {
  width: calc(var(--frame-width) - var(--sidebar-width));
}
</style>
