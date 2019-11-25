import Tile, {tileDict} from './tile';
import Rectangle from './rectangle';
import {randInt} from '../lib/randomUtil';

const ROOM_MAX_SIZE = 10;
const ROOM_MIN_SIZE = 6;
const MAX_ROOMS = 30;

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
        tiles[`${x},${y}`] = new Tile( tileDict['dungeon wall'] );
      }
    }

    return tiles;
  }

  generate(player, entities) {
    const rooms = [];
    let numRooms = 0;

    for( let i = 0; i < MAX_ROOMS; i++ ) {
      // generate a room of random width and height within size constraints
      const w = randInt(ROOM_MIN_SIZE, ROOM_MIN_SIZE);
      const h = randInt(ROOM_MIN_SIZE, ROOM_MIN_SIZE);
      // place it on a random position within map boundries
      const x = randInt(0, this.width - w - 1);
      const y = randInt(0, this.height - h - 1);

      const newRoom = new Rectangle(x, y, w, h);
      // make sure this new room doesn't overlap with any previously generated rooms
      // before adding it to the level
      if( rooms.some( r => r.intersects(newRoom) ) ) {
        continue; // continue exits this iteration of loop and goes ahead to next
      }
      // else this room is valid, add it to level
      this.digRoom(newRoom);

      const [newX, newY] = newRoom.center(); 
      // if this is the first room added to the map, place the player in the middle
      // of this room
      if( numRooms === 0 ) {
        player.x = newX;
        player.y = newY;
      
      // if this isn't the first room, we need to dig a tunnel between this room
      // and the previous one
      } else {
        const [prevX, prevY] = rooms[numRooms - 1].center();
        // "Flip a coin" to choose whether to dig up or over first
        if( randInt(0,1) === 1 ) {
          this.digHTunnel(prevX, newX, prevY);
          this.digVTunnel(prevY, newY, newX)
        } else {
          this.digVTunnel(prevY, newY, prevX);
          this.digHTunnel(prevX, newX, newY);
        }
      }

      // finally, update `rooms` and `numRooms` for later iterations to reference
      numRooms++;
      rooms.push(newRoom);
    }
    
    // Place the NPC in the middle of the last room
    const lastRoom = rooms[rooms.length - 1];
    const [centerX, centerY] = lastRoom.center();
    const npc = entities.find( e => e.name === 'NPC');
    npc.x = centerX;
    npc.y = centerY;
  }

  digRoom(room) {
    for(let x = room.x1 + 1; x < room.x2; x++) {
      for(let y = room.y1 + 1; y < room.y2; y++) {
        this.tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
      }
    }
  }

  digHTunnel(x1, x2, y) {
    for(let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      this.tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
    } 
  }

  digVTunnel(y1, y2, x) {
    for(let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      this.tiles[`${x},${y}`] = new Tile( tileDict['dungeon floor'] );
    } 
  }

  blocksMoveAt(x, y) {
    return this.tiles[`${x},${y}`].blocksMove;
  }
}