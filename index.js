const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(13);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.get('/power', (req, res) => {
    switch (req.query.action) {
    case 'on':
      led.stop();
      led.on();
      res.send('Led encendido');
      break;
    case 'off':
      led.stop();
      led.off();
      res.send('Led apagado');
      break;
    case 'blink':
      led.blink(250);
      res.send('Led parpadeando');
      break;
    default:
      led.stop();
      led.on();
      res.send('Led encendido');
      break;
    }
  });

  app.get('/powerOn', (req, res) => {
    led.on();
  });

  app.get('/powerOff', (req, res) => {
    led.off();
  });

  app.post('/action', (req, res) => {
    switch (req.body.power) {
    case 'on':
      led.on();
      res.send('Led encendido');
      break;
    case 'off':
      led.off();
      res.send('Led apagado');
      break;
    default:
      led.on();
      res.send('Led encendido');
      break;
    }
  });

  app.listen(3000, () => console.log('Running server in port: 3000'));
});
