// todo(gui): Define App (shared state: settings, lists, warnings, current error), the screen enum, the top-level Message, update, and view
//  - The selected list lives in App, not in the List screen variant, so it survives navigation.
//  - Deleting the selected list clears the selection and the list screen shows an empty state.
//  - Deletion asks for confirmation first; the pending action is stored in App.
//  - lists is absent until the first load finishes and present, possibly empty, afterwards; screens read
//    that from App and keep no loading flag of their own.
//  - new starts the first load as well; its result arrives as a message, the same path as a retry after
//    a load error.

// todo(gui): Mark App dirty on data change; save on Ctrl+S, 5 seconds after the last change, and on window close
//  - Saving on Ctrl+S, 5 seconds after the last change, and on window close keeps
//    writes and presave backups low while limiting data loss on a crash.

// todo(gui): Working mode in App (normal or read-only); every save path checks it before writing

// todo(gui): Handle the load error choice: switch mode, or call load_lists again on retry

// todo(gui): After a load error, ask the user to choose: read-only mode, work anyway, or retry loading.

// todo(gui): Localized error messages
//   - Trigger: a second language, or the same wording repeated in several places
//   - Catalog: gui/locales/*.json, embedded with include_str!, keys -> template with placeholders
//   - Mapping: StorageError variant -> key stays in one function in this layer
//   - Constraint: core holds no user-facing text; error variants keep data, not formatted strings

use iced::{Element, Task};

#[derive(Debug, Clone)]
pub enum Message {}

pub struct App;

impl App {
    pub fn new() -> Self {
        Self
    }

    pub fn update(&mut self, _message: Message) -> Task<Message> {
        Task::none()
    }

    pub fn view(&self) -> Element<'_, Message> {
        iced::widget::text("todify").into()
    }
}
