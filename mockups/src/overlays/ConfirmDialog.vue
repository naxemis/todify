<!--
  Confirm dialog: asks the user to confirm or cancel one action. It is the
  Dialog frame with a title, a message and two buttons, "cancel" first and
  "confirm" last (the main action comes last).
  Receives `title`, `message` and `confirmLabel` (all required), `cancelLabel`
  (default "Cancel") and `danger` (default false; the confirm button is then
  the danger variant, otherwise primary). The cancel button is always the
  secondary variant. Holds no state of its own. Emits `choose` with "cancel" or
  "confirm", passing the frame's event on unchanged.
  It is built on Dialog.vue and has no look of its own. It does not know what
  it confirms; the caller decides what each choice means.
  Counterpart in the GUI: gui/src/overlays/confirm.rs.
-->

<script setup>
import { computed } from 'vue';
import Dialog from './Dialog.vue';

const props = defineProps({
  /** Text of the title. */
  title: { type: String, required: true },
  /** Plain text shown under the title. */
  message: { type: String, required: true },
  /** Label of the confirm button. */
  confirmLabel: { type: String, required: true },
  /** Label of the cancel button. */
  cancelLabel: { type: String, default: 'Cancel' },
  /** True when the confirmed action is destructive. */
  danger: { type: Boolean, default: false },
});

const emit = defineEmits(['choose']);

const buttons = computed(() => [
  { id: 'cancel', label: props.cancelLabel, variant: 'secondary' },
  { id: 'confirm', label: props.confirmLabel, variant: props.danger ? 'danger' : 'primary' },
]);
</script>

<template>
  <Dialog :title="title" :buttons="buttons" @choose="emit('choose', $event)">
    {{ message }}
  </Dialog>
</template>
