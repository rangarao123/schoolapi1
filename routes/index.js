var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var database = require('../config/database');
var Employee = require('../models/check');
  var request = require('request');
mongoose.connect(database.url, function(err,db)

{
  if(db)
  console.log("connected");
});


/* GET home page. *///login api
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EMPLOYEE LOGIN PAGE' });

});


router.post('/login', function(req, res) {


  Employee.findOne({
      name: req.body.username,

    }, function (err, item) {
      if (err)
       res.render('err');

else {
console.log(item)

      if (!item) {

        console.log("The username is not valid\n");
      //  res.render('usename')

      } else {
      //  console.log(item[0].age);
        if (req.body.password !== item.age) {

          console.log("The password is not correct\n");
          //res.render('notvalid')
          res.render('err');

        } else {

          console.log("The entry is correct!\n");
          res.render('home');


        }
      }

}
})


});
/*router.get('/index', function(req, res, next) {
  res.render('index', { title: 'EMPLOYEE LOGIN PAGE' });

});*/

router.get('/index', function(req, res, next) {
  res.render('home', { title: 'HOME PAGE' });

});

//weather api
router.get('/weather', function(req, res, next) {
  res.render('weather', { title: 'WEATHER REPORT PAGE' });
});

router.post('/weather',function(req,res){

  var cityname=req.body.cityname;
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&APPID=7e26d07a3d38ed74d6efffe378c7256c';
console.log(url)
  request(url, function (err, response, body) {
    if(err){
     console.log('error:', error);
   } else {
     var weather = JSON.parse(body);
     console.log(weather);

     var  message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

console.log(message);
    //  let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      res.render('weathersucess',{weather:message});

    }
  });

});
//wikipedia api
router.get('/wikipedia', function(req, res, next) {
  res.render('wikipedia', { title: 'WIKIPEDIA REPORT PAGE' });
});

router.post('/wikipedia',function(req,res){



  var apiKey = '1a3e119332415d4efcd36b8bacc8a159';
  var name=req.body.name;

var url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+name+"&limit=1&format=json";
  request(url, function (err, response, body) {
    if(err){
     console.log('error:', error);
   } else {
     var wikiname = JSON.parse(body);


console.log(wikiname);
      res.render('wikipediasucess',{wikiname});

    }
  });

});
//movie api
router.get('/movie', function(req, res, next) {
  res.render('movie', { title: 'MOVIE REPORT PAGE' });
});


router.post('/movie',function(req,res){

  var name=req.body.moviename;

var url="https://api.themoviedb.org/3/search/movie?api_key=c7cbd5c5915a6a73e567c9c3fbd1a0f1&query="+name+"";
  request(url, function (err, response, body) {
    if(err){
     console.log('error:', error);
   } else {
     var moviename = JSON.parse(body);
    // console.log(moviename);
     var message= moviename.results[2].overview;


console.log(message);
      res.render('moviesucess',{moviename:message});

    }
  });

});


module.exports = router;
