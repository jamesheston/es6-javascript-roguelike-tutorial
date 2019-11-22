import Engine from './engine/engine';
import WebFont from 'webfontloader';
import './ui/app.css';

WebFont.load({
  custom: {
    families: ['Metrickal'],
  },
  active: function() {
    const engine = new Engine();
    window.ENGINE = engine;  
  },
});