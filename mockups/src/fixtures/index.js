/**
 * The single entry point for fixture data. Widgets, screens, and the scene
 * gallery import fixtures only from this file. It re-exports every set of lists
 * under its own name and adds a registry that maps each name to its set. The
 * builders in `build.js` and the typedefs in `model.js` are not exported: the
 * consumers get ready data, not the tools that make it. It also exports the
 * list of themes, which is not part of `fixtureSets`.
 *
 * This file holds no data of its own.
 */

import { typicalLists } from './lists.js';
import { themes } from './themes.js';
import {
  noLists,
  emptyList,
  noCards,
  longNames,
  manyLists,
  manyCards,
} from './edge-cases.js';

export { typicalLists, noLists, emptyList, noCards, longNames, manyLists, manyCards, themes };

/**
 * Every fixture set by name. The key is exactly the name of the named export,
 * and the value is the same frozen array, not a copy. The order is the order in
 * which the scene gallery shows the sets: typical first, then the empty cases,
 * then long names and scrolling.
 *
 * @type {Readonly<Record<string, ReadonlyArray<import('./model.js').List>>>}
 */
export const fixtureSets = Object.freeze({
  typicalLists,
  noLists,
  emptyList,
  noCards,
  longNames,
  manyLists,
  manyCards,
});
