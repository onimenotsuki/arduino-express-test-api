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

  app.get('/', (req, res) => res.send('Servidor pi funcionando con éxito, porque soy la verga'));

  app.get('/power', (req, res) => {
    switch (req.query.action) {
    case 'on':
      led.stop();
      led.on();
      res.json({
        message: 'Led encendido',
        status: 'on',
      });
      break;
    case 'off':
      led.stop();
      led.off();
      res.json({
        message: 'Led apagado',
        status: 'off',
      });
      break;
    case 'blink':
      led.blink(250);
      res.json({
        message: 'Led parpadeando',
        status: 'blink',
      });
      break;
    default:
      led.stop();
      led.on();
      res.json({
        message: 'Led encendido',
        status: 'on',
      });
      break;
    }
  });

  app.post('/action', (req, res) => {
    switch (req.body.power) {
    case 'on':
      led.on();
      res.json({
        message: 'Led encendido',
        status: 'on',
      });
      break;
    case 'off':
      led.off();
      res.json({
        message: 'Led apagado',
        status: 'off',
      });
      break;
    default:
      led.on();
      res.json({
        message: 'Led parpadeando',
        status: 'blink',
      });
      break;
    }
  });

  app.listen(3000, () => console.log('Running server in port: 3000'));
});
