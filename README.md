# JumpSlide

## About

## Tutorial

## GAME interface

GAME.init
GAME.loop
GAME.win
GAME.lose

## JumpSlide API

_The api consists of static methods to be called directly from a GAME implementation_  
_Technical details will be noted in italics, they are safe to ignore_


### JumpSlide public properties

JumpSlide.stage
JumpSlide.SETTINGS
JumpSlide.stage
JumpSlide.player
JumpSlide.platforms

### JumpSlide public methods

#### JumpSlide.start()

example:

````
JumpSlide.start()
````

This should only be called once during the initialization phase of your game.  
_This method kicks off the render loop_


#### JumpSlide.addPlatform( x, y, width, height )

example:

````
JumpSlide.addPlatform( 90, 500, 200, 10 );
````

this will create a platform at position `{ x: 90, y: 500 }`  
with the dimensions of `{ width: 200, height: 10 }`  
units are in pixels


#### JumpSlide.createSprite( image_path, x, y )

will create a new sprite using the image you provide.  
by default, the sprite will be anchored in the center, and positioned in the middle of the screen.  
you should assign the created sprite to a variable.

example:

````
var coin = JumpSlide.createSprite( "assets/coin.png", 900, 200 );
````

this will create a new sprite using the image file `assets/coin.png` and position the sprite at `{ x: 900, y: 200 }`  
then, the newly created sprite will be stored in the variable named `coin`  
units are in pixels

````
var end_game_screen = JumpSlide.createSprite( "assets/end_overlay.png" );
````

this will create a new sprite using the image file `assets/end_overlay.png` and position the sprite in the center of the stage  
then, the newly created sprite will be stored in the variable named `end_game_screen`  


#### JumpSlide.removeSprite( sprite_variable )

will remove a sprite from the stage

example:

````
JumpSlide.removeSprite( coin );
````

this will remove a sprite that has previously been created using `JumpSlide.createSprite()`. this is why it is helpful to store new sprites in a variable.



## Debugging

You can enable showing the players bounding box by enabling JumpSlide.SETTINGS.debug

````
JumpSlide.SETTINGS.debug = true;
````