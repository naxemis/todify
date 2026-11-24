<!--
  Error dialog: tells the user that something failed and lets them pick what
  to do next. It is the Dialog frame with a title, a message and, under it, an
  optional technical detail (for example a path and a system message).
  Receives `title` and `message` (both required), `detail` (default "") and
  `buttons` (required, same shape as in Dialog.vue: `id`, `label` and
  `variant` per button). The caller gives the buttons, because a load error
  and a save error offer different choices; the order is kept as given (the
  load error puts its destructive "work anyway" last). Holds no state of its own. Emits `choose` with the `id`
  of the clicked button, passing the frame's event on unchanged.
  It is built on Dialog.vue; the message keeps the look the frame gives it.
  The detail is smaller and lighter, and it wraps, including long paths
  without spaces. An empty `detail` is not rendered at all, so no empty space
  is left under the message.
  It does not know what went wrong; the caller decides what each choice means.
  Counterpart in the GUI: gui/src/overlays/error.rs.
-->

<script setup>
import Dialog from './Dialog.vue';

defineProps({
  /** Text of the title. */
  title: { type: String, required: true },
  /** Plain text that explains what happened and what the user can do. */
  message: { type: String, required: true },
  /** Technical description of the error; an empty string hides it. */
  detail: { type: String, default: '' },
  /** @type {import('vue').PropType<{ id: string, label: string, variant: 'primary' | 'secondary' | 'danger' }[]>} */
  buttons: { type: Array, required: true },
});

const emit = defineEmits(['choose']);
</script>

<template>
  <Dialog :title="title" :buttons="buttons" @choose="emit('choose', $event)">
    <div class="content">
      <div>{{ message }}</div>
      <div v-if="detail !== ''" class="detail">{{ detail }}</div>
    </div>
  </Dialog>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: var(--dialog-gap);
}

.detail {
  overflow-wrap: anywhere;
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
}
</style>
