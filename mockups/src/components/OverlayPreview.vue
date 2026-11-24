<!--
  Temporary page for viewing overlays at their real sizes. The scene gallery
  from section 7 of mockups/PLAN.md will replace it.

  Each slot imitates the overlay layer: a placeholder screen at the bottom and
  a layer on top of it. In Iced this is `stack!` with the screen below and
  `opaque(center(dialog))` with the backdrop above. Here the layer is absolutely
  positioned over the slot, the only departure from flexbox, because `stack!`
  has no flex equivalent.
-->

<template>
  <div class="page">
    <section class="section">
      <h2 class="heading">Dialog</h2>
      <div class="case">
        <span class="caption">placeholder</span>
        <div class="slot">
          <div class="screen">Screen</div>
          <div class="layer layer-dialog">
            <!-- Placeholder: a later step replaces it with the real dialog component. -->
            <span class="placeholder">Dialog goes here</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="heading">Toast</h2>
      <div class="case">
        <span class="caption">placeholder</span>
        <div class="slot">
          <div class="screen">Screen</div>
          <div class="layer layer-toast">
            <!-- Placeholder: a later step replaces it with the real toast component. -->
            <span class="placeholder">Toast goes here</span>
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

.case {
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-item-gap);
}

.caption {
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}

/* Empty place for an overlay. It is the positioning context of the layer. */
.slot {
  position: relative;
  width: var(--frame-width);
  height: var(--frame-height);
  background: var(--color-window);
  /* Outline takes no layout space, so the inside stays exactly the given size. */
  outline: var(--border-width) solid var(--color-border);
  overflow: hidden;
}

/* Stand-in for a real screen, so the backdrop has something to dim. */
.screen {
  padding: var(--window-padding);
  font-size: var(--font-size-body);
  color: var(--color-text);
}

/* Covers the whole slot, like the top child of `stack!`. */
.layer {
  position: absolute;
  inset: 0;
  display: flex;
}

/* Dims the screen and centers the content on both axes. */
.layer-dialog {
  align-items: center;
  justify-content: center;
  background: var(--color-backdrop);
}

/* No backdrop; the content sits in the bottom right corner. */
.layer-toast {
  align-items: flex-end;
  justify-content: flex-end;
  padding: var(--toast-offset);
}

.placeholder {
  font-size: var(--font-size-body);
  color: var(--color-text);
}
</style>
