use crate::app::Screen::Welcome;
use iced::{Element, Task};
use std::path::PathBuf;
use std::sync::Arc;
use todify_core::errors::storage_error::StorageError;
use todify_core::helpers::load_outcome::LoadOutcome;
use todify_core::helpers::local_storage::LocalStorage;
use todify_core::managers::list_manager::ListManager;

#[allow(dead_code)]
#[derive(Debug, Clone)]
pub enum Message {
    ListsLoaded(Result<LoadOutcome, Arc<StorageError>>),
}

#[allow(dead_code)]
pub enum Screen {
    Welcome,
    Home,
    List,
    Settings,
}

enum Warning {
    ListsRecovered(PathBuf),
}

enum Error {
    ListsLoadFailed(Arc<StorageError>),
}

#[allow(dead_code)]
pub struct App {
    current_screen: Screen,
    lists: Option<ListManager>,
    warnings: Vec<Warning>,
    current_error: Option<Error>,
}

impl App {
    pub fn new() -> (Self, Task<Message>) {
        let local_storage = Arc::new(LocalStorage::new().unwrap());
        let for_task = Arc::clone(&local_storage);
        let task = Task::perform(
            async move { for_task.load_lists().map_err(Arc::new) },
            Message::ListsLoaded,
        );

        (
            Self {
                current_screen: Welcome,
                lists: None,
                warnings: Vec::new(),
                current_error: None,
            },
            task,
        )
    }

    pub fn update(&mut self, message: Message) -> Task<Message> {
        match message {
            Message::ListsLoaded(Ok(loaded_lists)) => {
                match loaded_lists {
                    LoadOutcome::Loaded(manager) => {
                        self.lists = Some(manager);
                    }
                    LoadOutcome::Recovered(manager, path) => {
                        self.lists = Some(manager);
                        self.warnings.push(Warning::ListsRecovered(path));
                    }
                    LoadOutcome::Missing => self.lists = Some(ListManager::new()),
                }

                Task::none()
            }
            Message::ListsLoaded(Err(error)) => {
                let a = Error::ListsLoadFailed(error);
                let b = Some(a);

                self.current_error = b;

                Task::none()
            }
        }
    }

    pub fn view(&self) -> Element<'_, Message> {
        iced::widget::text("todify").into()
    }
}
