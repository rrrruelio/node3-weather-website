const request = require('request');


const geocode = (address, callback) => {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnJycnVlbGlvIiwiYSI6ImNrbXFxYWg3ZDAwZzYycHRocnNzM21maTIifQ.mxF_USQ-NwKqEvjp7-Erfw&limit=1';
  // let urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?';
  // urlMapBox += 'access_token=pk.eyJ1IjoicnJycnVlbGlvIiwiYSI6ImNrbXFxYWg3ZDAwZzYycHRocnNzM21maTIifQ.mxF_USQ-NwKqEvjp7-Erfw';
  // urlMapBox += '&limit=1';

  request({ url, json: true }, (err, {body}) => {
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Location not found', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    };
  });
};


module.exports = geocode;
