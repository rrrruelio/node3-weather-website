const request = require('request');

const forecast = (lat, long, callback) => {

  // let urlWeatherStack = 'http://api.weatherstack.com/current?';
  // urlWeatherStack += 'access_key=2145bf219977737eea107758eabb9bd5';
  // urlWeatherStack += '&query=37.8267,-122.4233';
  // urlWeatherStack +='&units=f';
  const url = 'http://api.weatherstack.com/current?access_key=2145bf219977737eea107758eabb9bd5&query='+lat+','+long+'&units=f';

  request( {url, json: true}, (err,{body}) => {
      if (err) {
        callback('Unable to connect to Weather service', undefined);
      } else if (body.error) {
          callback('Unable to find location', undefined);
      } else {
          let msg = body.current.weather_descriptions[0];
          msg += '. ';
          msg += 'It is currently ';
          msg += body.current.temperature;
          msg += ' degrees out. There is a ';
          msg += body.current.precip;
          msg += '% chance of rain.';
          callback(undefined, msg);
      };
  });
};


module.exports = forecast;
