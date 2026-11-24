/**
 * Typical fixture data for "normal" scenes: Home with several lists and List
 * with a selected list. Every list has 2-3 columns, no column is empty, and
 * nothing is long enough to need scrolling in a 640x480 window. Empty and
 * extreme cases live in separate fixtures.
 *
 * Everything is made with the builders from `build.js`, so `id` and `place`
 * are never typed by hand. The first list is the richest one: the scene
 * gallery uses it as the selected list.
 */

import { card, column, list, lists } from './build.js';

/**
 * A typical set of four lists.
 *
 * @type {ReadonlyArray<import('./model.js').List>}
 */
export const typicalLists = lists([
  list('Groceries', [
    column('To buy', [
      card('Oat milk', 'Two cartons, unsweetened.'),
      card('Sourdough bread'),
      card('Cherry tomatoes', 'The small ones on the vine.'),
      card('Olive oil'),
      card('Greek yogurt'),
      card('Basil'),
    ]),
    column('In the cart', [
      card('Eggs', 'A dozen, free range.'),
      card('Spaghetti'),
    ]),
    column('Bought', [
      card('Coffee beans', 'Medium roast, one kilogram.'),
      card('Bananas'),
      card('Parmesan'),
    ]),
  ]),
  list('Work', [
    column('To do', [
      card('Write the release notes', 'Cover only user-visible changes.'),
      card('Review the open pull request'),
      card('Plan next sprint'),
    ]),
    column('In progress', [
      card('Fix the login timeout', 'Reproduces only on slow networks.'),
      card('Update the onboarding guide'),
    ]),
    column('Done', [
      card('Reply to the vendor email'),
      card('Archive the old reports'),
    ]),
  ]),
  list('Home renovation', [
    column('Planned', [
      card('Paint the hallway', 'Light grey, two coats.'),
      card('Replace the bathroom tiles'),
      card('Buy new curtains'),
    ]),
    column('Done', [
      card('Fix the leaking tap'),
      card('Install the ceiling lamp', 'Warm white bulbs.'),
    ]),
  ]),
  list('Weekend trip', [
    column('Ideas', [
      card('Hike to the lake', 'About two hours one way.'),
      card('Visit the old town'),
    ]),
    column('Booked', [
      card('Train tickets', 'Leaves at 8:15 on Saturday.'),
      card('Cabin for two nights'),
    ]),
  ]),
]);
