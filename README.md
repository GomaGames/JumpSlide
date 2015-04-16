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

