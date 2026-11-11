use crate::app::App;

mod app;
mod overlays;
mod preferences;
mod screens;
pub mod widgets;

fn main() -> iced::Result {
    iced::application(App::new, App::update, App::view)
        .title("todify")
        .run()
}
