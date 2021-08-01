| [Quickstart](quickstart.md) | [Scenes](scenes.md) | Commands | [Theming](theming.md)
| --- | --- | --- | --- |

# Commands

Here is an exhaustive description of all commands and their parameters.

[Display picture](#display-picture)  
[Display text](#display-text)  
[Hide text](#hide-text)  
[Jump to command](#jump-to-command)  
[Player choice](#player-choice)    
[Start scene](#start-scene)  

## Display picture

Displays a picture. Replaces any previously displayed picture.

If the picture is smaller than the actual game window, it is centered both 
vertically and horizontally. The scene background color behind the picture is black.

If the picture size is bigger than the actual game window, it is reduced, so
the biggest side can fit in the window. Keeps aspect ratio.

### Parameters

- **Wait for player click to continue**  
Enable to stop execution right after the picture has been displayed.

- **Fullscreen**  
Stretches both picture sides to fill the whole screen.

- **Image file**  
Picture's file to display. Only files located under `assets` folder, or a subfolder, can be selected. 

## Display text

Displays text in the standard text box.

Automatically shows up the text box if hidden. 

Hides overflow if text is too long to fit in the box. 

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

## Jump to command

Jumps to a command within the same scene. The command to jump to must have a reference.

### Parameters

- **Command**  
The command to jump to.

## Player choice

Displays a set of choices. Only one can be chosen.

### Parameters

A list of choices defined by:
- A text to display
- A command to jump to in case the player select this choice

If no defined command to jump to, scene will continue to the next one right after _Player choice_ command.

## Start scene

Starts another scene. Discards all commands after this one in the current scene.

### Parameters

- **Scene**  
The scene to start.
