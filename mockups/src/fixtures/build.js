/**
 * Builders for fixture data. They do what the managers in `core` do
 * (`core/src/managers/*_manager.rs`): trim names, reject empty names, and
 * assign `id` and `place`, so nobody types them by hand. The output has the
 * shape described in `model.js`.
 *
 * IDs and places are assigned from 0 in array order. One call to `buildLists`
 * plays the role of one `ListManager`, so there is no module-level counter and
 * the result does not depend on import order.
 */

/**
 * A card before its column assigns `id` and `place`.
 *
 * @typedef {object} CardDraft
 * @property {string} name
 * @property {string} description
 */

/**
 * A column whose cards are already numbered, before its list assigns `id`
 * and `place`.
 *
 * @typedef {object} ColumnDraft
 * @property {string} name
 * @property {import('./model.js').Card[]} cards
 */

/**
 * A list whose columns are already numbered, before the set assigns `id`.
 *
 * @typedef {object} ListDraft
 * @property {string} name
 * @property {import('./model.js').Column[]} columns
 */

// Largest count each ID type can number: `u8` holds 0..=255, `u16` 0..=65535.
const MAX_COLUMNS = 2 ** 8;
const MAX_CARDS = 2 ** 16;
const MAX_LISTS = 2 ** 16;

/**
 * Trims a name and rejects it when nothing is left, like `EmptyName` in `core`.
 *
 * @param {string} name
 * @param {'card' | 'column' | 'list'} kind
 * @returns {string}
 */
function cleanName(name, kind) {
  const trimmed = name.trim();
  if (trimmed === '') {
    throw new Error(`EmptyName: ${kind} name is empty after trimming`);
  }
  return trimmed;
}

/**
 * Throws when `count` items cannot all get an ID of the given type.
 *
 * @param {number} count
 * @param {number} max
 * @param {string} what
 * @param {string} idType
 */
function assertFits(count, max, what, idType) {
  if (count > max) {
    throw new Error(
      `IdOverflow: ${count} ${what} do not fit in ${idType} (max ${max})`,
    );
  }
}

/**
 * Builds a card draft.
 *
 * @param {string} name
 * @param {string} [description] Kept exactly as given (not trimmed).
 * @returns {CardDraft}
 */
export function card(name, description = '') {
  return { name: cleanName(name, 'card'), description };
}

/**
 * Builds a column draft and numbers its cards (`id` = `place` = index).
 *
 * @param {string} name
 * @param {CardDraft[]} [cards]
 * @returns {ColumnDraft}
 */
export function column(name, cards = []) {
  const cleaned = cleanName(name, 'column');
  assertFits(cards.length, MAX_CARDS, 'cards', 'u16');
  return {
    name: cleaned,
    cards: cards.map((draft, index) => ({
      id: index,
      name: draft.name,
      description: draft.description,
      place: index,
    })),
  };
}

/**
 * Builds a list draft and numbers its columns (`id` = `place` = index).
 *
 * @param {string} name
 * @param {ColumnDraft[]} [columns]
 * @returns {ListDraft}
 */
export function list(name, columns = []) {
  const cleaned = cleanName(name, 'list');
  assertFits(columns.length, MAX_COLUMNS, 'columns', 'u8');
  return {
    name: cleaned,
    columns: columns.map((draft, index) => ({
      id: index,
      name: draft.name,
      place: index,
      cards: draft.cards,
    })),
  };
}

/**
 * Builds a whole set of lists, the counterpart of one `ListManager`. List IDs
 * start at 0. The result is deeply frozen and shares nothing with the drafts.
 *
 * @param {ListDraft[]} drafts
 * @returns {ReadonlyArray<import('./model.js').List>}
 */
export function lists(drafts) {
  assertFits(drafts.length, MAX_LISTS, 'lists', 'u16');
  return Object.freeze(
    drafts.map((draft, index) =>
      Object.freeze({
        id: index,
        name: draft.name,
        columns: Object.freeze(
          draft.columns.map((col) =>
            Object.freeze({
              id: col.id,
              name: col.name,
              place: col.place,
              cards: Object.freeze(
                col.cards.map((c) => Object.freeze({ ...c })),
              ),
            }),
          ),
        ),
      }),
    ),
  );
}
