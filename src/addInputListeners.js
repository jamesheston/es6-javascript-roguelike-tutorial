export const addInputListeners = function() {
  // Catch any keyboard input, and pass whatever key was pressed to our 
  // handleKeyDown function. If the key code passed matches any movement keys, 
  // handleKeyDown() will return an action object with movement data. We then 
  // pass the PLAYER_MOVE action to Engine.update(), which will adjust the 
  // player's x and y position, and redraw the map to reflect the update.
  window.addEventListener('keydown', event => {
    const action = handleKeyDown(event.code);
    if( action ) {
      this.update(action);
    }
  });
}

function handleKeyDown(code) {
  // 'directions' is a list of arrays, with each array representing a movement 
  // in a cardinal direction as a change in x and y values. The movements are 
  // listed starting from northwest, clockwise to finish at west.
  // For example, if you recall that in <canvas>, the higher the y value is, 
  // the lower down something will be rendered, we can see that the third 
  // direction listed, [1, -1] represents a movement northeast, since the x 
  // value is increased by 1 (to the right), and the y value is decreased by 1 
  // (going up). So if a player was in the middle of the map, with an x and y
  // of 39, 21, pressing Numpad9 would move them northeast to 40, 20.
  const directions = [ [-1,-1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0] ];

  // Below, you'll notice that vim, numPad, and arrows are a list of keydown 
  // codes whose entries' index positions correspond to appropriate move in the 
  // 'directions' array. 
  const vim = [ 'KeyY', 'KeyK', 'KeyU', 'KeyL', 'KeyN', 'KeyJ', 'KeyB', 'KeyH' ];
  const numPad = [ 'Numpad7', 'Numpad8', 'Numpad9', 'Numpad6', 'Numpad3', 'Numpad2', 'Numpad1', 'Numpad4' ];
  const arrows = [ null, 'ArrowUp', null, 'ArrowRight', null, 'ArrowDown', null, 'ArrowLeft' ];

  if( numPad.indexOf(code) !== -1 ) {
    const direction = directions[ numPad.indexOf(code) ];
    return { PLAYER_MOVE: direction };

  } else if( arrows.indexOf(code) !== -1 ) {
    const direction = directions[ arrows.indexOf(code) ];
    return { PLAYER_MOVE: direction };
  
  } else if(  vim.indexOf(code) !== -1  ) {
    const direction = directions[ vim.indexOf(code) ];
    return { PLAYER_MOVE: direction };
  
  } else {
    // By returning false here, we ensure that no call to Engine.update() is 
    // made from our 'keydown' listener at the top of this file unless it 
    // matches one of our specified keys.
    return false;
  }
}