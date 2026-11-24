# Todify Mockups

Visual mockups of the Todify GUI built with Vue. They are the reference for colors, fonts, and spacing implemented in `gui/` with Iced.

## Rules

- Use only what Iced can reproduce: background, border (width, radius, color), container shadow, padding, spacing, row/column layout, one font family, text sizes.
- No animations, transitions, hover effects beyond a color change, CSS grid, or blur.
- Components contain no literal values; everything comes from `src/tokens.css`.
- The window frame is 640×480, matching `window_size` in `gui/src/main.rs`.

## TODO

- [x] Project setup
  - [x] Scaffold Vite + Vue in `mockups/` (no router, no store, no tests)
  - [x] Confirm `npm run dev` serves the starter page
  - [x] Remove starter components and assets
  - [x] Confirm `mockups/.gitignore` covers `node_modules/` and `dist/`
- [x] Design tokens
  - [x] Spacing scales
  - [x] Corner radius
  - [x] Text sizes and font family
  - [x] Color set (a single dark theme for now)
  - [x] Name every token so it maps one-to-one to a Rust constant
- [ ] Fixtures
  - [x] Fake lists and items shaped like the `core` model
  - [x] Edge cases: no lists, empty list, very long name, enough items to scroll
- [ ] Widgets
  - [ ] Sidebar: lists, selected list, select and delete events
  - [ ] Table: items of the selected list, stateless
- [ ] Overlays
  - [ ] Dialog frame: title, body slot, button row; emits only the chosen button
  - [ ] Confirm dialog built on the dialog frame
  - [ ] Error dialog with caller-given buttons
  - [ ] Toast
- [ ] Screens
  - [ ] Welcome
  - [ ] Home
  - [ ] List: sidebar, table, empty state when nothing is selected
  - [ ] Settings
- [ ] Scene gallery
  - [ ] Scene list on the left, 640×480 frame on the right
  - [ ] Scene record: screen, screen state, optional overlay
  - [ ] Overlays render in a layer above the screen, inside the frame
  - [ ] Selected scene stored in the URL hash
  - [ ] Global light/dark switch
  - [ ] Scenes: welcome; home with and without lists; list selected, unselected, and empty; list with delete confirmation; list with load error (read-only, work anyway, retry); list with save error; list with warning toast; read-only mode (if it looks different); settings
- [ ] Visual pass
  - [ ] Set colors, fonts, and final spacing in `src/tokens.css` only
  - [ ] Check every scene in both themes
  - [ ] Extend the scale instead of adding one-off values
  - [ ] Confirm no color or `px` literals exist outside `src/tokens.css`
- [ ] Handoff to Iced
  - [ ] Map every token to a constant in the `gui` style module
  - [ ] Map every component style (button, dialog container, table row) to an Iced style function
  - [ ] Simplify anything that does not translate back in the mockups
- [ ] Docker
  - [ ] Decide what the container serves: Vite dev server with mounted sources, or a static build
  - [ ] `Dockerfile` in `mockups/`
  - [ ] `.dockerignore` excluding `node_modules/` and `dist/`
  - [ ] Dev server variant: listen on all interfaces, expose the port, mount `src/`
  - [ ] Static variant: multi-stage build, serve `dist/` from a small web server image
  - [ ] Document build and run commands in `mockups/README.md`
  - [ ] Confirm the gallery opens from the host and, for the dev variant, reloads on edit
