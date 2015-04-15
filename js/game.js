var SETTINGS = {
  background_color : 0x66FF99,
  ipad_dimensions : [1024, 768],
  starting_point : {
    x : 100,
    y : 200
  },
  win_point : 2000,
  gravity : 0.9,
  run_speed : 2,
  controls : {
    up : 300, // click area, top
    right : 700 // click area, right
  },
  jump_velocity : 15
}
var GAME_STATES = {
  start : "start",
  playing : "playing",
  end : "end"
};
var GAME_STATE = GAME_STATES.start;

var platforms = [];

// create an new instance of a pixi stage
var stage = new PIXI.Stage(SETTINGS.background_color);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer.apply(this, SETTINGS.ipad_dimensions);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame( animate );

// create a texture from an image path
var texture = PIXI.Texture.fromImage("assets/bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// move the sprite's anchor point to feet
bunny.anchor.x = 0.5;
bunny.anchor.y = 1.0;
// bunny.anchor.y = 1;
bunny.vy = 0;
bunny.stageX = 0;

// move the sprite to starting point
bunny.position.x = SETTINGS.starting_point.x;
bunny.position.y = SETTINGS.starting_point.y;
bunny.new_position = bunny.position;

bunny.on_platform = false;
bunny.is_jumping = false;

stage.addChild(bunny);



// platforms

addPlatform(90, 500, 200, 10);
addPlatform(320, 470, 200, 20);
addPlatform(540, 450, 200, 30);
addPlatform(740, 500, 200, 10);
addPlatform(970, 600, 200, 40);
addPlatform(1090, 500, 200, 10);
addPlatform(1320, 470, 200, 20);
addPlatform(1540, 450, 200, 30);
addPlatform(1740, 500, 200, 10);
addPlatform(1970, 600, 200, 40);



// interaction
stage.click = stage.touchstart = function (event) {
  
  if( GAME_STATE == GAME_STATES.playing ){

    if( event.originalEvent.clientY < SETTINGS.controls.up ){
      bunny.jump();
    }

  }else if( GAME_STATE == GAME_STATES.start ){

    bunny.running = true;
    GAME_STATE = GAME_STATES.playing;

  }else if( GAME_STATE == GAME_STATES.end ){

    // restart game
    location.reload();

  }
};


// game loop
function animate() {

    requestAnimFrame( animate );

    // add gravity
    bunny.vy += SETTINGS.gravity;

    // apply vertical velocity
    bunny.position.y += bunny.vy;

    bunny.on_platform = platforms.reduce(function (p,c,i,a) {
      return p || bunny.check_collision(c);
    },false);

    bunny.free_fall();

    platforms.forEach(function (platform) {
      // movement
      if( bunny.running ){
        // move the stage, not the bunny
        platform.position.x -= SETTINGS.run_speed;
      }

    });

    if( GAME_STATE == GAME_STATES.playing ){
      
      if( bunny.stageX >= SETTINGS.win_point ){

        game_win();

      }else
      if( bunny.position.y >= SETTINGS.ipad_dimensions[1] ){
        
        game_lose();

      }else{

        bunny.stageX += SETTINGS.run_speed;
        
      }

    } // end GAME_SATES.playing
  
    // render the stage   
    renderer.render(stage);
}


function addPlatform ( x, y, width, height ) {

  var platform = new PIXI.Graphics();
  platform.position.x = x;
  platform.position.y = y;

  platform.beginFill(0xFFFF00);

  // set the line style to have a width of 5 and set the color to red
  platform.lineStyle(1, 0xFF0000);

  // draw a rectangle
  platform.drawRect( 0, 0, width, height );

  platform.endFill();

  stage.addChild( platform );

  platforms.push(platform);
  
}

function game_win () {
  bunny.running = false;
  GAME_STATE = GAME_STATES.end;

  var texture = PIXI.Texture.fromImage("assets/WIN_GAME.png");
  var winsprite = new PIXI.Sprite(texture);

  // move the sprite's anchor point to feet
  winsprite.anchor.x = 0.5;
  winsprite.anchor.y = 0.5;
  winsprite.position.x = SETTINGS.ipad_dimensions[0]/2;
  winsprite.position.y = SETTINGS.ipad_dimensions[1]/2;

  stage.addChild( winsprite );
}
function game_lose () {
  bunny.running = false;
  GAME_STATE = GAME_STATES.end;

  var texture = PIXI.Texture.fromImage("assets/END_GAME.png");
  var losesprite = new PIXI.Sprite(texture);

  // move the sprite's anchor point to feet
  losesprite.anchor.x = 0.5;
  losesprite.anchor.y = 0.5;
  losesprite.position.x = SETTINGS.ipad_dimensions[0]/2;
  losesprite.position.y = SETTINGS.ipad_dimensions[1]/2;

  stage.addChild( losesprite );
}

PIXI.Sprite.prototype.check_collision = function (displayObject) {
  var myBox = this.getLocalBounds();
  myBox.x = this.position.x;
  myBox.y = this.position.y;
  var otherBox = displayObject.getLocalBounds();
  otherBox.x = displayObject.position.x;
  otherBox.y = displayObject.position.y;

  // console.log(myBox, otherBox);
  var colliding = !(otherBox.x > (myBox.x + myBox.width/2)  || 
           (otherBox.x + otherBox.width ) < myBox.x || 
           otherBox.y > (myBox.y + myBox.height/2) ||
           (otherBox.y + otherBox.height) < myBox.y);

  if( colliding ) this.collide_with_platform( displayObject );

  return colliding;
};


PIXI.Sprite.prototype.free_fall = function () {
  
  this.is_jumping = false;

}

PIXI.Sprite.prototype.collide_with_platform = function (platform) {
  
  if( !this.is_jumping ){

    this.position.y = platform.y;
    this.vy = 0;
  }

}

PIXI.Sprite.prototype.jump = function () {
  if(this.on_platform){
    this.vy = -SETTINGS.jump_velocity;
    this.is_jumping = true;
  }
}