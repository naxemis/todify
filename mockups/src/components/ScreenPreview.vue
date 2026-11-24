<!--
  Temporary page for viewing screens at the real window size. The scene gallery
  from section 7 of mockups/PLAN.md will replace it.

  The slot is the parent of a screen, and the screen fills it completely
  (`width` and `height` of 100%). That is what the window is to a screen in
  Iced: the screen takes the whole window and has no size of its own.
-->

<script setup>
/**
 * One group per screen.
 *
 * @typedef {Object} ScreenCase
 * @property {string} label - caption shown above the frame
 * @property {import('vue').Component} component - the screen to render
 * @property {Object} props - props passed to the screen
 *
 * @typedef {Object} ScreenGroup
 * @property {string} heading - the screen name, for example "Home"
 * @property {ScreenCase[]} cases - the states of that screen to show
 *
 * @type {ScreenGroup[]}
 */
const groups = [];

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
            <component :is="item.component" v-bind="item.props" />
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
