if(localStorage.counter === "0"){

  GAME = {};

  /**
   * Runs once, at the beginning of the application
   * 
   * @param  {Object} JumpSlide The Game Engine
  */
  GAME.init = function (JumpSlide) {
    localStorage.coins = "0";

    
  }

  /**
   * Runs every animation game loop
   *   60 times per second
   *   Only write code in here that should be run many times!
   *   
   * @param  {Object} JumpSlide The Game Engine
  */
  GAME.loop = function (JumpSlide) {
    

  }

  /**
   * Runs once, when the player taps or clicks the stage
   * 
   * @param  {Point} point  the position of the touch event
  */
  GAME.tap = function ( point ) {

    
  }

  /**
   * Runs once, when the player holds the tap or mouse button down
   * 
   * @param  {Point} point  the position of the touch event
   */
  GAME.touch_start = function ( point ) {
    

  }

  /**
   * Runs once, when the player releases the tap or mouse button
   * 
   * @param  {Point} point  the position of the touch event
  */
  GAME.touch_end = function ( point ) {
    

  }

  /**
   * Runs once, when the player wins the game
   * 
   * @param  {Object} JumpSlide The Game Engine
  */
  GAME.win = function (JumpSlide) {
    // advance to this level when you win
    localStorage.counter = "0";
  }

  /**
   * Runs once, when the player loses the game
   * 
   * @param  {Object} JumpSlide The Game Engine
   */
  GAME.lose = function (JumpSlide) {
    // lose the game and repeat from the beginning
    localStorage.counter = "0";
  }
}