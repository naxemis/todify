/**
 * Edge-case fixture data for scenes that show empty states. Every export is a
 * set of lists (the same shape as `typicalLists` in `lists.js`), so a consumer
 * can always treat it as `ReadonlyArray<List>`. Long names and large sets live
 * further down in this file.
 *
 * Everything is made with the builders from `build.js`, so `id` and `place`
 * are never typed by hand.
 */

import { column, list, lists } from './build.js';

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
