const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/weatherstack');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather App',
      name: 'Ruel V'
    });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ruel V'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Ruel V',
    msg: 'This is where you get help'
  });
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address'
    });
  };

  geocode(req.query.address, (err, {location, latitude, longitude} = {}) => { //this array is destructured and a default of empty object is defined
    if (err) {
      return res.send({
        error: 'There was an error'
      });
    };
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      };
      res.send({
        forecast: forecastData,
        location,                     //this is short hand
        address: req.query.address
      })
    });
  });
  // res.send({
  //   location: 'location',
  //   weather: 'forecastData'
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    });
  };
  console.log(req.query.search);
  res.send({
    products: {}
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ruel V',
    msg: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ruel V',
    msg: 'Page Not Found'
  });
});

app.listen(port, () => {
  console.log('server is up on port ' + port);
});
