GAME = {};
GAME.init = function (JumpSlide) {

  var platform_height = 45;
  var platform_width = 200;
  var floor_height = 68;
  var floor_position = 700;
  var coin = 50;


  JumpSlide.addPlatform(50, floor_position, 300, floor_height);
  JumpSlide.addPlatform(480, floor_position, 1000, floor_height);

  /* Upper Route */
  // JumpSlide.addPlatform(825, 517, coin, coin);
  JumpSlide.addPlatform(750, 580, platform_width, platform_height);
  // JumpSlide.addPlatform(825, 637, coin, coin);

  // JumpSlide.addPlatform(1110, 370, coin, coin);
  JumpSlide.addPlatform(1060, 480, platform_width, platform_height);

  // JumpSlide.addPlatform(1390, 270, coin, coin);
  JumpSlide.addPlatform(1350, 380, platform_width, platform_height);

  // JumpSlide.addPlatform(1690, 170, coin, coin);
  JumpSlide.addPlatform(1640, 280, platform_width, platform_height);

  // JumpSlide.addPlatform(1990, 70, coin, coin);
  JumpSlide.addPlatform(1920, 180, platform_width, platform_height);

  JumpSlide.addCoin(2080, 70);
  JumpSlide.addCoin(2140, 100);
  JumpSlide.addCoin(2250, 180);
  JumpSlide.addCoin(2280, 250);
  JumpSlide.addCoin(2320, 375);
  JumpSlide.addCoin(2345, 600);
  

  /* Lower Route */
  JumpSlide.addPlatform(1610, floor_position, 1000, floor_height);
  JumpSlide.addPlatform(2740, floor_position, 1000, floor_height);

  // win condition
  JumpSlide.addGoal(2845, 650);

  JumpSlide.start();

}

GAME.loop = function (JumpSlide) {

  // make the player run right
  // by looping through each platform
  JumpSlide.forEachPlatform(function(platform) {
    // translate it's x position
    platform.position.x -= JumpSlide.SETTINGS.run_speed;
  });

  // loop through each coin
  JumpSlide.forEachCoin(function(coin) {

    // translate it's x position
    coin.position.x -= JumpSlide.SETTINGS.run_speed;

    // check if player is touching coin
    if(JumpSlide.player.check_collision(coin)){

      // collect the coin to score
      JumpSlide.collectCoin(coin);

      // play coin sound effects
      JumpSlide.sfx.coin.play();
    }
  });

  // loop through each platform
  JumpSlide.forEachGoal(function(goal) {
    // translate it's x position
    goal.position.x -= JumpSlide.SETTINGS.run_speed;

    // victory condition
    if(JumpSlide.player.check_collision(goal)){
      JumpSlide.game_win();
    }
  });

  // check if player falls, then lose game
  if( JumpSlide.player.position.y >= JumpSlide.SETTINGS.ipad_dimensions.height ){
    JumpSlide.game_lose();
  }

}

GAME.tap = function ( point ) {

  // check if player touches top part of screen
  if( point.y < JumpSlide.SETTINGS.controls.up ){

    // make player jump
    JumpSlide.player.jump();
  }
  
}

GAME.touch_start = function ( point ) {

  // check if player touches bottom part of screen
  if( point.y > JumpSlide.SETTINGS.controls.down ){

    // make player start sliding
    JumpSlide.player.slide();
  }

}

GAME.touch_end = function ( point ) {

  JumpSlide.player.stop_sliding();

}

GAME.win = function (JumpSlide) {
  
}

GAME.lose = function (JumpSlide) {
  
}