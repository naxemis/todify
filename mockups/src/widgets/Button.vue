<!--
  Button widget: one button with a text label. The label comes from the
  default slot. The look comes from `variant`: "primary" (filled, default),
  "secondary" (no background or border) or "danger" (filled, for destructive
  actions). In Iced each variant is one style function.
  Receives `variant`, which must be one of the three values above; any other
  value is rejected by the validator. Receives `fill` (default false): when
  true, the button takes the full width of its parent and the label is aligned
  to the left; in Iced this is `width(Length::Fill)`. Holds no state of its
  own. Emits `click`, without a parameter, when the button is clicked; the
  parent decides what the click means.
  Edge cases: a long label stays on one line and never wraps, so the button
  grows wider instead of taller. The secondary variant never has a background,
  and its hover changes only the text color.
  Counterpart in the GUI: gui/src/widgets/button.rs.
-->

<script setup>
defineProps({
  /** Look of the button: "primary", "secondary" or "danger". */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
  /** Take the full width of the parent, with the label aligned to the left. */
  fill: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);
</script>

<template>
  <button class="button" :class="[variant, { fill }]" type="button" @click="emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: var(--button-padding-y) var(--button-padding-x);
  border: none;
  border-radius: var(--button-radius);
  font-family: inherit;
  font-size: var(--font-size-body);
  line-height: var(--line-height);
  white-space: nowrap;
  cursor: pointer;
}

/* Counterpart of width(Length::Fill) in Iced. */
.fill {
  box-sizing: border-box;
  width: 100%;
  text-align: left;
}

.primary {
  background: var(--color-primary-button);
  color: var(--color-primary-button-text);
}

.primary:hover {
  background: var(--color-primary-button-hover);
}

/* Never has a background: "transparent" is Iced's background None in
   both Active and Hovered. Hover only changes the text color. */
.secondary {
  background: transparent;
  color: var(--color-secondary-button-text);
}

.secondary:hover {
  color: var(--color-secondary-button-text-hover);
}

.danger {
  background: var(--color-danger-button);
  color: var(--color-danger-button-text);
}

.danger:hover {
  background: var(--color-danger-button-hover);
}
</style>
