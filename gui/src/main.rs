use crate::app::App;

mod app;
mod overlays;
mod screens;
pub mod widgets;
mod preferences;

fn main() -> iced::Result {
    iced::application(App::new, App::update, App::view)
        .title("todify")
        .run()
}
