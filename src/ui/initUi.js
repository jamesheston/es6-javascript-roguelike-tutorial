import * as ROT from 'rot-js';
import {constants} from '../lib/constants';

export const initUi = function() {

  // init map's rot.js <canvas> display
  const mapDisplay = new ROT.Display({
    width: constants.MAP_WIDTH,
    height: constants.MAP_HEIGHT,
    fontFamily: 'metrickal, monospace',
    fontSize: 16,
  });
  document.querySelector('#map_mount').appendChild(mapDisplay.getContainer());

  const messageLogMount = document.querySelector('#message_log_mount');

  return [
    mapDisplay,
    messageLogMount,
  ];
};