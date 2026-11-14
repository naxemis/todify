// todo(core/local_storage/startup): Write startup_lists.json as the startup snapshot; nothing writes it yet.

// todo(screens/welcome): Add the welcome screen state, messages and view.
// todo(screens/home): Add list selection and create/rename/delete of lists.
// todo(widgets/sidebar): Show all lists and emit a Message on selection.
// todo(app): Store the selected list in App, not in the List screen variant, so it survives navigation.
// todo(screens/list): Show the sidebar with other lists and the main view of the selected list.
// todo(widgets/table): Show the selected list's items in a table, borrowing data from App.
// todo(screens/list): Show an empty state when no list is selected.

// todo(overlays/dialog): Add a shared dialog frame (title, body, button row) that returns only the user's choice.
// todo(overlays/confirm): Add a confirmation dialog with a message and confirm/cancel buttons.
// todo(app): Store the pending action in App; the dialog never knows what it controls.
// todo(widgets/sidebar): Give each list a delete action that asks for confirmation first.
// todo(app): Deleting the selected list clears the selection.

// todo(screens/settings): Add the settings screen state, messages and view.

// todo(app/mode): Add a working mode (normal or read-only); every save path checks it before writing.
// todo(app/save): Mark App dirty on data change.
// todo(app/save): Save on Ctrl+S, 5 seconds after the last change, and on window close.

// todo(core/storage_error/lock): Add a variant for a lock held by another instance, separate from I/O errors.
// todo(core/local_storage/lock): Hold an exclusive lock on todify.lock for the lifetime of LocalStorage (not on lists.json, which save replaces by rename).
// todo(core/local_storage/tests): Add startup snapshot and lock tests.

// todo(overlays/error): Add an error dialog with a message and caller-given buttons (load errors, save failures).
// todo(overlays/error): Add the load error variant with read-only, work-anyway and retry buttons.
// todo(app/load): On a load error, switch the mode for read-only or work-anyway, or load lists again on retry.
// todo(core/local_storage/save): Before the first save after a corrupt lists.json, keep the corrupt file as a timestamped copy.
// todo(overlays/toast): Show warnings as a toast that dismisses itself.
// todo(core/local_storage/sync): Report a failed application directory sync as a warning instead of ignoring it.

// todo(app/errors): Later - localize error messages once a second language or repeated wording appears.
// todo(app/errors): Keep a gui/locales/*.json catalog embedded with include_str!, and map StorageError to a key in one function.
// todo(app/errors): Core holds no user-facing text; error variants keep data, not formatted strings.

use crate::app::App;

mod app;
mod overlays;
mod preferences;
mod screens;
pub mod widgets;

fn main() -> iced::Result {
    iced::application(App::new, App::update, App::view)
        .title("Todify")
        .window_size((640, 480))
        .run()
}
