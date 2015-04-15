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
var p1 = new PIXI.Graphics();
p1.position.x = 90;
p1.position.y = 500;

p1.beginFill(0xFFFF00);

// set the line style to have a width of 5 and set the color to red
p1.lineStyle(1, 0xFF0000);

// draw a rectangle
p1.drawRect( 0, 0, 200, 10 );

p1.endFill();

stage.addChild( p1 );


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

    // movement
    if( bunny.running ){
      // move the stage, not the bunny
      p1.position.x -= SETTINGS.run_speed;
    }


    // add gravity
    bunny.vy += SETTINGS.gravity;

    // apply vertical velocity
    bunny.position.y += bunny.vy;

    
    // free fall
    if( bunny.is_jumping || !bunny.checkCollision(p1) ){

      bunny.on_platform = false;
      bunny.is_jumping = false;

    // colliding with platform
    }else{

      bunny.on_platform = true;

      bunny.position.y = p1.y;
      bunny.vy = 0;
      
    }
  
    // render the stage   
    renderer.render(stage);
}

PIXI.Sprite.prototype.checkCollision = function (displayObject) {
  var myBox = this.getLocalBounds();
  myBox.x = this.position.x;
  myBox.y = this.position.y;
  var otherBox = displayObject.getLocalBounds();
  otherBox.x = displayObject.position.x;
  otherBox.y = displayObject.position.y;

  // console.log(myBox, otherBox);
  return !(otherBox.x > (myBox.x + myBox.width/2)  || 
           (otherBox.x + otherBox.width ) < myBox.x || 
           otherBox.y > (myBox.y + myBox.height/2) ||
           (otherBox.y + otherBox.height) < myBox.y);
};


PIXI.Sprite.prototype.jump = function () {
  
  if(this.on_platform){
    this.vy = SETTINGS.jump_velocity;
    this.is_jumping = true;
  }
}