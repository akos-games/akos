# Changelog

## 0.3.0

### Added

- Command references.
- _Jump to command_ command.
- Display a popup when an error occurred in the editor.
- Display a popup when an error occurred in game.
- Open editor documentation from menu.
- Scene command duplication.
- Scene command position number.
- Move a command to start / end / specific position.
- Scene command deletion confirmation.

### Changed

- Editor visual theme.

### Fixed

- Deleting a scene shows welcome page.
- _Esc_ shortcut broken during game after opening settings.
- Loading a scene with a large amount a commands in editor takes time.

### Removed

- Scene command comment.

### Known issues

- In some cases, when editor / game is broken due to an error, the error popup may be broken too.
- There is no project integrity check implemented yet, so it is 
possible to build an inconsistent game. 
- Game build could fail if a file explorer window is open at the `dist` folder location.

## 0.2.0 - 2020-05-25

### Added

- In-game main menu.
- Editor _Theme_ page, from which main menu background can be customized.
- In-game pause menu.
- In-game settings menu.
- In-game fullscreen / windowed mode setting.
- Switch in-game fullscreen mode by pressing Alt+Enter.
- Project creation page.
- Open `dist` folder from menu.
- Loading indicator during build.
- Editor snack bar notifications.

### Changed

- Project is automatically saved.
- Project relative actions are disabled during build.

### Known issues

- There is no project integrity check implemented yet, so it is 
possible to build an inconsistent game. 
- Game build could fail if a file explorer window is open at the `dist` folder location.

## 0.1.0 - 2020-04-20 (Initial release)

### Added

- User-friendly editor.
- Game scenes.
- Build standalone executable game (Windows only at the moment) .

### Known issues

- There is no project integrity check implemented yet, so it is 
possible to build an inconsistent game. 
- Game build could fail if a file explorer window is open at the `dist` folder location.
