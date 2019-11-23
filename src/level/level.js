import Tile, {tileDict} from './tile';

export default class Level {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = this.initTiles();
  }

  initTiles() {
    let tiles = {};
    for( let y = 0; y < this.height; y++ ) {
      for( let x = 0; x < this.width; x++ ) {
        tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
      }
    }

    tiles['30,22'] = new Tile( tileDict['dungeon wall'] );
    tiles['31,22'] = new Tile( tileDict['dungeon wall'] );
    tiles['32,22'] = new Tile( tileDict['dungeon wall'] );

    return tiles;
  }

  blocksMoveAt(x, y) {
    return this.tiles[`${x},${y}`].blocksMove;
  }
}