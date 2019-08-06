const express = require('express');
const app = express();
const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(13);

  app.get('/powerOn', (req, res) => {
    led.on();
  });

  app.get('/powerOff', (req, res) => {
    led.off();
  });

  app.listen(3000, () => console.log('Running server in port: 3000'));
});
