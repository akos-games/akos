# Changelog

## 0.2.0

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

- User-friendly editor
- Game scenes
- Build standalone executable game (Windows only at the moment$) 

### Known issues

- There is no project integrity check implemented yet, so it is 
possible to build an inconsistent game. 
- Game build could fail if a file explorer window is open at the `dist` folder location.
