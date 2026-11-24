/**
 * Shape of the fixture data. It mirrors what `core` exposes through public
 * getters (see `core/src/models/`), not the `lists.json` storage format.
 * There is no `next_id` and no maps: lists, columns, and cards are arrays.
 *
 * Names of Rust getters are given as `Type::getter`.
 */

/**
 * A card inside a column. Mirrors `core/src/models/card.rs`.
 *
 * @typedef {object} Card
 * @property {number} id
 *   Integer 0-65535 (Rust `u16`). Unique within its column. Getter:
 *   `Card::get_id`.
 * @property {string} name
 *   Not empty after trimming whitespace. Getter: `Card::get_name`.
 * @property {string} description
 *   May be an empty string (the default for a new card). Getter:
 *   `Card::get_description`.
 * @property {number} place
 *   Integer 0-65535 (Rust `u16`). Position within its column: 0..n-1
 *   with no gaps and no duplicates. Getter: `Card::get_place`.
 */

/**
 * A column inside a list. Mirrors `core/src/models/column.rs`.
 *
 * @typedef {object} Column
 * @property {number} id
 *   Integer 0-255 (Rust `u8`). Unique within its list. Getter:
 *   `Column::get_id`.
 * @property {string} name
 *   Not empty after trimming whitespace. Getter: `Column::get_name`.
 * @property {number} place
 *   Integer 0-255 (Rust `u8`). Position within its list: 0..n-1 with no
 *   gaps and no duplicates. Getter: `Column::get_place`.
 * @property {Card[]} cards
 *   Sorted by `place`. `core` has no getter that returns all cards at
 *   once; it only has `Column::get_card_by_id` and
 *   `Column::get_card_by_name`, so this array is a fixture-level shape.
 */

/**
 * A to-do list. Mirrors `core/src/models/list.rs`.
 *
 * @typedef {object} List
 * @property {number} id
 *   Integer 0-65535 (Rust `u16`). Unique among all lists. Getter:
 *   `List::get_id`.
 * @property {string} name
 *   Not empty after trimming whitespace. Getter: `List::get_name`.
 * @property {Column[]} columns
 *   Sorted by `place`. `core` has no getter that returns all columns at
 *   once; it only has `List::get_column_by_id` and
 *   `List::get_column_by_name`, so this array is a fixture-level shape.
 */
