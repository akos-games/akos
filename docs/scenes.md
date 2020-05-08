| [Quickstart](quickstart.md) | Scenes | [Commands](commands.md) | [Theming](theming.md)
| --- | --- | --- | --- |

# Scenes

Scenes are the first level of game cutout. You can consider them as the "table of content" of your game,
the pieces of the plot.

## Development

A scene can be edited by clicking its name in the sidebar.

Scenes are defined by a name, and a set of commands, which are used to control the game engine.

Commands are executed as a workflow from top to bottom. You can reorder them by drag & drop.

A command is defined by a type, a comment, and a set of parameters.  
- The type tells the engine what to do.
- The comment is a free field where you can write some notes for yourself.
- Parameters describe the details of action to perform depending on the type.

Here is the list of all available [commands](commands.md).

## Best practices

It is recommended to keep scenes short and avoid catch-all scenes.

A scene should represent an atomic part of the story.
It should be possible to roughly summarize the plot simply by reading the names of the scenes.
For example:

- Intro  
- Shootout in the bar  
- Mysterious call  
- Jane encounter  
- Car chase  
...  
- Epilogue
