// default settings
JUMPJS = {};
JUMPJS.SETTINGS = {
  background_color : 0x66FF99,
  ipad_dimensions : [1024, 768],
  starting_point : {
    x : 100,
    y : 200
  },
  win_point : 4000,
  gravity : 0.9,
  run_speed : 5,
  controls : {
    up : 300, // click area, top
    right : 700 // click area, right
  },
  jump_velocity : 15
}
JUMPJS.stage = new PIXI.Stage(JUMPJS.SETTINGS.background_color);
JUMPJS.player = null;
JUMPJS.platforms = [];
JUMPJS.init = function() {
  
  var GAME_STATES = {
    start : "start",
    playing : "playing",
    end : "end"
  };
  var GAME_STATE = GAME_STATES.start;

  // create a renderer instance
  var renderer = PIXI.autoDetectRenderer.apply(this, JUMPJS.SETTINGS.ipad_dimensions);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimFrame( animate );

  // character
  
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
  bunny.position.x = JUMPJS.SETTINGS.starting_point.x;
  bunny.position.y = JUMPJS.SETTINGS.starting_point.y;
  bunny.new_position = bunny.position;

  bunny.on_platform = false;
  bunny.is_jumping = false;

  JUMPJS.stage.addChild(bunny);



  // start screen
  var start_texture = PIXI.Texture.fromImage("assets/START_GAME.png");
  var startsprite = new PIXI.Sprite(start_texture);

  // move the sprite's anchor point to feet
  startsprite.anchor.x = 0.5;
  startsprite.anchor.y = 0.5;
  startsprite.position.x = JUMPJS.SETTINGS.ipad_dimensions[0]/2;
  startsprite.position.y = JUMPJS.SETTINGS.ipad_dimensions[1]/2;
  JUMPJS.stage.addChild(startsprite);

  // interaction
  JUMPJS.stage.click = JUMPJS.stage.touchstart = function (event) {
    var touched = {};
    if( event.originalEvent.toString() == "[object TouchEvent]" ){
      touched = event.global;
    }else{
      touched.x = event.originalEvent.clientX;
      touched.y = event.originalEvent.clientY;
    }
    
    if( GAME_STATE == GAME_STATES.playing ){

      if( touched.y < JUMPJS.SETTINGS.controls.up ){
        bunny.jump();
      }

    }else if( GAME_STATE == GAME_STATES.start ){

      bunny.running = true;
      GAME_STATE = GAME_STATES.playing;
      JUMPJS.stage.removeChild(startsprite);

    }else if( GAME_STATE == GAME_STATES.end ){

      // restart game
      location.reload();

    }
  };


  // game loop
  function animate() {

      requestAnimFrame( animate );

      // add gravity
      bunny.vy += JUMPJS.SETTINGS.gravity;

      // apply vertical velocity
      bunny.position.y += bunny.vy;

      bunny.on_platform = JUMPJS.platforms.reduce(function (p,c,i,a) {
        return p || bunny.check_collision(c);
      },false);

      bunny.free_fall();

      JUMPJS.platforms.forEach(function (platform) {
        // movement
        if( bunny.running ){
          // move the stage, not the bunny
          platform.position.x -= JUMPJS.SETTINGS.run_speed;
        }

      });

      if( GAME_STATE == GAME_STATES.playing ){
        
        if( bunny.stageX >= JUMPJS.SETTINGS.win_point ){

          game_win();

        }else
        if( bunny.position.y >= JUMPJS.SETTINGS.ipad_dimensions[1] ){
          
          game_lose();

        }else{

          bunny.stageX += JUMPJS.SETTINGS.run_speed;
          
        }

      } // end GAME_SATES.playing
    
      // render the stage   
      renderer.render( JUMPJS.stage );
  }


  function game_win () {
    bunny.running = false;
    GAME_STATE = GAME_STATES.end;

    var texture = PIXI.Texture.fromImage("assets/WIN_GAME.png");
    var winsprite = new PIXI.Sprite(texture);

    // move the sprite's anchor point to feet
    winsprite.anchor.x = 0.5;
    winsprite.anchor.y = 0.5;
    winsprite.position.x = JUMPJS.SETTINGS.ipad_dimensions[0]/2;
    winsprite.position.y = JUMPJS.SETTINGS.ipad_dimensions[1]/2;

    JUMPJS.stage.addChild( winsprite );
  }
  function game_lose () {
    bunny.running = false;
    GAME_STATE = GAME_STATES.end;

    var texture = PIXI.Texture.fromImage("assets/END_GAME.png");
    var losesprite = new PIXI.Sprite(texture);

    // move the sprite's anchor point to feet
    losesprite.anchor.x = 0.5;
    losesprite.anchor.y = 0.5;
    losesprite.position.x = JUMPJS.SETTINGS.ipad_dimensions[0]/2;
    losesprite.position.y = JUMPJS.SETTINGS.ipad_dimensions[1]/2;

    JUMPJS.stage.addChild( losesprite );
  }
  
}
JUMPJS.init();


JUMPJS.addPlatform = function ( x, y, width, height ) {

  var platform = new PIXI.Graphics();
  platform.position.x = x;
  platform.position.y = y;

  platform.beginFill(0xFFFF00);

  // set the line style to have a width of 5 and set the color to red
  platform.lineStyle(1, 0xFF0000);

  // draw a rectangle
  platform.drawRect( 0, 0, width, height );

  platform.endFill();

  JUMPJS.stage.addChild( platform );

  JUMPJS.platforms.push(platform);
  
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
    this.vy = -JUMPJS.SETTINGS.jump_velocity;
    this.is_jumping = true;
  }
}