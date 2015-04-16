/**
 * Expose Public API
 *
 * Tightly coupled public hooks from and to GAME object
 *
 * GAME object calls JumpSlide.start()
 * 
 */

JumpSlide = {};
// default settings
JumpSlide.SETTINGS = {
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
JumpSlide.stage = new PIXI.Stage(JumpSlide.SETTINGS.background_color);
JumpSlide.player = null;
JumpSlide.platforms = [];


/**
 * Private Engine IIFE
 */
(function () {

  var GAME_STATES = {
    start : "start",
    playing : "playing",
    end : "end"
  };
  var GAME_STATE = GAME_STATES.start;

  // create a renderer instance
  var renderer = PIXI.autoDetectRenderer.apply(this, JumpSlide.SETTINGS.ipad_dimensions);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  JumpSlide.start = function(){
    requestAnimFrame( animate );
  }

  // character
  
  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("assets/bunny.png");
  // create a new Sprite using the texture
  JumpSlide.player = new PIXI.Sprite(texture);

  // move the sprite's anchor point to feet
  JumpSlide.player.anchor.x = 0.5;
  JumpSlide.player.anchor.y = 1.0;
  // JumpSlide.player.anchor.y = 1;
  JumpSlide.player.vy = 0;
  JumpSlide.player.stageX = 0;

  // move the sprite to starting point
  JumpSlide.player.position.x = JumpSlide.SETTINGS.starting_point.x;
  JumpSlide.player.position.y = JumpSlide.SETTINGS.starting_point.y;
  JumpSlide.player.new_position = JumpSlide.player.position;

  JumpSlide.player.on_platform = false;
  JumpSlide.player.is_jumping = false;

  JumpSlide.stage.addChild(JumpSlide.player);



  // start screen
  var start_texture = PIXI.Texture.fromImage("assets/START_GAME.png");
  var startsprite = new PIXI.Sprite(start_texture);

  // move the sprite's anchor point to feet
  startsprite.anchor.x = 0.5;
  startsprite.anchor.y = 0.5;
  startsprite.position.x = JumpSlide.SETTINGS.ipad_dimensions[0]/2;
  startsprite.position.y = JumpSlide.SETTINGS.ipad_dimensions[1]/2;
  JumpSlide.stage.addChild(startsprite);

  // interaction
  JumpSlide.stage.click = JumpSlide.stage.touchstart = function (event) {
    var touched = {};
    if( event.originalEvent.toString() == "[object TouchEvent]" ){
      touched = event.global;
    }else{
      touched.x = event.originalEvent.clientX;
      touched.y = event.originalEvent.clientY;
    }

    if( GAME_STATE == GAME_STATES.playing ){

      if( touched.y < JumpSlide.SETTINGS.controls.up ){
        JumpSlide.player.jump();
      }

    }else if( GAME_STATE == GAME_STATES.start ){

      JumpSlide.player.running = true;
      GAME_STATE = GAME_STATES.playing;
      JumpSlide.stage.removeChild(startsprite);

    }else if( GAME_STATE == GAME_STATES.end ){

      // restart game
      location.reload();

    }
  };


  // game loop
  function animate() {

    requestAnimFrame( animate );

    // add gravity
    JumpSlide.player.vy += JumpSlide.SETTINGS.gravity;

    // apply vertical velocity
    JumpSlide.player.position.y += JumpSlide.player.vy;

    JumpSlide.player.on_platform = JumpSlide.platforms.reduce(function (p,c,i,a) {
      return p || JumpSlide.player.check_collision(c);
    },false);

    JumpSlide.player.free_fall();

    JumpSlide.platforms.forEach(function (platform) {
      // movement
      if( JumpSlide.player.running ){
        // move the stage, not the JumpSlide.player
        platform.position.x -= JumpSlide.SETTINGS.run_speed;
      }

    });

    if( GAME_STATE == GAME_STATES.playing ){
      
      if( JumpSlide.player.stageX >= JumpSlide.SETTINGS.win_point ){

        game_win();

      }else
      if( JumpSlide.player.position.y >= JumpSlide.SETTINGS.ipad_dimensions[1] ){
        
        game_lose();

      }else{

        JumpSlide.player.stageX += JumpSlide.SETTINGS.run_speed;
        
      }

    } // end GAME_SATES.playing
  
    // render the stage   
    renderer.render( JumpSlide.stage );

    GAME.loop( JumpSlide );
  }

  game_win = function() {
    JumpSlide.player.running = false;
    GAME_STATE = GAME_STATES.end;

    var texture = PIXI.Texture.fromImage("assets/WIN_GAME.png");
    var winsprite = new PIXI.Sprite(texture);

    // move the sprite's anchor point to feet
    winsprite.anchor.x = 0.5;
    winsprite.anchor.y = 0.5;
    winsprite.position.x = JumpSlide.SETTINGS.ipad_dimensions[0]/2;
    winsprite.position.y = JumpSlide.SETTINGS.ipad_dimensions[1]/2;

    JumpSlide.stage.addChild( winsprite );

    GAME.win( JumpSlide );
  }

  game_lose = function() {
    JumpSlide.player.running = false;
    GAME_STATE = GAME_STATES.end;

    var texture = PIXI.Texture.fromImage("assets/END_GAME.png");
    var losesprite = new PIXI.Sprite(texture);

    // move the sprite's anchor point to feet
    losesprite.anchor.x = 0.5;
    losesprite.anchor.y = 0.5;
    losesprite.position.x = JumpSlide.SETTINGS.ipad_dimensions[0]/2;
    losesprite.position.y = JumpSlide.SETTINGS.ipad_dimensions[1]/2;

    JumpSlide.stage.addChild( losesprite );

    GAME.lose( JumpSlide );
  }

})();



JumpSlide.addPlatform = function ( x, y, width, height ) {

  var platform = new PIXI.Graphics();
  platform.position.x = x;
  platform.position.y = y;

  platform.beginFill(0xFFFF00);

  // set the line style to have a width of 5 and set the color to red
  platform.lineStyle(1, 0xFF0000);

  // draw a rectangle
  platform.drawRect( 0, 0, width, height );

  platform.endFill();

  JumpSlide.stage.addChild( platform );

  JumpSlide.platforms.push(platform);
  
}

GAME.init(JumpSlide);


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
    this.vy = -JumpSlide.SETTINGS.jump_velocity;
    this.is_jumping = true;
  }
}