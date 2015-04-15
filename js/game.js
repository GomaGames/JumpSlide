var SETTINGS = {
  background_color : 0x66FF99,
  ipad_dimensions : [1024, 768],
  starting_point : {
    x : 100,
    y : 200
  },
  gravity : 0.9
  
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
bunny.anchor.y = 1;
bunny.vy = 0;

// move the sprite to starting point
bunny.position.x = SETTINGS.starting_point.x;
bunny.position.y = SETTINGS.starting_point.y;
bunny.new_position = { x:0, y:0 };

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


// game loop
function animate() {

    requestAnimFrame( animate );

    // add gravity
    bunny.vy += SETTINGS.gravity;

    // calculate gravity
    bunny.new_position.y += bunny.vy;

    // land on platforms
    console.log('bunny.checkCollision(p1)',bunny.checkCollision(p1));
    if( !bunny.checkCollision(p1) ){
      // apply gravity
      bunny.position.y = bunny.new_position.y;
    }else{
      if( bunny.vy > 0 ){ // applying gravity
        bunny.position.y = p1.y;
      }
    }
  
    // render the stage   
    renderer.render(stage);
}

PIXI.Sprite.prototype.checkCollision = checkCollision;

function checkCollision(displayObject) {
  var myBox = this.getLocalBounds();
  myBox.x = this.position.x;
  myBox.y = this.position.y;
  var otherBox = displayObject.getLocalBounds();
  otherBox.x = displayObject.position.x;
  otherBox.y = displayObject.position.y;

  // console.log(myBox, otherBox);
  return !(otherBox.x > (myBox.x + myBox.width)  || 
           (otherBox.x + otherBox.width ) < myBox.x || 
           otherBox.y > (myBox.y + myBox.height) ||
           (otherBox.y + otherBox.height) < myBox.y);
};