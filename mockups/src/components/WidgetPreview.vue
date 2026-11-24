<!--
  Temporary page for viewing widgets at their real sizes. The scene gallery
  from section 7 of mockups/PLAN.md will replace it.
-->

<script setup>
import { typicalLists } from '../fixtures/index.js';
import Sidebar from '../widgets/Sidebar.vue';

const firstListId = typicalLists[0].id;

/** @param {number} id */
function onSelect(id) {
  console.log('select', id);
}
</script>

<template>
  <div class="page">
    <section class="section">
      <h2 class="heading">Sidebar</h2>
      <div class="sidebar-row">
        <div class="slot sidebar-slot">
          <Sidebar :lists="typicalLists" :selected-id="null" @select="onSelect" />
        </div>
        <div class="slot sidebar-slot">
          <Sidebar :lists="typicalLists" :selected-id="firstListId" @select="onSelect" />
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="heading">Table</h2>
      <div class="slot table-slot"></div>
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
  gap: var(--button-gap);
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
