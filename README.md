# JumpSlide

1. [Tutorial](#tutorial)
2. [Game Interface](#game-interface)
3. [JumpSlide API](#jumpslide-api)
	1. [Public Properties](#jumpslide-public-properties)
	2. [JumpSlide.SETTINGS](#jumpslidesettings)
	3. [Public Methods](#jumpslide-public-methods)
4. [JumpSlide.player API](#jumpslideplayer-api)
	1. [Public Properties](#jumpslideplayer-public-properties)
	2. [Public Methods](#jumpslideplayer-public-methods)
5. [Debugging](#debugging)

## About

JumpSlide is a game engine used for demonstrating basic game development topics while creating a "runner" type platform game.  

The tutorial has been written to be presented in a workshop for the STEM conference in Maui Hawaii, April 17th and 18th, 2015.  

The game is meant to be played on the desktop via Google Chrome browser, using the mouse for user interaction, or on an iPad, by visiting [stem2015.gomagames.com](http://stem2015.gomagames.com), selecting a game, and tapping the iOS share button to "Save to Home Screen".  
_There is a known issue where audio does not work on iOS._  

JumpSlide uses the [PixiJS](http://pixijs.com) game engine and is written in the JavaScript language.  

Find more educational Game Development resources at [stem.gomagames.com](http://stem.gomagames.com) 

## Tutorial

You will need a mac (OSX) with [Sublime Text.app](http://www.sublimetext.com/3) installed  
Follow the tutorial in [**JumpSlide-Slideshow.pdf**](JumpSlide-Slideshow.pdf)

## GAME interface

The file where you will be writing all your code is [**`js/game.js`**](js/game.js)

#### GAME.init()
Runs once, at the beginning of the application

#### GAME.loop()
Runs every animation game loop  
  60 times per second  
  Only write code in here that should be run many times!
  
#### GAME.tap()
Runs once, when the player taps or clicks the stage

#### GAME.touch_start()
Runs once, when the player holds the tap or mouse button down

#### GAME.touch_end()
Runs once, when the player releases the tap or mouse button

#### GAME.win()
Runs once, when the player wins the game

#### GAME.lose
Runs once, when the player loses the game

## JumpSlide API

_The api consists of static methods to be called directly from a GAME implementation_  
_Technical details will be noted in italics, they are safe to ignore_


### JumpSlide public properties

##### JumpSlide.SETTINGS
Use this Object to override the default settings.  
These are the default settings:  

````
JumpSlide.SETTINGS = {
  background_color : 0x3E4044,
  ipad_dimensions : [1024, 768],
  starting_point : {
    x : 100,
    y : 200
  },
  gravity : 0.9,
  run_speed : 5,
  controls : {
    up : 500, // click area, top
    down : 524 // click area, down
  },
  jump_velocity : 15, // jump height
  character_graphic : 1, // which alien graphic to use, valid range 1-5
  coin_graphic : "assets/coin.png",
  goal_graphic : "assets/flag.png",
  bg_image : "assets/background.png",
  sfx : {
    coin : "assets/sfx/coin.m4a",
    death : "assets/sfx/death.m4a",
    jump : "assets/sfx/jump.m4a",
    win : "assets/sfx/win.m4a",
  },
  debug : false // set to true to show bounding box
};
````

##### JumpSlide.player
A reference to the current player object.  
You can access some useful properties and methods including:  
_this information is repeated in this document below_

````
JumpSlide.player.position.x : Number // x position
JumpSlide.player.position.y : Number // y position
JumpSlide.player.vx : Number // x velocity
JumpSlide.player.vy : Number // y velocity
JumpSlide.player.stageX :  Number // the virtual x position in the game
JumpSlide.player.width : Number
JumpSlide.player.height : Number
JumpSlide.player.running : Boolean
JumpSlide.player.on_platform : Boolean
JumpSlide.player.is_jumping : Boolean
JumpSlide.player.is_sliding : Boolean
JumpSlide.player.states = {
	idle : Sprite,
	duck : Sprite,
	jump : Sprite,
	run : MovieClip
}
JumpSlide.player.set_state( new_state ) // where new_state is one of the values in JumpSlide.player.states
JumpSlide.player.check_collision( DisplayObject ) : Boolean
````

_This is an instance of PIXI.DisplayObjectContainer with interchanging children of types PIXI.Sprite and PIXI.MovieClip_

##### JumpSlide.platforms

A reference to the Array containing all platforms that have been added to the stage.  
_each platform in the array is an instance of PIXI.Sprite_

##### JumpSlide.coins

A reference to the Array containing all coins that have been added to the stage.  
_each coin in the array is an instance of PIXI.Sprite_

##### JumpSlide.goals

A reference to the Array containing all goals that have been added to the stage.  
_each goal in the array is an instance of PIXI.Sprite_

##### JumpSlide.score

A reference to the player's current score
_JumpSlide.score is of type Number and starts at 0_

##### JumpSlide.score_board

A reference to the score_board object on the upper right of the stage.  
You can change the text by calling the `JumpSlide.score_board.setText( new_text )` method, where new_text is a String.  
_JumpSlide.score_board is an instance of PIXI.Text_


##### JumpSlide.stage
_The PIXI.Stage instance that is rendered every frame._


### JumpSlide public methods

#### JumpSlide.start()

Initializes and starts the JumpSlide game engine.  
Nothing will or can be rendered unless this function is called somewhere in `GAME.init()`

example:

````
JumpSlide.start()
````

This should only be called once during the initialization phase of your game.  
_This function loads assets, initializes the JumpSlide.player object, adds graphics to be rendered, adds event listeners for user interaction, then kicks off the render loop_


#### JumpSlide.addPlatform( x, y, width, height )

Creates a new platform with dimensions defined by the `width` and `height` arguments, and adds it to the stage at the location defined by the `x` and `y` arguments.  
The player can jump and run on platforms.  
If the player runs into a platform, the game is over.

example:

````
JumpSlide.addPlatform( 90, 500, 200, 10 );
````

this will create a platform at position `{ x: 90, y: 500 }`  
with the dimensions of `{ width: 200, height: 10 }`  
units are in pixels

_creating a platform will add it to the JumpSlide.platforms array_  
_the JumpSlide engine enables platforms to be jumped on, and make the player lose if the player hits a platform horizontally_

#### JumpSlide.addGoal( x, y )

Creates a new goal and adds it to the stage at the location defined by the `x` and `y` arguments.  
If the player touches a goal, the game is won.  

example:

````
JumpSlide.addGoal( 2845, 650 );
````

this will create a goal at position `{ x: 2845, y: 650 }`  
units are in pixels


#### JumpSlide.addCoin( x, y )

Creates a new coin and adds it to the stage at the location defined by the `x` and `y` arguments.  

example:

````
JumpSlide.addCoin( 2080, 70 );
````

this will add a coin at position `{ x: 2080, y: 70 }`  
_creating a coin will add it to the JumpSlide.coins array_


#### JumpSlide.collectCoin( coin )
 
Triggers the coin (passed in by the `coin` argument) to be collected.  
This will increase the `JumpSlide.score` by 1.  
This will remove the `coin` from the stage.  

example:

````
JumpSlide.collectCoin( coin );
````

_the coin that is collected is also removed from the `JumpSlide.coins` array_



#### JumpSlide.createSprite( image_path, x, y )

Creates a new sprite using the image you provide and adds it to the stage at the location defined by the `x` and `y` arguments.  
You should assign the created sprite to a new variable.

example:

````
var airship = JumpSlide.createSprite( "assets/graphic-24.png", 900, 200 );
````

This will create a new sprite using the image file `assets/graphic-24.png` and position the sprite at `{ x: 900, y: 200 }`  
then, the newly created sprite will be stored in the variable named `airship`  
The image is just decorative by default, the user will initially not have any collision detection applied to it.  
The sprites will also (by default), "stick" to the screen, unless you move it (translate the `.position` values).  
units are in pixels

````
var end_game_screen = JumpSlide.createSprite( "assets/end_overlay.png" );
````

this will create a new sprite using the image file `assets/end_overlay.png` and position the sprite in the center of the stage  
then, the newly created sprite will be stored in the variable named `end_game_screen`  

_by default, the sprite will be anchored in the center, and positioned in the middle of the screen._
_sprites created this way are not internally stored by the engine, you may manually track them by creating a new Array or Object to store a reference to the sprite._
_the newly created sprite is an instance of PIXI.Sprite_

#### JumpSlide.removeSprite( sprite_variable )

Removes a sprite from the stage by passing in the actual sprite object as the `sprite_variable` argument.

example:

````
JumpSlide.removeSprite( airship );
````

This will remove a sprite that has previously been created using `JumpSlide.createSprite()`. This is why it is helpful to store new sprites in a variable.


#### JumpSlide.forEachPlatform( callback_function )

callback_function is a `Function` definition, with signature:  

````
platform : Sprite  // a platform in the JumpSprite.platforms array
````

Loops through the `JumpSlide.platforms` array and calls the `callback_function` for each platform in the `JumpSlide.platforms` array, while providing the individual `platform` object in each call.  

an example using callback functions:

````
JumpSlide.forEachPlatform( function(platform){
  // do something with this platform
});
````

another example:

````
JumpSlide.forEachPlatform( function(platform){
  
  // translate it's x position
  platform.position.x -= JumpSlide.SETTINGS.run_speed;

});
````

This will move every platform to the left.

_it is recommended to use `JumpSlide.forEachPlatform()` rather than manually looping through each object in the `JumpSlide.platforms array`_


#### JumpSlide.forEachCoin( callback_function )

callback_function is a `Function` definition, with signature:  

````
coin : Sprite  // a coin in the JumpSprite.coins array
````

Loops through the `JumpSlide.coins` array and calls the `callback_function` for each coin in the `JumpSlide.coins` array, while providing the individual `coin` object in each call.  

an example using callback functions:

````
JumpSlide.forEachCoin( function(coin){
  // do something with this coin
});
````

another example:

````
JumpSlide.forEachCoin( function(coin){
  
  // translate it's x position
  coin.position.x -= JumpSlide.SETTINGS.run_speed;

});
````

This will move every coin to the left.

_it is recommended to use `JumpSlide.forEachCoin()` rather than manually looping through each object in the `JumpSlide.coins array`_


#### JumpSlide.forEachGoal( callback_function )

callback_function is a `Function` definition, with signature:  

````
goal : Sprite  // a goal in the JumpSprite.goals array
````

Loops through the `JumpSlide.goals` array and calls the `callback_function` for each goal in the `JumpSlide.goals` array, while providing the individual `goal` object in each call.  

an example using callback functions:

````
JumpSlide.forEachGoal( function(goal){
  // do something with this goal
});
````

another example:

````
JumpSlide.forEachGoal( function(goal){
  
  // translate it's x position
  goal.position.x -= JumpSlide.SETTINGS.run_speed;

});
````

This will move every goal to the left.

_it is recommended to use `JumpSlide.forEachGoal()` rather than manually looping through each object in the `JumpSlide.goals array`_


#### JumpSlide.game_win( )

Stops the game loop, displays the endgame user interface, and calls the `GAME.win()` function.  
Call this function when the player wins the game.  

example:

````
JumpSlide.game_win( );
````

_If there is any additional code to be run when the player wins the game, add that code to `GAME.win()`_


#### JumpSlide.game_lose( )

Stops the game loop, displays the endgame user interface, and calls the `GAME.lose()` function.  
Call this function when the player loses the game.  

example:

````
JumpSlide.game_lose( );
````

_This function may be called by the JumpSlide game engine when other events occur._  
_If there is any additional code to be run when the player loses the game, add that code to `GAME.lose()`_


## JumpSlide.player API

These methods have been added to the `JumpSlide.player` object internally, by the JumpSlide engine.  
**You probably won't need to call these methods often**  
_Technical details will be noted in italics, they are safe to ignore_


### JumpSlide.player public properties

##### JumpSlide.player.position.x : Number
the player's `x` position

##### JumpSlide.player.position.y : Number
the player's `y` position

##### JumpSlide.player.vx : Number
the player's `x` velocity

##### JumpSlide.player.vy : Number
the player's `y` velocity

##### JumpSlide.player.stageX :  Number
the player's the virtual `x` position in the game

##### JumpSlide.player.width : Number
the player's `width`

##### JumpSlide.player.height : Number
the player's `height`

##### JumpSlide.player.running : Boolean
returns `true` if the player is currently running, jumping, or sliding, else returns `false`

##### JumpSlide.player.on_platform : Boolean
returns `true` if the player is currently standing, running, or sliding on a platform, else returns `false`

##### JumpSlide.player.is_jumping : Boolean
returns `true` if the player is currently running, else returns `false`

##### JumpSlide.player.is_sliding : Boolean
returns `true` if the player is currently sliding on a platform, else returns `false`

##### JumpSlide.player.states : Object < Sprite|MovieClip >
the player will be set to any one of these four states.  
this determines what graphic(`Sprite`) or animation(`MovieClip`) is being displayed to represent the player object.  

````
	idle : Sprite
	duck : Sprite
	jump : Sprite
	run : MovieClip
````
These states can be accessed using dot notation, for example, to access the `jump` state.  

````
JumpSlide.player.states.jump
````

### JumpSlide.player public methods

##### JumpSlide.player.set_state( new_state )
The `new_state` argument must be one of the values defined in `JumpSlide.player.states`  
This changes what graphic or animation is being displayed to represent the player.  
**You probably do not have to call this method explicitly, the JumpSlide engine will manage the state for you**  
_This state also has many other side effects, use with care!_

##### JumpSlide.player.check_collision( sprite ) : Boolean
returns `true` if the player is currently colliding _"touching"_ with the object passed in as the `sprite` arugment, else returns `false`  
_the `sprite` argument may be any descendant of `PIXI.DisplayObject`_

example, if there is a sprite stored in a variable named `airship` :

````
if( JumpSlide.player.check_collision( airship ) ){
  // player is touching airship, do something
}else{
  // player is not touching airship, do something or nothing
}
````

##### JumpSlide.player.jump( )
Makes the player jump only if the player is currently on a platform.  

##### JumpSlide.player.slide( )
Makes the player start sliding only if the player is currently on a platform.  
Calling the `JumpSlide.player.slide()` function will keep the player in the `slide` state, you must call the `JumpSlide.player.stop_sliding()` method to stop sliding.  
_the player will be set to state `duck`_

##### JumpSlide.player.stop_sliding( )
Makes the player stop sliding only if the player is currently sliding.  


## Debugging

During any development, you should always have your Chrome Javascript Console  
![Chrome JS Console](http://i.imgur.com/aFLxvjw.png =500x)  

and have the console always visible so you can see errors  
any errors will be in **red**, for example:  
![Error](http://i.imgur.com/2AVNOYc.png =500x)

You can use the console to inspect object properties  
For example, type `JumpSlide.player` and `JumpSlide.player.properties` in the interactive console.  
![Using the console](http://i.imgur.com/fDrL8PU.png =500x)

_advanced_  
You can enable showing the players bounding box by enabling JumpSlide.SETTINGS.debug

````
JumpSlide.SETTINGS.debug = true;
````