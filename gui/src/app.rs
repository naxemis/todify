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
    StartupSnapshotSaved(Result<(), Arc<StorageError>>),
}

#[allow(dead_code)]
pub enum Screen {
    Welcome,
    Home,
    List,
    Settings,
}

#[allow(dead_code)]
enum Warning {
    ListsRecovered(PathBuf),
    StartupSnapshotFailed(Arc<StorageError>),
}

#[allow(dead_code)]
enum Error {
    ListsLoadFailed(Arc<StorageError>),
}

#[allow(dead_code)]
pub struct App {
    local_storage: Arc<LocalStorage>,
    current_screen: Screen,
    lists: Option<ListManager>,
    warnings: Vec<Warning>,
    current_error: Option<Error>,
}

impl App {
    pub fn new() -> (Self, Task<Message>) {
        let local_storage = Arc::new(LocalStorage::new().unwrap());

        let for_load_lists_task = Arc::clone(&local_storage);
        let load_lists_task = Task::perform(
            async move { for_load_lists_task.load_lists().map_err(Arc::new) },
            Message::ListsLoaded,
        );

        (
            Self {
                local_storage,
                current_screen: Welcome,
                lists: None,
                warnings: Vec::new(),
                current_error: None,
            },
            load_lists_task,
        )
    }

    pub fn update(&mut self, message: Message) -> Task<Message> {
        match message {
            Message::ListsLoaded(Ok(load_outcome)) => match load_outcome {
                LoadOutcome::Loaded(manager) => {
                    let manager_clone = manager.clone();
                    self.lists = Some(manager);
                    self.startup_snapshot_task(manager_clone)
                }
                LoadOutcome::Recovered(manager, path) => {
                    let manager_clone = manager.clone();
                    self.lists = Some(manager);
                    self.warnings.push(Warning::ListsRecovered(path));
                    self.startup_snapshot_task(manager_clone)
                }
                LoadOutcome::Missing => {
                    self.lists = Some(ListManager::new());
                    Task::none()
                }
            },
            Message::ListsLoaded(Err(error)) => {
                let from_arc = Error::ListsLoadFailed(error);
                let to_option = Some(from_arc);

                self.current_error = to_option;

                Task::none()
            }
            Message::StartupSnapshotSaved(Ok(())) => Task::none(),
            Message::StartupSnapshotSaved(Err(error)) => {
                self.warnings.push(Warning::StartupSnapshotFailed(error));
                Task::none()
            }
        }
    }

    pub fn view(&self) -> Element<'_, Message> {
        iced::widget::text("todify").into()
    }

    fn startup_snapshot_task(&self, list_manager: ListManager) -> Task<Message> {
        let storage_clone = Arc::clone(&self.local_storage);

        Task::perform(
            async move {
                storage_clone
                    .save_startup_snapshot(&list_manager)
                    .map_err(Arc::new)
            },
            Message::StartupSnapshotSaved,
        )
    }
}
