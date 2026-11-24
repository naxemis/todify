/**
 * Edge-case fixture data for scenes that show empty states. Every export is a
 * set of lists (the same shape as `typicalLists` in `lists.js`), so a consumer
 * can always treat it as `ReadonlyArray<List>`. Long names and large sets live
 * further down in this file.
 *
 * Everything is made with the builders from `build.js`, so `id` and `place`
 * are never typed by hand.
 */

import { card, column, list, lists } from './build.js';

// The app window is 480 px tall (`window_size` in `gui/src/main.rs`), so it
// fits a dozen or so rows. 30 lists and 50 cards leave a safe margin for
// scrolling whatever the final row spacing turns out to be.
const MANY_LISTS_COUNT = 30;
const MANY_CARDS_COUNT = 50;

/**
 * Repeats a phrase with single spaces between the copies, so the text can wrap.
 *
 * @param {string} phrase
 * @param {number} times
 * @returns {string}
 */
function repeatPhrase(phrase, times) {
  return Array.from({ length: times }, () => phrase).join(' ');
}

/**
 * The Home screen before the user has created any list: an empty
 * `ListManager`.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const noLists = lists([]);

/**
 * The List screen with a selected list that has no columns yet.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const emptyList = lists([list('Books to read')]);

/**
 * A selected list whose columns exist but none of them holds a card.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const noCards = lists([
  list('Side project', [
    column('To do'),
    column('In progress'),
    column('Done'),
  ]),
]);

/**
 * Names that are too long for their space: one unbroken word that cannot wrap,
 * one long phrase that wraps to several lines, a long column, and long cards.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const longNames = lists([
  // About 80 characters, no spaces.
  list('NoSpacesAnywhere'.repeat(5), [
    // About 80 characters, with spaces.
    column(repeatPhrase('Blocked until the design review is done', 2), [
      // About 150 characters.
      card(repeatPhrase('Prepare release notes and share them with everyone', 3)),
      // Several sentences, about 500 characters.
      card(
        'Long description',
        repeatPhrase(
          'This card has a very long description that keeps going for several lines.',
          7,
        ),
      ),
    ]),
    column('To do', [
      card('Buy milk'),
      card('Call the dentist', 'Ask about Friday.'),
      card('Water the plants'),
    ]),
  ]),
  // About 120 characters, with spaces.
  list(repeatPhrase('Quarterly planning notes for every team', 3), [
    column('To do', [card('Write the agenda')]),
  ]),
  list('Groceries', [column('To buy', [card('Bread'), card('Eggs')])]),
]);

/**
 * The Home screen with more lists than fit in the sidebar, so it has to scroll.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const manyLists = lists(
  Array.from({ length: MANY_LISTS_COUNT }, (_, index) => {
    const name = `List ${index + 1}`;
    // Only the first list has content, so selecting it shows something.
    if (index > 0) {
      return list(name);
    }
    return list(name, [
      column('To do', [card('Card 1'), card('Card 2'), card('Card 3')]),
    ]);
  }),
);

/**
 * A selected list whose first column holds more cards than fit in the table,
 * so it has to scroll.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const manyCards = lists([
  list('Big backlog', [
    column(
      'Backlog',
      Array.from({ length: MANY_CARDS_COUNT }, (_, index) =>
        card(`Card ${index + 1}`),
      ),
    ),
    column('Done', [card('Card A'), card('Card B'), card('Card C')]),
  ]),
]);
