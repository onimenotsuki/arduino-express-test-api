const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  var led = new five.Led(13);
  led.blink(500);
});
