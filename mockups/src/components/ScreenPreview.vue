<!--
  Temporary page for viewing screens at the real window size. The scene gallery
  from section 7 of mockups/PLAN.md will replace it.

  The slot is the parent of a screen, and the screen fills it completely
  (`width` and `height` of 100%). That is what the window is to a screen in
  Iced: the screen takes the whole window and has no size of its own.
-->

<script setup>
import SidebarLayout from '../screens/SidebarLayout.vue';
import Home from '../screens/Home.vue';
import Welcome from '../screens/Welcome.vue';
import List from '../screens/List.vue';
import Settings from '../screens/Settings.vue';
import { typicalLists, noLists, emptyList, noCards, longNames, manyCards } from '../fixtures/index.js';

/**
 * One group per screen.
 *
 * @typedef {Object} ScreenCase
 * @property {string} label - caption shown above the frame
 * @property {import('vue').Component} component - the screen to render
 * @property {Object} props - props passed to the screen
 * @property {Object<string, Function>} [events] - emit name to handler, bound with v-on
 * @property {string} [slotText] - when set, rendered as placeholder content in the default slot
 *
 * @typedef {Object} ScreenGroup
 * @property {string} heading - the screen name, for example "Home"
 * @property {ScreenCase[]} cases - the states of that screen to show
 *
 * @type {ScreenGroup[]}
 */
const groups = [
  {
    heading: 'Sidebar layout',
    cases: [
      {
        label: 'typicalLists, first selected',
        component: SidebarLayout,
        props: { lists: typicalLists, selectedId: typicalLists[0].id },
        slotText: 'Screen content',
        events: {
          select: (id) => onEvent('select', id),
          delete: (id) => onEvent('delete', id),
          home: () => onEvent('home'),
          settings: () => onEvent('settings'),
        },
      },
    ],
  },
  {
    heading: 'Welcome',
    cases: [
      {
        label: 'loading',
        component: Welcome,
        props: { loading: true },
        events: { continue: () => onEvent('continue') },
      },
      {
        label: 'ready',
        component: Welcome,
        props: { loading: false },
        events: { continue: () => onEvent('continue') },
      },
    ],
  },
  {
    heading: 'Home',
    cases: [
      { label: 'typicalLists', lists: typicalLists },
      { label: 'noLists', lists: noLists },
      { label: 'typicalLists, read-only', lists: typicalLists, readOnly: true },
      { label: 'noLists, read-only', lists: noLists, readOnly: true },
    ].map(({ label, lists, readOnly }) => ({
      label,
      component: Home,
      props: { lists, readOnly },
      events: {
        select: (id) => onEvent('select', id),
        create: () => onEvent('create'),
        delete: (id) => onEvent('delete', id),
        home: () => onEvent('home'),
        settings: () => onEvent('settings'),
      },
    })),
  },
  {
    heading: 'List',
    cases: [
      { label: 'typicalLists, first selected', lists: typicalLists, selectedId: typicalLists[0].id },
      { label: 'typicalLists, nothing selected', lists: typicalLists, selectedId: null },
      { label: 'emptyList', lists: emptyList, selectedId: emptyList[0].id },
      { label: 'noCards', lists: noCards, selectedId: noCards[0].id },
      { label: 'longNames', lists: longNames, selectedId: longNames[0].id },
      { label: 'manyCards', lists: manyCards, selectedId: manyCards[0].id },
      {
        label: 'typicalLists, first selected, read-only',
        lists: typicalLists,
        selectedId: typicalLists[0].id,
        readOnly: true,
      },
      { label: 'longNames, read-only', lists: longNames, selectedId: longNames[0].id, readOnly: true },
    ].map(({ label, lists, selectedId, readOnly }) => ({
      label,
      component: List,
      props: { lists, selectedId, readOnly },
      events: {
        select: (id) => onEvent('select', id),
        delete: (id) => onEvent('delete', id),
        home: () => onEvent('home'),
        settings: () => onEvent('settings'),
      },
    })),
  },
  {
    heading: 'Settings',
    cases: [
      { label: 'dark', theme: 'dark', dataPath: '/home/user/.local/share/todify/lists.json' },
      { label: 'light', theme: 'light', dataPath: '/home/user/.local/share/todify/lists.json' },
      {
        label: 'long data path',
        theme: 'dark',
        dataPath: '/home/user/.local/share/todify/' + 'NoSpacesAnywhere'.repeat(5) + '/lists.json',
      },
    ].map(({ label, theme, dataPath }) => ({
      label,
      component: Settings,
      props: { theme, dataPath, version: '0.1.0' },
      events: {
        theme: (value) => onEvent('theme', value),
        back: () => onEvent('back'),
      },
    })),
  },
];

function onEvent(name, payload) {
  console.log(name, payload);
}
</script>

<template>
  <div class="page">
    <h2 class="heading">Screens</h2>
    <span v-if="groups.length === 0" class="caption">No screens yet</span>
    <template v-else>
      <section v-for="group in groups" :key="group.heading" class="section">
        <h3 class="heading">{{ group.heading }}</h3>
        <div v-for="item in group.cases" :key="item.label" class="case">
          <span class="caption">{{ item.label }}</span>
          <div class="slot">
            <component :is="item.component" v-bind="item.props" v-on="item.events ?? {}">
              <div v-if="item.slotText" class="placeholder">{{ item.slotText }}</div>
            </component>
          </div>
        </div>
      </section>
    </template>
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

.case {
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
}

.caption {
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}

/* Stand-in for a screen's content in the default slot. */
.placeholder {
  padding: var(--window-padding);
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}

/* The window stand-in: a screen placed inside fills it completely. */
.slot {
  width: var(--frame-width);
  height: var(--frame-height);
  background: var(--color-window);
  /* Outline takes no layout space, so the inside stays exactly the given size. */
  outline: var(--border-width) solid var(--color-border);
  overflow: hidden;
}
</style>
