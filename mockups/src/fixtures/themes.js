/**
 * The themes offered in the Settings screen. For now only one real theme
 * exists (the current colors from `tokens.css`); the rest are placeholders
 * that stand in for themes added later.
 */

/**
 * Themes in display order.
 *
 * @type {ReadonlyArray<{ id: string, label: string }>}
 */
export const themes = Object.freeze([
  { id: 'dark-blue', label: 'Dark Blue' },
  { id: 'placeholder-1', label: 'Placeholder 1' },
  { id: 'placeholder-2', label: 'Placeholder 2' },
  { id: 'placeholder-3', label: 'Placeholder 3' },
]);
