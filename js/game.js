var SETTINGS = {
  background_color : 0x66FF99,
  ipad_dimensions : [1024, 768],
  starting_point : {
    x : 100,
    y : 200
  },
  gravity : 0.9,
  run_speed : 2,
  controls : {
    up : 300, // click area, top
    right : 700 // click area, right
  },
  jump_velocity : -15
}

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



// interaction
stage.click = stage.touchstart = function (event) {
  // console.log('event',event);
  
  if( event.originalEvent.clientY < SETTINGS.controls.up ){
    bunny.jump();
  }else
  if( event.originalEvent.clientX > SETTINGS.controls.right ){
    bunny.running = true;
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
  console.log('this.on_platform',this.on_platform);
  if(this.on_platform){
    this.vy = SETTINGS.jump_velocity;
    this.is_jumping = true;
  }
}