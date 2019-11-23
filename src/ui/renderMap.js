export const renderMap = function(mapDisplay, level, entities) {
  mapDisplay.clear();

  // Draw all tiles
  for( let x = 0; x < level.width; x++ ) {
    for( let y = 0; y < level.height; y++ ) {
      const tile = level.tiles[`${x},${y}`];
      mapDisplay.draw( x, y, tile.char, tile.color );
    }
  }

  // Draw all entities
  for( const entity of entities ) {
    mapDisplay.draw( entity.x, entity.y, entity.char, entity.color );
  }
};