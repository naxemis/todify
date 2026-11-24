<!--
  Dialog frame: the box shared by every dialog. From the top: a title, the
  content and a row of buttons. It does not know what it controls; the content
  comes from the default slot and the caller decides what a click means.
  Receives `title` (required) and `buttons` (required, one object per button:
  `id`, `label` and `variant` of the shared Button widget; an empty array is
  rejected by the validator). Holds no state of its own. Emits `choose` with
  the `id` of the clicked button and nothing else.
  Edge cases: the title and the content wrap, including long words without
  spaces, and the dialog never scrolls. The button row is aligned to the right
  and keeps the order given by the caller, so the main action comes last.
  The frame draws only its own box: the backdrop and the position on the
  screen belong to the overlay layer, not to the frame.
  Counterpart in the GUI: gui/src/overlays/dialog.rs.
-->

<script setup>
import Button from '../widgets/Button.vue';

defineProps({
  /** Text of the title. */
  title: { type: String, required: true },
  /** @type {import('vue').PropType<{ id: string, label: string, variant: 'primary' | 'secondary' | 'danger' }[]>} */
  buttons: {
    type: Array,
    required: true,
    validator: (value) => value.length > 0,
  },
});

const emit = defineEmits(['choose']);
</script>

<template>
  <div class="dialog">
    <div class="title">{{ title }}</div>
    <div class="body">
      <slot />
    </div>
    <div class="buttons">
      <Button
        v-for="button in buttons"
        :key="button.id"
        :variant="button.variant"
        @click="emit('choose', button.id)"
      >
        {{ button.label }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--dialog-gap);
  width: var(--dialog-width);
  padding: var(--dialog-padding);
  background: var(--color-panel);
  border-radius: var(--dialog-radius);
  box-shadow: 0 var(--overlay-shadow-offset-y) var(--overlay-shadow-blur) var(--color-shadow);
}

.title {
  font-size: var(--font-size-dialog-title);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  overflow-wrap: anywhere;
}

.body {
  font-size: var(--font-size-body);
  color: var(--color-text);
  overflow-wrap: anywhere;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: var(--button-gap);
}
</style>
