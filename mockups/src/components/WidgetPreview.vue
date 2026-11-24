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
  themes,
} from '../fixtures/index.js';
import Button from '../widgets/Button.vue';
import Dropdown from '../widgets/Dropdown.vue';
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

const longLabel = 'NoSpacesAnywhere'.repeat(5);

const dropdownCases = [
  { label: 'closed', options: themes, selectedId: themes[0].id, open: false },
  { label: 'closed, nothing selected', options: themes, selectedId: null, open: false },
  { label: 'open', options: themes, selectedId: themes[0].id, open: true },
  {
    label: 'long label, open',
    options: [
      { id: 'long', label: longLabel },
      { id: 'short', label: 'Short' },
    ],
    selectedId: 'long',
    open: true,
  },
];

/** @param {string} variant */
function onButtonClick(variant) {
  console.log(`click ${variant}`);
}

/** @param {number} id */
function onSelect(id) {
  console.log('select', id);
}

/** @param {number} id */
function onDelete(id) {
  console.log('delete', id);
}

function onHome() {
  console.log('home');
}

function onSettings() {
  console.log('settings');
}

/** @param {string} id */
function onDropdownSelect(id) {
  console.log('dropdown', id);
}
</script>

<template>
  <div class="page">
    <section class="section">
      <h2 class="heading">Button</h2>
      <div class="sidebar-row">
        <Button variant="primary" @click="onButtonClick('primary')">Primary</Button>
        <Button variant="secondary" @click="onButtonClick('secondary')">Secondary</Button>
        <Button variant="danger" @click="onButtonClick('danger')">Danger</Button>
      </div>
      <div class="sidebar-row">
        <Button variant="primary" @click="onButtonClick('primary')">
          A very long label that must stay on a single line and never wrap, even when it is much wider than the page
        </Button>
      </div>
    </section>

    <section class="section">
      <h2 class="heading">Sidebar</h2>
      <div class="sidebar-row">
        <div v-for="item in sidebarCases" :key="item.label" class="case">
          <span class="caption">{{ item.label }}</span>
          <div class="slot sidebar-slot">
            <Sidebar
              :lists="item.lists"
              :selected-id="item.selectedId"
              @select="onSelect"
              @delete="onDelete"
              @home="onHome"
              @settings="onSettings"
            />
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

    <section class="section">
      <h2 class="heading">Dropdown</h2>
      <div class="sidebar-row">
        <div v-for="item in dropdownCases" :key="item.label" class="case">
          <span class="caption">{{ item.label }}</span>
          <div class="slot table-slot">
            <Dropdown
              :options="item.options"
              :selected-id="item.selectedId"
              :open="item.open"
              @select="onDropdownSelect"
            />
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
