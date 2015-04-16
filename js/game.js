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

  // JumpSlide.addPlatform(2080, 70, coin, coin);
  // JumpSlide.addPlatform(2140, 50, coin, coin);
  // JumpSlide.addPlatform(2200, 100, coin, coin);
  // JumpSlide.addPlatform(2250, 180, coin, coin);
  // JumpSlide.addPlatform(2280, 250, coin, coin);
  // JumpSlide.addPlatform(2320, 375, coin, coin);
  // JumpSlide.addPlatform(2345, 600, coin, coin);


  /* Lower Route */
  JumpSlide.addPlatform(1610, floor_position, 1000, floor_height);
  JumpSlide.addPlatform(2740, floor_position, 1000, floor_height);

  JumpSlide.start();
}

GAME.loop = function (JumpSlide) {
  
}

GAME.win = function (JumpSlide) {
  
}

GAME.lose = function (JumpSlide) {
  
}