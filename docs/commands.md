| [Quickstart](quickstart.md) | [Scenes](scenes.md) | Commands |
| --- | --- | --- |

# Commands

Here is an exhaustive description of all commands and their parameters.

[Display picture](#display-picture)  
[Display text](#display-text)  
[Hide text](#hide-text)  
[Start scene](#start-scene)  

## Display picture

Display a picture. If a previous picture was displayed, it will be replaced.

If the picture is smaller than the actual game window, it will be centered both 
vertically and horizontally. The scene background color behind the picture is black.

If the picture size is bigger than the actual game window, it will be reduced so
the biggest side can fit in the window. The aspect ratio is kept.

### Parameters

- **Wait for player click to continue**  
Enable to stop execution right after the picture has been displayed.

- **Fullscreen**  
Both picture sides will be stretched to fill the whole screen.

- **Image file**  
Picture's file to display. Only files located under `assets` folder, or a subfolder, can be selected. 

## Display text

Display text in the standard text box.

If text box was hidden, it will automatically show up. 

If text is too long to fit in the box, overflow will be hidden. 

### Parameters

- **Wait for player click to continue**  
Enable to stop execution right after the text has been displayed.

- **Text**  
Text to display.

## Hide text

Hide text box.

### Parameters

- **Wait for player click to continue**  
Enable to stop execution right after the text box has been hidden.

## Start scene

Start another scene. All commands after this one in the current scene will be discarded.

### Parameters

- **Scene**  
The scene to start.
