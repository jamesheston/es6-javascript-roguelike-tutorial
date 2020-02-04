import {colors} from './colors';

const EXPLORED_TILE_COLOR = colors.DARKER_BLUE;

export const renderMap = function(mapDisplay, level, entities, fovMap) {
  mapDisplay.clear();

  // Draw tiles
  for( let x = 0; x < level.width; x++ ) {
    for( let y = 0; y < level.height; y++ ) {
      const tile = level.tiles[`${x},${y}`];
      const isVisible = fovMap.indexOf(`${x},${y}`) !== -1;
      if( isVisible ) {
        mapDisplay.draw(x, y, tile.char, tile.color);
        tile.explored = true;
      } else {
        if( tile.explored ) {
          mapDisplay.draw(x, y, tile.char, EXPLORED_TILE_COLOR);
        }
      }
    }
  }

  // Draw entities
  const renderOrderedEntities = entities.sort( (a, b) => a.renderOrder - b.renderOrder );
  for( const entity of renderOrderedEntities ) {
    const isVisible = fovMap.indexOf(`${entity.x},${entity.y}`) !== -1;
    if( isVisible ) {
      mapDisplay.draw(entity.x, entity.y, entity.char, entity.color);
    }
  }
};