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
